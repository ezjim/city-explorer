const express = require('express');
const data = require('./geo.js');
const app = express();
const request = require('superagent');

let lat;
let lng;

app.get('/location', (request, respond) => {
    const cityData = data.results[0];

    lat = cityData.geometry.location.lat,
    lng = cityData.geometry.location.lng,

    respond.json({
        formatted_query: cityData.formatted_address,
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.lat,
    });
});

const getWeatherData = (lat, lng) => {
    return getWeatherData.daily.map(forcast => {
        return {
            forcast: forcast.summary,
            time: new Date(forcast.time),
        }
    })
}
// app.get('/weather', (req, res) ) => {
//     const portlandWeatherv = getweatherdata(lat, lng)
// }

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
console.log(data);



