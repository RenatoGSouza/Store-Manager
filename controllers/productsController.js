const productModel = require('../models/productsModel');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = await productModel.create(name, quantity);
  res.status(200).json({ id, name, quantity });
};

module.exports = {
  create,
};