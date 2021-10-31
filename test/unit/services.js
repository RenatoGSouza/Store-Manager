const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');


describe('Insere um novo Product no BD', () => {

  before(() => {
    const ID_EXAMPLE = '604cb554311d68f491ba5781';

    sinon.stub(productsModel, 'create').resolves({ id: ID_EXAMPLE });
  });

  after(() => {
    productsModel.create.restore();
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

  // describe('quando é inserido com sucesso', () => {
  //   const newProduct = {
  //     name: 'Produto silvestre',
  //     quantity: 10,
  //   };    

  //   it('retorna um objeto', async () => {
  //     const response = await productsService.create(newProduct);
  //     expect(response).to.be.a('object');
  //   });

  //   it('O novo product inserido possui a propriedade "id"', async () => {
  //     const response = await productsService.create(newProduct);
  //     expect(response).to.have.a.property('id');
  //   });

    
  // });
});