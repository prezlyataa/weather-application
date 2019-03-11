const express = require("express");
const path = require("path");
const router = express.Router();

const weatherController = require("./controllers/weather-data.controller");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

router.get("/weather", weatherController.getWeatherData);

router.get("/test", (req, res) => {
  res.send({ test: "test data" });
});

module.exports = router;
