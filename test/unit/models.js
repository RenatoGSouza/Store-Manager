const sinon = require('sinon');
const { expect } = require('chai');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const mongoConnection = require('../../models/connection');

const DB_NAME = 'StoreManager';

describe('Faz validações das funções de requisição ao banco de dados', () => {
  let connectionMock;
  
  const newProduct = {
    name: 'Produto Silva',
    quantity: 10,
  };

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db(DB_NAME));
    
    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.connection.restore();
  });

  describe('Valida requisições na tabela de Products', () => {
    it('retorna um objeto', async () => {
      const response = await productsModel.create(newProduct);
  
      expect(response).to.be.a('object');
    });
  
    it('O objeto possui o "id" do novo product inserido', async () => {
      const response = await productsModel.create(newProduct);
      expect(response).to.have.a.property('_id');
    });

    it('deve existir um product com o name cadastrado!', async () => {
      await productsModel.create(newProduct);
      const productCreated = await productsModel.findByName(newProduct.name);
      expect(productCreated).to.be.not.null;
    });

    it('Atualiza um produto existente no db', async () => {
      const productCreated = await productsModel.create(newProduct);
      const response = await productsModel.update(productCreated._id);
      expect(response).to.be.a('object');
      expect(response).to.be.have.a.property('_id');
      expect(response).to.be.have.a.property('name');
      expect(response).to.be.have.a.property('quantity');
    });

    it('Deleta um produto do db e retorna o produto deletado', async () => {
      const productCreated = await productsModel.create(newProduct);
      const response = await productsModel.remove(productCreated._id);
      expect(response).to.be.a('object');
      expect(response).to.be.have.a.property('_id');
      expect(response).to.be.have.a.property('name');
      expect(response).to.be.have.a.property('quantity');
    })
  });

  describe('Valida requisições na tabela de sales', () => {
    const newSale = [
      {
        "productId": "5f3ff849d94d4a17da707008",
        "quantity": 3
      }
    ]
    it('Cria uma venda na tabela Sales', async () => {
      const response = await salesModel.create(newSale);
      expect(response).to.be.a('object');
    });
    
    it('Retonar todas as vendas da tabela Sales', async () => {
      const response = await salesModel.getAll()
      expect(response).to.be.a('array');
      expect(response[0]).to.be.have.a.property('itensSold');
      expect(response[0]).to.be.have.a.property('_id');
      expect(response[0].itensSold).to.be.a('array');
    });

    it('Retorna uma venda pelo Id', async () => {
      const createSale = await salesModel.create(newSale);
      const response = await salesModel.findById(createSale._id);
      expect(response).to.be.a('object');
      expect(response).to.be.have.a.property('itensSold');
      expect(response).to.be.have.a.property('_id');
      expect(response.itensSold).to.be.a('array');
    });

    it('Retorna uma erro caso não encontre a venda pelo Id', async () => {
      const response = await salesModel.findById('idAleatorio');
      const updateSale = {
        "id": "5f3ff849d94d4a17da707008",
        "quantity": 10
      }
      const response2 = await salesModel.findById(updateSale.id);
      expect(response2).to.be.a.null;
      expect(response).to.be.null
    });

    it('Atualiza uma venda pelo Id e retorna a venda atualizada', async () => {
      const updateSale = [
        {
          "productId": "5f3ff849d94d4a17da707008",
          "quantity": 10
        }
      ]
      const createSale = await salesModel.create(newSale);
      const response = await salesModel.update(createSale._id, updateSale);
      expect(response).to.be.a('object');
      expect(response).to.be.have.a.property('itensSold');
      expect(response).to.be.have.a.property('_id');
      expect(response.itensSold).to.be.a('array');
      expect(response.itensSold[0].quantity).to.be.eq(10);
    });

    it('Retornar NULL quando passa um id invalido no saleModels update', async () => {
      const response2 = await salesModel.update('updateSale.id');
      expect(response2).to.be.a.null;
    });

    it('Remove uma venda pelo Id e retona a venda deletada', async () => {
      const createSale = await salesModel.create(newSale);
      const response = await salesModel.remove(createSale._id, {iten:'invalid'});
      expect(response).to.be.a('object');
      expect(response).to.be.have.a.property('itensSold');
      expect(response).to.be.have.a.property('_id');
      expect(response.itensSold).to.be.a('array');
    });

    it('Retorna NULL ao passar id invalido para deletar uma venda', async () => {
      const response = await salesModel.remove('createSale._id');
      expect(response).to.be.a.null;
    });

    it('Atualiza a quantidade do produto quando uma venda é feita ou deletada', async () => {
      const product = await productsModel.create(newProduct);
      const sold = [{ productId: product._id, quantity: 2 }];
      const responseDes =await salesModel.updateQuantityOfProduct(sold, 'des');
      const responseInc =await salesModel.updateQuantityOfProduct(sold, 'inc');
      const resultDes = await responseDes[0]
      const resultInc = await responseInc[0]


      expect(resultDes).to.be.a('object');
      expect(resultDes.quantity).to.be.eq(8);

      expect(resultInc).to.be.a('object');
      expect(resultInc.quantity).to.be.eq(12);
    });
  });
});



