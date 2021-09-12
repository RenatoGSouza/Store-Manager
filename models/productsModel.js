const mongoConnection = require('./connection');

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

module.exports = {
  create,
};