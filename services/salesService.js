const salesModel = require('../models/salesModel');

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

const create = async (sales) => {
  const salesIsNotValid = isNotValid(sales);
  if (salesIsNotValid) { return salesIsNotValid; }

  return salesModel.create(sales);
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

const getAll = async () => salesModel.getAll();
module.exports = {
  create,
  getAll,
  findById,
  update,
};