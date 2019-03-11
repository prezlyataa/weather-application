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

app.get("/weather", (req, res) => {
  const address = res.req.query.address;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=
  ${address}&key=AIzaSyAbxqzC2IGT8BG6_OZV_UW_ANp5NTUTS6I`;
  weather.fetchWeather(geocodeUrl, res);
});

app.get("/test", (req,res) => {
  res.send({test: "test data"});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
