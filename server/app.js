const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
       a: {
           demand: true,
           alias: 'address',
           describe: 'Address to fetch weather for',
           string: true
       }
    })
    .help()
    .alias('h', 'help')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA9KBiF2lX5Rj9ehCaNAhSkws2ln2mvsic`;

axios.get(geocodeUrl)
    .then(response => {
        if(response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
        } else {
            const lat = response.data.results[0].geometry.location.lat;
            const lng = response.data.results[0].geometry.location.lng;
            const weatherUrl = `https://api.darksky.net/forecast/d66cf65446b95265944f93686e13456b/${lat},${lng}`;
            return axios.get(weatherUrl);
        }
    })
    .then(response => {
        const temperature = response.data.currently.temperature;
        const apparentTemerature = response.data.currently.apparentTemperature;
        console.log(`Temperature: ${temperature}, ApparentTemerature: ${apparentTemerature}`);
    })
    .catch(e => {
        if(e.code === 'ENOTFOUND') {
            console.log('Unable to connect Google servers')
        } else {
            console.log(e.message);
        }
    });
