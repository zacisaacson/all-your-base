class Forecast {
  constructor(location, data) {
    this.location = location;
    this.currently = this.currentWeather(data.currently);
    this.hourly = this.hourlyForecast(data.hourly);
    this.daily = this.dailyForecast(data.daily);
  }

  fullForecast() {
    return {
      location: this.location,
      currently: this.currently,
      hourly: this.hourly,
      daily: this.daily
    }
  }

  allFavorites() {
    return {
      location: this.location,
      current_weather: this.currently
    }
  }

  currentWeather(data) {
    return {
      summary: data.summary,
      icon: data.icon,
      precipIntensity: data.precipIntensity,
      precipProbability: data.precipProbability,
      temperature: data.temperature,
      humidity: data.humidity,
      pressure: data.pressure,
      windSpeed: data.windSpeed,
      windGust: data.windGust,
      windBearing: data.windBearing,
      cloudCover: data.cloudCover,
      visibility: data.visibility
    }
  }

  hourlyForecast(data) {
    return {
      summary: data.summary,
      icon: data.icon,
      data: data.data.slice(0, 8).map(hourly => {
        return {
          time: hourly.time,
          summary: hourly.summary,
          icon: hourly.icon,
          precipIntensity: hourly.precipIntensity,
          precipProbability: hourly.precipProbability,
          temperature: hourly.temperature,
          humidity: hourly.humidity,
          pressure: hourly.pressure,
          windSpeed: hourly.windSpeed,
          windGust: hourly.windGust,
          windBearing: hourly.windBearing,
          cloudCover: hourly.cloudCover,
          visibility: hourly.visibility
        }
      })
    }
  }

  dailyForecast(data) {
    return {
      summary: data.summary,
      icon: data.icon,
      data: data.data.map(daily => {
        return {
          time: daily.time,
          summary: daily.summary,
          icon: daily.icon,
          sunriseTime: daily.sunriseTime,
          sunsetTime: daily.sunsetTime,
          precipIntensity: daily.precipIntensity,
          precipIntensityMax: daily.precipIntensityMax,
          precipIntensityMaxTime: daily.precipIntensityMaxTime,
          precipProbability: daily.precipProbability,
          precipType: daily.precipType,
          temperatureHigh: daily.temperatureHigh,
          temperatureLow: daily.temperatureLow,
          humidity: daily.humidity,
          pressure: daily.pressure,
          windSpeed: daily.windSpeed,
          windGust: daily.windGust,
          cloudCover: daily.cloudCover,
          visibility: daily.visibility,
          temperatureMin: daily.temperatureMin,
          temperatureMax: daily.temperatureMax
        }
      })
    }
  }
}
module.exports = Forecast;
