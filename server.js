const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
const axios=require('axios');
app.use(cors());
const weather = require('./data/weather.json');
const PORT = process.env.PORT;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


app.get('/', function (req, res) { res.send('Hello World')})
 

app.get('/weather', (req,res) => {
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
})

// movie --------------

app.get('/movies', (req,res) => {
  
    let cityName=req.query.city
   let movieURL=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`
 
   let movieRes=axios.get(movieURL).then(response => {
     let movies=response.data.results.map(element=>{
       return new Movie (element);
      });
     res.json(movies)
   }).catch(err=>{
     res.status(500).send(`error in getting data ==> ${err}`)
 })
 })


 class ForeCast{
   constructor(weatherData){
     this.date=weatherData.valid_date
     this.description=weatherData.weather.description
     this.lat=weatherData.lat
     this.lon=weatherData.lon
   }
 }

 class Movie{
  constructor(movieData){
    this.title = movieData.title;
    this.overview = movieData.overview;
    this.vote_average = movieData.vote_average;
    this.image_url = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}.${movieData.logo_path}`;
  }
}




app.listen(PORT,()=>{
  console.log(`starting in port ${PORT}`)
}) 
