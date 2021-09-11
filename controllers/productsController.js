const productModel = require('../models/productsModel');
const { isValidProduct } = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await isValidProduct(name, quantity);
  if (result.err) { return res.status(422).json(result); }
  const { id: _id } = await productModel.create(name, quantity);
  return res.status(201).json({ _id, name, quantity });
};

module.exports = {
  create,
};