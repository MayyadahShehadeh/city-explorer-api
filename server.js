const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
const axios=require('axios');
app.use(cors());
const PORT = process.env.PORT;
const movieController=require('./controller/Movie.controller');
const weatherController=require('./controller/Weather.controller');


app.get('/', function (req, res) { res.send('Hello World')})
 

app.get('/weather',weatherController )


app.get('/movies', movieController)


app.listen(PORT,()=>{
  console.log(`starting in port ${PORT}`)
}) 
