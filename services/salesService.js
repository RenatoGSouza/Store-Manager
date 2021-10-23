const salesModel = require('../models/salesModel');

const productsModel = require('../models/productsModel');

const quantitySmallZero = (sales) => (sales.some(({ quantity }) => (quantity <= 0)));
const quantityIsString = (sales) => (sales.some(({ quantity }) => (typeof quantity === 'string')));

const message = 'Wrong product ID or invalid quantity';
const erroMessage = () => ({ err: { code: 'invalid_data', message } });

const isNotValid = (sales) => {
  switch (true) {
    case (quantitySmallZero(sales)): return erroMessage();
    case (quantityIsString(sales)): return erroMessage();
    default: return false;
  }
};

const ERROR_STOCK = { 
  err: { 
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  }, 
};

const validateQuantity = (itensSold) => Promise.all(
  itensSold.map(async ({ productId, quantity }) => {
   const product = await productsModel.findById(productId);
   const sumQauntity = product.quantity - quantity;
   if (sumQauntity < 0) {
     return ERROR_STOCK;
   }
   return false;
  }),
);

const create = async (sales) => {
  const salesIsNotValid = isNotValid(sales);
  if (salesIsNotValid) { return salesIsNotValid; }

  const [quantityValid] = await validateQuantity(sales);
  if (quantityValid) { return quantityValid; }

  const result = await salesModel.create(sales);
  if (result.err) { return { problem: true, result }; }
  return result; 
};

const findById = async (id) => {
  const result = await salesModel.findById(id);
  if (!result) { return { err: { message: 'Sale not found', code: 'not_found' } }; }
  return result;
}; 

const update = async (id, itensSold) => {
  const salesIsNotValid = isNotValid(itensSold);
  if (salesIsNotValid) { return salesIsNotValid; }
  return salesModel.update(id, itensSold);
}; 

const remove = async (id) => {
  const result = await salesModel.remove(id);
  if (!result) { return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } }; }
  return result;
}; 

const getAll = async () => salesModel.getAll();
module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};