const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');


describe('Insere um novo Product no BD', () => {

  beforeEach(() => {
    const ID_EXAMPLE = '604cb554311d68f491ba5781';
    sinon.stub(productsModel, 'create').resolves({ id: ID_EXAMPLE, quantity: 100, name: 'melhor produto' });
    sinon.stub(productsModel, 'findById').resolves({ id: ID_EXAMPLE, quantity: 100, name: 'melhor produto' });
  });

  afterEach(() => {
    productsModel.create.restore();
    productsModel.findById.restore();
  });

  describe('quando o newProduct informado não é válido', () => {
    
    const emptyProduct = {};

    it('retorna um object', async () => {
      const response = await productsService.create(emptyProduct);

      expect(response).to.be.a('object');
    });

    it('o object contém a propriedade "err"', async () => {
      const response = await productsService.create(emptyProduct);
      expect(response).to.have.a.property('err');
    });


    it('Se o tamanho do name de product for menor que 5 characters',async  () => {
      const newProduct = {
        name: 'Prod',
        quantity: 10,
      };
      
      const response = await productsService.create(newProduct);

      expect(response.err.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  
  });

  describe('Testando validações do service CRUD', () => {
    const newProduct = {
      name: 'Produto silvestre',
      quantity: 10,
    };    

    it('retorna um objeto quando criamos uma nova venda', async () => {
      const response = await productsService.create(newProduct);
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
    });

    it('retorna um objeto pelo ID', async () => {
      const product = await productsService.create(newProduct);
      const response = await productsService.findById(product._id);
      expect(response).to.be.a('object');
    });
  });
});

describe('Entradas invalidas para o Products Service', () => {
  const product = {
    _id: "5f43a7ca92d58904914656b6",
    name: "Produto do Batista",
    quantity: 100
  }
  
  beforeEach(() => {  
    sinon.stub(productsModel, 'findById').resolves(false);
    sinon.stub(productsModel, 'findByName').resolves(product);
    sinon.stub(productsModel, 'remove').resolves(product);
  });

  afterEach(() => {
    productsModel.findById.restore();
    productsModel.findByName.restore();
    productsModel.remove.restore();
  });

  it('Retonar um erro message quando passado um id invalido', async () => {
    const response = await productsService.findById('product._id');
    expect(response).to.be.a('object');
    expect(response.err.message).to.be.eq('Wrong id format')
  });

  it('Retonar um erro message quando são passados valores invalidos', async () => {
    const response = await productsService.isValid('nome show');
    const response2 = await productsService.isValid('nome show', -2);
    expect(response).to.be.a('object');
    expect(response2).to.be.a('object');
    expect(response.err.message).to.be.eq('"quantity" must be a number');
    expect(response2.err.message).to.be.eq('"quantity" must be larger than or equal to 1');
  });

  it('Retonar um erro message quando o produto já existe já existe', async () => {
    const response = await productsService.isValid(product.name, product.quantity );
    expect(response).to.be.a('object');
    expect(response.err.message).to.be.eq('Product already exists');
  });
  it('Retorna o produto Quando todos as entradas são validas', async () => {
    const newProduct = {
      name: 'produto bacana',
      quantity: 10
    }
    const product = await productsModel.create(newProduct)
    const response = await productsService.update(product._id, {name:'produto show', quantity: 5})
    expect(response).to.be.a('object');
    expect(response).to.be.have.a.property('_id');
    expect(response).to.be.have.a.property('name');
    expect(response).to.be.have.a.property('quantity');
  });

  it('Deleta um produto com sucesso', async () => {
    const newProduct = {
      name: 'produto bacana',
      quantity: 10
    }
    const product = await productsModel.create(newProduct)
    const response = await productsService.remove(product._id);
    expect(response).to.be.a('object');
    expect(response).to.be.have.a.property('_id');
    expect(response).to.be.have.a.property('name');
    expect(response).to.be.have.a.property('quantity');
  });
});


describe('Faz validoções do salesService', () => {
  const newSales = {
    _id: "5f43ba333200020b101fe4a0",
    itensSold: [
      {
        productId: "604cb554311d68f491ba5781",
        quantity: 20
      }
    ]
  }
  const allSales = {
    sales:[
      {
        _id: "5f43ba333200020b101fe4a0",
        itensSold: [
          {
            productId: "604cb554311d68f491ba5781",
            quantity: 20
          }
       ]
      },
      {
        _id: "5f43ba333200020b101fe4b0",
        itensSold: [
          {
            productId: "604cb554311d68f491ba5781",
            quantity: 5
          }
       ]
      },
    ]
  }

  beforeEach(() => {  
    sinon.stub(salesModel, 'create').resolves(newSales);
    sinon.stub(salesModel, 'findById').resolves(newSales);
    sinon.stub(salesModel, 'update').resolves(newSales);
    sinon.stub(salesModel, 'remove').resolves(newSales);
    sinon.stub(salesModel, 'getAll').resolves(allSales);
  });

  afterEach(() => {
    salesModel.create.restore();
    salesModel.findById.restore();
    salesModel.update.restore();
    salesModel.remove.restore();
    salesModel.getAll.restore();
  });

  it('Retorna um objeto com o sales quando feito com sucesso',  async () => {
    const newProduct = {
      name: 'produto bacana',
      quantity: 10
    };

    const product = await productsModel.create(newProduct);
    const sale = [
      {
        productId: product._id,
        quantity: 2
      },
    ];
    const response = await salesService.create(sale);
    expect(response).to.be.a('object');
    expect(response).to.be.have.a.property('_id');
    expect(response).to.be.have.a.property('itensSold');
  });

  it('Retorna um objeto pelo id do sales quando feito com sucesso',  async () => {
    const response = await salesService.findById('5f43ba333200020b101fe4a0');
    expect(response).to.be.a('object');
  });

  it('Retorna um objeto quando atualiza um Sale pelo com sucesso',  async () => {
    const sale = [
      {
        productId: '5f43ba333200020b101fe4b0',
        quantity: 10
      },
    ];
    const response = await salesService.update('5f43ba333200020b101fe4b0', sale);
    expect(response).to.be.a('object');
    expect(response).to.be.have.a.property('_id');
    expect(response).to.be.have.a.property('itensSold');
  });

  it('Remove um sale com sucesso',  async () => {
    const response = await salesService.remove('5f43ba333200020b101fe4b0');
    expect(response).to.be.a('object');
    expect(response).to.be.have.a.property('_id');
    expect(response).to.be.have.a.property('itensSold');
  });

  it('Retorna um objeto pelo id do sales quando feito com sucesso',  async () => {
    const response = await salesService.getAll();
    expect(response).to.be.a('object');
    expect(response.sales[0]).to.be.have.a.property('_id');
    expect(response.sales[0]).to.be.have.a.property('itensSold');
  });

});