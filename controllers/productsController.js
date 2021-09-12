const productsService = require('../services/productsService');

const create = async (req, res) => {
  const result = await productsService.create(req.body);
  if (result.err) { return res.status(422).json(result); }
  // if (!result) { return res.status(422).json(result); }
  return res.status(201).json(result);
};

module.exports = {
  create,
};