// const { ObjectId } = require('mongodb');
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

module.exports = {
  create,
};