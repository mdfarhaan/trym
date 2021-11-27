require("dotenv").config();
const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const URL = process.env.URL;

// get link from db
router.get("/:id", (req, res) => {
  MongoClient.connect(URL, (err, client) => {
    let db = client.db("trym-db");
    db.collection("links").findOne({ code: req.params.id }, (err, doc) => {
      if (doc == null) {
        res.status(404).send({
          msg: "URL not availabe! Check the code",
          status: "failed",
        });
      } else {
        res.send({
          link: doc.longURL,
          msg: "Link Available",
          status: "success",
        });
      }
    });
  });
});

module.exports = router;
