const axios = require("axios");

let fetchWeather = (geocodeUrl, res, next) => {
  axios
    .get(geocodeUrl)
    .then(response => {
      if (response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find that address");
      } else {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const weatherUrl = `https://api.darksky.net/forecast/d66cf65446b95265944f93686e13456b/${lat},${lng}`;
        return axios.get(weatherUrl);
      }
    })
    .then(response => {
      const temperature = response.data.currently.temperature;
      const apparentTemperature = response.data.currently.apparentTemperature;
      console.log(
        `Temperature: ${temperature}, ApparentTemerature: ${apparentTemperature}`
      );
      res.send(response.data);
    })
    .catch(e => {
      if (e.code === "ENOTFOUND") {
        console.log("Unable to connect Google servers");
      } else {
        console.log(e.message);
      }
      next();
    });
};

module.exports = {
  fetchWeather
};
