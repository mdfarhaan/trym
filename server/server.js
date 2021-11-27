require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log("Server running on Port: " + PORT);
});
