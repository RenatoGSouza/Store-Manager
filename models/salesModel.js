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

const update = async (_id, itensSold) => {
  if (!ObjectId.isValid(_id)) {
    return null;
  }
  const sale = await mongoConnection.connection()
  .then((db) => db.collection(SALES)
  .updateOne({ _id: new ObjectId(_id) }, { $set: { itensSold } }));
  if (!sale) { return null; }
  return {
    _id,
    itensSold,
  };
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};