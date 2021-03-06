const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const router = require("./router");
const config = require("./config/config");

const app = express();
const port = process.env.PORT || config.port;

app
  .use(express.static(path.join(__dirname, "/client/build")))
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/', router)
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
