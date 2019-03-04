const request = require('request');

let geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);

    request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA9KBiF2lX5Rj9ehCaNAhSkws2ln2mvsic`,
            json: true
        },
        function(error, response, body) {
            if(error) {
                callback('Unable to connect Google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                callback('Unable to find that address');
            } else if(body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
};

module.exports = {
    geocodeAddress
};
