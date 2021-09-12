// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const SALES = 'sales';

const addSales = async (sales) => {
  const resultSales = await mongoConnection.connection()
    .then((db) => db.collection(SALES).insertMany(sales));
  return resultSales;
};

module.exports = {
  addSales,
};