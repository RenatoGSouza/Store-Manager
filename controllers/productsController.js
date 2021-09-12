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

const update = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.update(id, req.body);
  if (result.err) { return res.status(422).json(result); }
  res.status(200).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.remove(id);
  if (result.err) { return res.status(422).json(result); }
  res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};