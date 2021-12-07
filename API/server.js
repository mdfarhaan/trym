const express = require("express");
const cors = require("cors");
const config = require("./shared/config");
const app = express();
const PORT = config.PORT || 3000;

const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.json());

app.use("/", require("./routes/link"));
app.use("/tr", require("./routes/trim"));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server running on Port: " + PORT);
});
