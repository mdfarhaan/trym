const db = require("../shared/database");

const trimURL = async (data) => {
  try {
    (await db()).collection("links").insertOne(data);
    return true;
  } catch (err) {
    return false;
  }
};

const checkCode = async (code) => {
  try {
    const data = (await db()).collection("codes").findOne({ code: code });
    return data;
  } catch (err) {
    return false;
  }
};

const addCode = async (code) => {
  try {
    (await db()).collection("codes").insertOne({ code: code });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  trimURL,
  addCode,
  checkCode,
};
