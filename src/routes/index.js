const express = require("express");
const router = express.Router();

router.use("/tr", require("./trim"));
router.use("/", require("./link"));

module.exports = router;
