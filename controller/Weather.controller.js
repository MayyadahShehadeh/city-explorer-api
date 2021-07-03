'use strict';
const ForeCast=require('../models/ForeCast.model')
const axios=require('axios');
const Cache=require('../utils/cache');

let cache=new Cache();
cache['data']=[];
cache['timesmap']=Date.now();

const weatherController=(req,res) => {
    let weather;
    let lat=req.query.lat
    let lon=req.query.lon

   let city=[]
if(lat && lon ){
  if (cache.data.length > 0 ){
    city=cache.data.map(value=>new ForeCast(value));
    res.send(city);
}else{

    let url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
   axios.get(url).then(response =>{
    weather=response.data
     city=weather.data.map(value=>new ForeCast(value))
cache['data']=weather.data;

    res.send(city);
  }).catch(error=>res.send({message:error}));
}}
};
module.exports=weatherController