const { MongoClient } = require('mongodb');

// Conexão para test local
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// Conexão para test do git
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((conn) => conn.db(DB_NAME));

module.exports = connection;