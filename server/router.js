const express = require("express");
const router = express.Router();

const weatherController = require("./controllers/weather-data.controller");

router.get("/weather", weatherController.getWeatherData);

router.get("/test", (req, res) => {
  res.send({ test: "test data" });
});

module.exports = router;
