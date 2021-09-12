const productsService = require('../services/productsService');

const create = async (req, res) => {
  const result = await productsService.create(req.body);
  if (result.err) { return res.status(422).json(result); }
  return res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json({ products });
};
const findById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.findById(id);
  if (result.err) { return res.status(422).json(result); }
  return res.status(200).json(result);
};
module.exports = {
  create,
  getAll,
  findById,
};