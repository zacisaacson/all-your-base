var express = require('express');
var router = express.Router();

const Forecast = require('../../../pojos/forecast');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.post('/', (request, response) => {
  if (!request.body.location) {
    return response.status(500).json("Please pass in location")
  }
    database('users').where('api_key', request.body.api_key).first()
    .then (user => {
      if (user) {
        database('favorites').insert({user_id: user.id, location: request.body.location}, 'id')
        .then(favorite => {
          response.status(201).json({success: `${request.body.location} has been added to your favorites.` })
        })
        .catch(error => {
          response.status(500).json("Unable to add favorite");
        });
      } else {
          response.status(403).json("Unknown User");
        }
    })
});

router.get('/', (request, response) => {
  database('users').where('api_key', request.body.api_key).first()
  .then(user => {
    if (user) {
      database('favorites').where({user_id: user.id})
        .then(favorites => {
          const allFavorites = favorites.map(location => {
            return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location.location}&key=${process.env.GOOGLE_API_KEY}`)
              .then(response => response.json())
              .then(locationInfo => {
                let latLong = locationInfo.results[0].geometry.location;
                let darkskyApiKey = process.env.DARK_SKY_API;
                return fetch(`https://api.darksky.net/forecast/${darkskyApiKey}/${latLong.lat},${latLong.lng}`)
                  .then(response => response.json())
                  .then(json => new Forecast(location.location, json).allFavorites())
              })
              return location
          })
        Promise.all(allFavorites)
          .then(finalResponse => response.status(200).json(finalResponse))
      })
router.delete('/', (request, response) => {
  let location = request.body.location
  database('users').where('api_key', request.body.api_key).first()
  .then(user => {
    if (user) {
      if (location) {
         database('favorites').del().where({user_id: user.id, location: location})
       .then(status => {
         if (status === 1) {
           response.status(200).json({success: `${request.body.location} has been deleted from your favorites.`})
         }
       })
      }
    }
  })
  // .then(favorite => console.log(favorite))
})

  module.exports = router;
