const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const SALES = 'sales';

const create = async (itensSold) => {
  const { insertedId } = await mongoConnection.connection()
    .then((db) => db.collection(SALES).insertOne({ itensSold }));
  return {
    _id: insertedId,
    itensSold,
  };
};

const getAll = async () => mongoConnection.connection()
    .then((db) => db.collection(SALES).find().toArray());

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const sale = await mongoConnection.connection()
  .then((db) => db.collection(SALES).findOne(new ObjectId(id)));
  if (!sale) { return null; }
  return sale;
}; 

module.exports = {
  create,
  getAll,
  findById,
};