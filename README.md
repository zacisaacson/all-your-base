# Express Sweater Weather

## Introduction

Express Sweater Weather is an Express API which allows existing users with a validated api key to hit four endpoints. Those endpoints include requesting the forecast for a specific location, saving a location as a favorite, listing all favorited locations and deleting favorited locations.

## Getting Started

#### Installing necessary dependencies

The easiest way to get started is to fork this repo, `cd` into the root directory and run the following command. This will pull down any necessary dependencies that your app will require.

`npm install`

#### Set up your local database

To get things set up, you’ll need to access a Postgres database. This project currently uses a database called `sweater_weather_dev` but that can be configured in `knexfile.js`.

#### Migrations
Once you have your database setup, you’ll need to run some migrations. You can do this by running the following command:

`knex migrate:latest`

#### API Keys

To get started with the API calls you will need API keys for both [Google Geocode API](https://developers.google.com/maps/documentation/geocoding/start) and [Dark Sky API](https://darksky.net/dev).

This project also utilizes [Dotenv](https://github.com/motdotla/dotenv) for storing those keys so you simply need to create a `.env` file in your root directory and add your API keys using the syntax:

`API_KEY=<YOUR-API-KEY>`


## Endpoints
**All endpoints require a valid `API_KEY` the body of the request.**

Retrieve forecast for a city:

```
GET /api/v1/forecast?location=city,state (e.g. Denver,CO)

Body:

{
 "api_key": <YOUR-API-KEY>
}
```

Adding a favorite:

```
POST /api/v1/favorites

Body:

{
  "location": "Denver, CO",
  "api_key": <YOUR-API-KEY>
}
```

Listing all favorites for a user:

```
GET /api/v1/favorites

Body:

{
  "api_key": <YOUR-API-KEY>
}
```

Deleting an existing favorite:

```
DELETE /api/v1/favorites

Body:

{
  "location": "Denver, CO",
  "api_key": <YOUR-API-KEY>
}
```

## Tech Stack

- JavaScript
- Node.js
- Express
- Knex
- PostgreSQL

## Core Contributors

[Zac Isaacson](https://github.com/zacisaacson)
