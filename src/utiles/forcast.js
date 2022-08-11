const request = require('request');


const forCast = (lat, long, callback) => {
    const url2 = 'http://api.weatherstack.com/current?access_key=9fc1ee4dfa5ecce5cf95655a64500c21&query=' + lat + ',' +long + '&units=f';
    request({ url: url2, json: true }, (error, {body}) => {
        if (error){
            callback('unable to connect to weather service', undefined);
        }
        else if (body.error){
            callback('unable to find location', undefined);
        }
        else {
            callback(undefined, body);
        }
    });
}

module.exports = forCast;