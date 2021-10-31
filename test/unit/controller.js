const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');
const productsController = require('../../controllers/productsController');
const salesController = require('../../controllers/salesController');

describe('Ao chamar o productController', () => {
  describe('quando o Product informado não é válido', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      
        sinon.stub(productsService, 'create')
        .resolves({err: true});
    });

    afterEach(() => {
      productsService.create.restore();
    });

    it('é chamado o status com o código 422', async () => {
      await productsController.create(request, response);
      expect(response.status.calledWith(422)).to.be.equal(true);
    });

  });

  describe('Request na tabela de products', () => {
    const response = {};
    const request = {};
    const product = {
      _id: '5f43ba333200020b101fe4a0',
      name: 'Batatinha boa', 
      quantity: 20
    }
    const allProducts = [
      {
        _id: '5f43ba333200020b101fe4b0',
        name: 'Batatinha boa', 
        quantity: 20
      },
      {
        _id: '5f43ba333200020b101fe4c0',
        name: 'laranja lima', 
        quantity: 10
      },
      {
        _id: '5f43ba333200020b101fe4d0',
        name: 'Abacaxi de marataize', 
        quantity: 5
      }
    ]
    beforeEach(() => {
      request.body = product;

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'create').resolves(product);
      sinon.stub(productsService, 'getAll').resolves(allProducts);
      sinon.stub(productsService, 'findById').resolves(product);
      sinon.stub(productsService, 'update').resolves(product);
      sinon.stub(productsService, 'remove').resolves(allProducts[2]);
    });

    afterEach(() => {
      productsService.create.restore();
      productsService.getAll.restore();
      productsService.findById.restore();
      productsService.update.restore();
      productsService.remove.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productsController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com id, name e quantity inseridos', async () => {
      await productsController.create(request, response);

      expect(response.json.calledWith(product)).to.be.equal(true);
    });

    it('Retorna todos os produtos inseridos', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
      expect(response.json.calledWith({ products: allProducts })).to.be.equal(true);
    });

    it('Retorna o status 200 quando encontra o produto pelo id', async () => {
      request.params = {
        id: '5f43ba333200020b101fe4d0'
      };
      await productsController.findById(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
    });

    it('Retorna o produto atualizado', async () => {
      request.params = {
        id: '5f43ba333200020b101fe4d0'
      };
      await productsController.update(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
      expect(response.json.calledWith(product)).to.be.eq(true);
    });
    it('Retorna o produto deletado', async () => {
      request.params = {
        id: '5f43ba333200020b101fe4d0'
      };
      await productsController.remove(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
      expect(response.json.calledWith(allProducts[2])).to.be.eq(true);
    });
  });

  describe('Request na tabela de Sales', () => {

    const response = {};
    const request = {};
    const newSale = [
      {
      productId: "5f43ba333200020b101fe4c0",
      quantity: 20,
      },
    ];
    const sales = {
      sales: [
        {
          _id: '5f43ba333200020b202fe4c0',
          itensSold:[
            {
              productId: "5f43ba333200020b101fe4c0",
              quantity: 20,
            },
          ]
        },
        {
          _id: '5f43ba333200020b202fe4c2',
          itensSold:[
            {
              productId: "5f43ba333200020b101fe4c0",
              quantity: 20,
            },
          ]
        },
      ]
    }
    beforeEach(() => {
      request.body = newSale;

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesService, 'create').resolves(newSale);
      sinon.stub(salesService, 'getAll').resolves(sales);
      sinon.stub(salesService, 'findById').resolves(newSale);
      sinon.stub(salesService, 'update').resolves(newSale);
      sinon.stub(salesService, 'remove').resolves(newSale);
    });

    afterEach(() => {
      salesService.create.restore();
      salesService.getAll.restore();
      salesService.findById.restore();
      salesService.update.restore();
      salesService.remove.restore();
    });


    it('Retorna o status 200 e a nova venda  quando é inserido com sucesso', async () => {
      await salesController.create(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
      expect(response.json.calledWith(newSale)).to.be.eq(true);
    });

    it('Retorna o status 200 e todos os produtos quando é feito com sucesso', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
    });

    it('Retorna o status 200 e o produto encontrado pelo id quando é feito com sucesso', async () => {
      request.params = { id: '5f43ba333200020b202fe4c2'}
      await salesController.findById(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
      expect(response.json.calledWith(newSale)).to.be.eq(true);
    });

    it('Retorna o status 200 e o produto atualizado pelo id quando é feito com sucesso', async () => {
      request.params = { id: '5f43ba333200020b202fe4c2'}
      await salesController.update(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
      expect(response.json.calledWith(newSale)).to.be.eq(true);
    });

    it('Retorna o status 200 e o produto deletado pelo id quando é feito com sucesso', async () => {
      request.params = { id: '5f43ba333200020b202fe4c2'}
      await salesController.remove(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
      expect(response.json.calledWith(newSale)).to.be.eq(true);
    });
  });
});

