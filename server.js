const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const weather = require("./weather/fetchWeather");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json(), cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.get("/weather", (req, res, next) => {
  const address = res.req.query.address;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=
  ${address}&key=AIzaSyA9KBiF2lX5Rj9ehCaNAhSkws2ln2mvsic`;
  weather.fetchWeather(geocodeUrl, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
