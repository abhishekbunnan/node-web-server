const request = require('request');


const geocode = (address, callback) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaXNoZWtidW5uYW4iLCJhIjoiY2w2OWs5ODZ0MDB4ZjNpcHF0OTZ5MTJwOCJ9.4Sa_SQSyNwyeaRXa4IS4wQ&limit=1';
    request({url: mapboxUrl, json: true}, (error, {body}) => {
        if (error){
            callback('not able to connect', undefined);
        }
        else if (body.features.length < 1){
            callback('not able to find lat and long', undefined);
        }
        else{
            const data = {
                'long': body.features[0].center[0],
                'lat': body.features[0].center[1]
            }
            callback(undefined, data);
        }
    });
}

module.exports = geocode;