const MongoClient = require("mongodb").MongoClient;
const config = require("./config");

let db;
const initializeDB = async () => {
  const client = await MongoClient.connect(config.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  });
  console.log("Connected to MongoDB");
  return client.db("trym-db");
};

module.exports = async () => {
  if (!db) {
    db = await initializeDB();
  }
  return db;
};
