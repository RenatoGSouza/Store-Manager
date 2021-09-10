const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const productsModel = require('../../models/productsModel');
const mongoConnection = require('../../models/connection');

const DB_NAME = 'StoreManager';
let connectionMock;

describe('Insere um novo produto ao BD', () => {
  const newProduct = {
    name: 'Produto Silva',
    quantity: 10,
  };

  // before(async () => {
  //   const DBServer = new MongoMemoryServer();
  //   const URLMock = await DBServer.getUri();

  //   connectionMock = await MongoClient
  //     .connect(URLMock, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     })
  //     .then((conn) => conn.db(DB_NAME));
    
  //   sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  // });

  // after(() => {
  //   mongoConnection.connection.restore();
  // });

  describe('Quando o product é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await productsModel.create(newProduct);
  
      expect(response).to.be.a('object');
    });
  
    it('O objeto possui o "id" do novo product inserido', async () => {
      const response = await productsModel.create(newProduct);
  
      expect(response).to.have.a.property('id');
    });
  });
});
