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
  console.log(salesIsNotValid);
  if (salesIsNotValid) { return salesIsNotValid; }

  return salesModel.create(sales);
};
module.exports = {
  create,
};