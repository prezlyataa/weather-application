const express = require("express");
const router = express.Router();
const path = require("path");

const weatherController = require("./controllers/weather-data.controller");

.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

router.get("/weather", weatherController.getWeatherData);

router.get("/test", (req, res) => {
  res.send({ test: "test data" });
});

module.exports = router;
