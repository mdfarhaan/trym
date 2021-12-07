const express = require("express");
const db = require("../shared/database");
const router = express.Router();

// get link from db
router.get("/:id", async (req, res) => {
  (await db())
    .collection("links")
    .findOne({ code: req.params.id }, (err, doc) => {
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

module.exports = router;
