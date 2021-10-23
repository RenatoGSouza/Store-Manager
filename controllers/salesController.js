const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

const create = async (req, res) => {
  const result = await salesService.create(req.body);
  if (result.err) { 
    if (result.err.message === 'Such amount is not permitted to sell') {
      return res.status(StatusCodes.NOT_FOUND).json(result);
    }
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result); 
  }
  res.status(StatusCodes.OK).json(result);
}; 

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  res.status(StatusCodes.OK).json({ sales: result });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findById(id);
  if (result.err) { return res.status(StatusCodes.NOT_FOUND).json(result); }
  res.status(StatusCodes.OK).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.update(id, req.body);
  if (result.err) { return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result); }
  res.status(StatusCodes.OK).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.remove(id);
  if (result.err) { return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result); }
  res.status(StatusCodes.OK).json(result);
}; 

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};