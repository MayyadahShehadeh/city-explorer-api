'use strict';

class ForeCast{
    constructor(weatherData){
      this.date=weatherData.valid_date
      this.description=weatherData.weather.description
      this.lat=weatherData.lat
      this.lon=weatherData.lon
    }
  }

  module.exports=ForeCast