const express = require("express");
const router = express.Router();
const { trimURL, addCode, checkCode } = require("../services/services.js");
const makeID = require("../utils/makeId");

// Trim new url
router.post("/", async (req, res) => {
  const { longURL, customCode } = req.body;
  let code = await makeID();

  const data = {
    longURL: longURL,
    code: code,
    clicks: 0,
    customCode: customCode,
  };
  trimURL(data).then((value) => {
    if (value) {
      addCode(code).then((value) => {
        if (value) {
          res.status(200).send({
            code: code,
            msg: "Url added successfully!",
            status: "success",
          });
        } else {
          res.status(500).send({ msg: "server error", status: "failed" });
        }
      });
    } else {
      res.status(500).send({ msg: "server error", status: "failed" });
    }
  });
});

// Trim new url with custom code
router.post("/cu", async (req, res) => {
  const { longURL, customCode, code } = req.body;
  const data = {
    longURL: longURL,
    code: code,
    clicks: 0,
    customCode: customCode,
  };

  await checkCode(code).then((value) => {
    if (value == null) {
      trimURL(data).then((value) => {
        if (value) {
          addCode(code).then((value) => {
            if (value) {
              res.status(200).send({
                code: code,
                msg: "Url added successfully!",
                status: "success",
              });
            } else {
              res.status(500).send({ msg: "server error", status: "failed" });
            }
          });
        } else {
          res.status(500).send({ msg: "server error", status: "failed" });
        }
      });
    } else if (value.code.length > 0) {
      res.status(406).send({
        code: code,
        msg: "Code taken. Try again",
        status: "failed",
      });
    } else {
      console.log("object");
      res.status(500).send({ msg: "server error", status: "failed" });
    }
  });
});

module.exports = router;
