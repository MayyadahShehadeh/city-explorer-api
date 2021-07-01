'use strict';
const ForeCast=require('../models/ForeCast.model')
const axios=require('axios');
const PORT = process.env.PORT;


const weatherController=(req,res) => {
    let weather;
    let lat=req.query.lat
    let lon=req.query.lon
    let url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  let weatherBit = axios.get(url).then(response =>{
    weather=response.data
    let city=weather.data.map((value,idx)=>{
      return new ForeCast(value)
    })
    console.log(weather.data);
    res.json(city);
  }).catch(error=>res.json({message:error}));
}

module.exports=weatherController