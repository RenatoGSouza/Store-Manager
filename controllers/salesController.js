const salesService = require('../services/salesService');

const create = async (req, res) => {
  const result = await salesService.create(req.body);
  if (result.err) { return res.status(422).json(result); }
  res.status(200).json(result);
}; 

module.exports = {
  create,
};