const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
app.use(cors()) 
const PORT = process.env.PORT;
 const weather = require('./data/weather.json');

app.get('/', function (req, res) { res.send('Hello World')})
 

app.get('/weather', (req,res) => {
let lat=req.query.lat
let lon=req.query.lon
let searchQuery=req.query.searchQuery

let getData=()=>{
  let city=weather.find((item,idx)=>{
    return (item.city_name.toLowerCase()=== searchQuery.toLowerCase() && item.lat === Number(lat) && item.lon===Number(lon))
  })
  console.log();
return city.data.map(value=>{
  return new ForeCast(value)
})


}
res.json(getData());
}
) 
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
