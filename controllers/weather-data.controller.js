const weather = require("../utils/weather/fetchWeather");

let getWeatherData = (req, res, next) => {
  const address = res.req.query.address;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=
  ${address}&key=AIzaSyAbxqzC2IGT8BG6_OZV_UW_ANp5NTUTS6I`;
  weather.fetchWeather(geocodeUrl, res, next);
};

module.exports = {
  getWeatherData
};
