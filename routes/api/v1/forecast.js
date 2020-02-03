var express = require('express');
var router = express.Router();

const Forecast = require('../../../pojos/forecast');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


router.get('/', (request, response) => {
  if (!request.body.api_key) {
    return response.status(401).json("Unauthorized")
  }
  database('users').where('api_key', request.body.api_key).first()
  .then (user => {
    if (user === null) {
      response.status(403).json("Unknown User");
    } else {
        let googleApiKey = process.env.GOOGLE_API_KEY;
        let location = request.query.location;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`)
          .then(response => response.json())
          .then(locationInfo => {
            const {lat,lng} = locationInfo.results[0].geometry.location;
            let darkskyApiKey = process.env.DARK_SKY_API;
            fetch(`https://api.darksky.net/forecast/${darkskyApiKey}/${lat},${lng}`)
              .then(response => response.json())
              .then(json => response.status(200).json((new Forecast(location, json)).fullForecast()))
              .catch(error => {
                response.status(500).json(error)
              })
          })
          .catch(error => {
            response.status(500).json(error)
          })
      }
  });
});

module.exports = router;
