const express = require("express");
const path = require("path");
const weatherController = require("./controllers/weather-data.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

router.get("/weather", weatherController.getWeatherData);

router.get("/test", (req, res) => {
  res.send({ test: "test data" });
});

module.exports = router;
