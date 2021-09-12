const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsController = require('../../controllers/productsController');

describe('Ao chamar o productController de create', () => {
  describe('quando o Product informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      
        sinon.stub(productsService, 'create')
        .resolves({err: true});
    });

    after(() => {
      productsService.create.restore();
    });

    it('é chamado o status com o código 422', async () => {
      await productsController.create(request, response);
      expect(response.status.calledWith(422)).to.be.equal(true);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        _id: '123fernandoDeNoronha123',
        name: 'Batatinha boa',
        quantity: 20
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'create')
        .resolves({_id: '123fernandoDeNoronha123', name: 'Batatinha boa', quantity: 20});
    });

    after(() => {
      productsService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productsController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com id, name e quantity inseridos', async () => {
      await productsController.create(request, response);

      expect(response.json.calledWith({  _id: '123fernandoDeNoronha123', name: 'Batatinha boa', quantity: 20 })).to.be.equal(true);
    });

  });
});