var express = require('express');
var router = express.Router();

const Forecast = require('../../../pojos/forecast');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.post('/', (request, response) => {
    database('users').where('api_key', request.body.api_key).first()
    .then (user => {
      if (user) {
        database('favorites').insert({user_id: user.id, location: request.body.location}, 'id')
        .then(favorite => {
          response.status(201).json({success: `${request.body.location} has been added to your favorites.` })
        })
        // .catch(error => {
        //   response.status(500).json({ error });
        // });
      }
    })
});

  module.exports = router;
