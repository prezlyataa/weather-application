const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const router = require("./router");

const app = express();
const port = process.env.PORT || 5000;

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/", router)
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

app
  .use(express.static(path.resolve(__dirname, "../client/build")))
  .get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "../client/build", "index.html"));
  });

module.exports = app;
