// const yargs = require("yargs");
const weather = require("./weather/fetchWeather");

// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: "address",
//       describe: "Address to fetch weather for",
//       string: true
//     }
//   })
//   .help()
//   .alias("h", "help").argv;
//
// const encodedAddress = encodeURIComponent(argv.address);

let addressData;
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressData}&key=AIzaSyA9KBiF2lX5Rj9ehCaNAhSkws2ln2mvsic`;

const postAddress = (address) => {
  addressData = address;
  weather.fetchWeather(geocodeUrl);
};

const getWeather = () => {
  weather.fetchWeather(geocodeUrl);
};

module.exports = {
  postAddress,
  getWeather
};
