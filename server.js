const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const appWeather = require("./app-weather");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json(), cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/address", (req, res, next) => {
  appWeather.postAddress(res.req.body.address);
});

app.get("/weather", (req, res, next) => {
   //let weather = appWeather.getWeather();
   res.send("Some message");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
