const request = require('request');

let fetchWeather = (lat,lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/d66cf65446b95265944f93686e13456b/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch the weather');
        }
    });
};

module.exports = {
    fetchWeather
};
