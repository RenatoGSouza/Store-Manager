const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getAll = async () => mongoConnection.connection()
  .then((db) => db.collection('products').find({}).toArray());

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.connection()
    .then((db) => db.collection('products'));
  const { insertedId: _id } = await productsCollection.insertOne({ name, quantity });
  return {
    _id,
    name,
    quantity,
  };
};

const findByName = async (name) => mongoConnection.connection()
  .then((db) => db.collection('products').findOne({ name }));

  const findById = async (_id) => {
  if (!ObjectId.isValid(_id)) {
    return null;
  }
  const product = await mongoConnection.connection()
  .then((db) => db.collection('products').findOne(new ObjectId(_id)));
  if (!product) { return null; }
  
  return product;
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
};