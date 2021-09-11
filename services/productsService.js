const { connection } = require('../models/connection');

const errorLength = { 
  err: {
  message: '"name" length must be at least 5 characters long',
  code: 'invalid_data', 
  },
};

const productExist = {
  err: { 
    message: 'Product already exists', 
    code: 'invalid_data', 
  }, 
};

const valueQuantityNotValid = {
  err: { 
    message: '"quantity" must be larger than or equal to 1', 
    code: 'invalid_data', 
  }, 
};

const typeQuantityNotValid = {
  err: { 
    message: '"quantity" must be a number', 
    code: 'invalid_data', 
  }, 
};

const validValueQuantity = (value) => ((value <= 0));
const validTypeQuantity = (value) => (typeof value !== 'number');
const valueLengthIsValid = (value, min) => ((!value) || (value.length < min));

const productExists = async (name) => {
  const { name: namedb } = await connection()
    .then((db) => db.collection('products').findOne({ name })) || false;
  if (namedb === name) { return true; } 
  return false;
};

const isValidProduct = async (name, quantity) => {
  switch (true) {
    case (valueLengthIsValid(name, 5)): return errorLength;
    case (validValueQuantity(quantity)): return valueQuantityNotValid;
    case (validTypeQuantity(quantity)): return typeQuantityNotValid; 
    case (await productExists(name)): return productExist;
    default: return false;
  }
};

module.exports = {
  isValidProduct,
};