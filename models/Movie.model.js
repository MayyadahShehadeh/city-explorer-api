'use strict';

class Movie{
    constructor(movieData){
      this.title = movieData.title;
      this.overview = movieData.overview;
      this.vote_average = movieData.vote_average;
      this.image_url = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}.${movieData.logo_path}`;
    }
  }

  module.exports=Movie