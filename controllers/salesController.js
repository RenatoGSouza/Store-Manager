const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

const create = async (req, res) => {
  const result = await salesService.create(req.body);
  if (result.err) { return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result); }
  res.status(StatusCodes.OK).json(result);
}; 

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  console.log(result);
  res.status(StatusCodes.OK).json({ sales: result });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findById(id);
  if (result.err) { return res.status(StatusCodes.NOT_FOUND).json(result); }
  res.status(StatusCodes.OK).json(result);
};

module.exports = {
  create,
  getAll,
  findById,
};