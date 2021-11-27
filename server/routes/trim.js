require("dotenv").config();
const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const URL = process.env.URL;
const makeID = require("../utils/makeId");

// Trim new url
router.post("/", (req, res) => {
  const { longURL, customCode } = req.body;
  let code = makeID();
  const data = {
    longURL: longURL,
    code: code,
    clicks: 0,
    customCode: customCode,
  };

  MongoClient.connect(URL, (err, client) => {
    let db = client.db("trym-db");
    // Add url
    db.collection("links").insertOne(data, (err) => {
      err
        ? res.status(500).send({ msg: "server error", status: "failed" })
        : db.collection("codes").insertOne({ code: code }, (err, doc) => {
            err
              ? res.status(500).send({ msg: "server error", status: "failed" })
              : res.status(200).send({
                  code: code,
                  msg: "Url added successfully!",
                  status: "success",
                });
          });
    });
  });
});

// Trim new url with custom code
router.post("/cu", (req, res) => {
  const { longURL, customCode, code } = req.body;
  const data = {
    longURL: longURL,
    code: code,
    clicks: 0,
    customCode: customCode,
  };

  MongoClient.connect(URL, (err, client) => {
    let db = client.db("trym-db");
    db.collection("links").findOne({ code: code }, (err, doc) => {
      if (doc == null) {
        // Code Available
        db.collection("links").insertOne(data, (err) => {
          err
            ? res.status(500).send({ msg: "server error", status: "failed" })
            : db.collection("codes").insertOne({ code: code }, (err, doc) => {
                err
                  ? res
                      .status(500)
                      .send({ msg: "server error", status: "failed" })
                  : res.status(200).send({
                      code: code,
                      msg: "Url added successfully!",
                      status: "success",
                    });
              });
        });
      } else {
        // Code Not Available
        res
          .status(406)
          .send({
            code: code,
            msg: "That code is taken. Try again",
            status: "failed",
          });
      }
    });
  });
});

module.exports = router;
