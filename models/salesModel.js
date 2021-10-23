const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');
const productsModel = require('./productsModel');

const SALES = 'sales';

const updateQuantityOfProduct = (itensSold, incOrDes) => {
  itensSold.map(async ({ productId, quantity }) => {
    let newQuantity;
    const { _id, name, quantity: quantityProduct } = await productsModel.findById(productId);
    if (incOrDes === 'des') {
      newQuantity = quantityProduct - quantity;
    } else {
      newQuantity = quantityProduct + quantity;
    }
    await productsModel.update(_id, name, newQuantity);
  });
};

const create = async (itensSold) => {
  updateQuantityOfProduct(itensSold, 'des');
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
  if (!ObjectId.isValid(_id)) { return null; }
  const sale = await mongoConnection.connection()
  .then((db) => db.collection(SALES)
  .updateOne({ _id: new ObjectId(_id) }, { $set: { itensSold } }));
  if (!sale) { return null; }
  return {
    _id,
    itensSold,
  };
};

const remove = async (_id) => {
  if (!ObjectId.isValid(_id)) { return null; }
  const sale = await findById(_id);
  updateQuantityOfProduct(sale.itensSold, 'inc');
  await mongoConnection.connection()
  .then((db) => db.collection(SALES).deleteOne({ _id: new ObjectId(_id) }));
  if (!sale) { return null; }
  return sale;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
};