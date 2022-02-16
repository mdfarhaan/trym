const express = require("express");
const cors = require("cors");
const config = require("./src/shared/config");
const app = express();
const PORT = config.PORT || 5000;

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.json());

app.use("/api/v1", require("./src/routes"));

app.use("/", (req, res) => {
  res.send("Trym API");
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server running on Port: " + PORT);
});
