'use strict';
const axios=require('axios');
const Movie=require('../models/Movie.model');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


let MovieController=(req,res) => {
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
}
module.exports=MovieController