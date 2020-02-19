const express = require('express');
const data = require('./geo.js');
const app = express();
const weather = require('./darksky.js');
// const request = require('superagent');

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
    return weather.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000),
        };
    })
} ;
app.get('/weather', (req, res) => {
    // use the lat and lng from earlier to get weather data for the selected area
    const portlandWeather = getWeatherData(lat, lng);
    
    // res.json that weather data in the appropriate form
    res.json(portlandWeather);
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
console.log(data);



module.exports = {
    app: app,
};