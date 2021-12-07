const db = require("../shared/database");

const storedCodes = ["", " ", null];

const makeID = async () => {
  let cursor = (await db()).collection("codes").find();
  cursor.forEach((doc) => {
    storedCodes.push(doc.code);
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
