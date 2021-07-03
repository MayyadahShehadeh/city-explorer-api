'use strict';
const axios=require('axios');
const Movie=require('../models/Movie.model');
const Cache=require('../utils/cache');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

let cache=new Cache();
cache['data']=[];
cache['timesmap']=Date.now();

let MovieController=(req,res) => {

    let cityName=req.query.cityName
    let movies=[];

    if(cityName ){
      if (cache.data.length > 0 ){
        movies=cache.data.map(element => new Movie (element));
        res.send(movies);
    }else{
     
    let movieURL=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`
    axios.get(movieURL).then(response => {
       movies=response.data.results.map(element => new Movie (element));
       
       cache['data']= movies ;
       res.send(movies)

    }).catch(error=>res.send({message:error}));
    }}
  
}
module.exports=MovieController