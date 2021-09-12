const productsModel = require('../models/productsModel');

const nameLength = '"name" length must be at least 5 characters long';

const productExist = 'Product already exists';
 
const valueQuantityNotValid = '"quantity" must be larger than or equal to 1';

const typeQuantityNotValid = '"quantity" must be a number';

const code = 'invalid_data';

const erroMessage = (message) => ({ err: { message, code } });

const validValueQuantity = (value) => ((value <= 0));
const validTypeQuantity = (value) => (typeof value !== 'number');
const valueLengthIsValid = (value, min) => ((!value) || (value.length < min));

const productExists = async (name) => {
  const { name: namedb } = await productsModel.findByName(name) || false;
  if (namedb === name) { return true; }
  return false;
};

const isValid = async (name, quantity) => {
  switch (true) {
    case (valueLengthIsValid(name, 5)): return erroMessage(nameLength);
    case (validValueQuantity(quantity)): return erroMessage(valueQuantityNotValid);
    case (validTypeQuantity(quantity)): return erroMessage(typeQuantityNotValid);
    case (await productExists(name)): return erroMessage(productExist);
    default: return false;
  }
};

const create = async ({ name, quantity }) => {
  const isNotValidProduct = await isValid(name, quantity);
  if (isNotValidProduct) return isNotValidProduct;

  return productsModel.create({ name, quantity });
};

const getAll = async () => productsModel.getAll();

const findById = async (id) => {
  const result = await productsModel.findById(id) || false;
  if (!result) { return { err: { code: 'invalid_data', message: 'Wrong id format' } }; }
  return result;
}; 

const update = async (id, { name, quantity }) => {
  const isNotValidProduct = await isValid(name, quantity);
  if (isNotValidProduct) return isNotValidProduct;
  return productsModel.update(id, name, quantity);
};

const remove = async (id) => {
  const result = await productsModel.remove(id);
  if (!result) { return { err: { code: 'invalid_data', message: 'Wrong id format' } }; }
  return result;
}; 
module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
  isValid,
};