require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const URL = process.env.URL;

const storedCodes = ["", " ", null];

const makeID = () => {
  MongoClient.connect(URL, (err, client) => {
    let db = client.db("trym-db");
    let cursor = db.collection("codes").find();
    cursor.forEach((doc) => {
      storedCodes.push(doc.code);
    });
  });

  let result = "";
  while (storedCodes.includes(result)) {
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let charLen = char.length;
    for (var i = 0; i < 5; i++) {
      result += char.charAt(Math.floor(Math.random() * charLen));
    }
  }

  return result;
};

module.exports = makeID;
