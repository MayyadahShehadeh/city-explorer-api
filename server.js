const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
const axios=require('axios');
app.use(cors()) 
const weather = require('./data/weather.json');
const { response } = require('express');
const PORT = process.env.PORT;
app.get('/', function (req, res) { res.send('Hello World')})
 

app.get('/weather', (req,res) => {
  let weather;
  let lat=req.query.lat
  let lon=req.query.lon
  let url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&searchQuery=amman`;
let weatherBit = axios.get(url).then(response =>{
  weather=response.data
  let city=weather.data.map((item,idx)=>{
    return new ForeCast(item)
  })
  console.log(weather.data);
  res.json(city);
});
});




 class ForeCast{
   constructor(weatherData){
     this.date=weatherData.valid_date
     this.description=weatherData.weather.description
     this.lat=weatherData.lat
     this.lon=weatherData.lon
   }
 }

app.listen(PORT,()=>{
  console.log(`starting in port ${PORT}`)
}) 
