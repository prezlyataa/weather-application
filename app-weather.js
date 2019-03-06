const yargs = require("yargs");
const weather = require("./weather/fetchWeather");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("h", "help").argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA9KBiF2lX5Rj9ehCaNAhSkws2ln2mvsic`;

weather.fetchWeather(geocodeUrl);

