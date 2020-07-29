const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors")
const AYLIENTextAPI = require('aylien_textapi');
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
dotenv.config({path:path.join(__dirname,'../../.env')});

const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.use(express.static('dist'))

const PORT = process.env.PORT || 8081;

app.get('/', function (req, res) {
    res.send('dist/index.html')
})

app.get('/test', function (req, res) {
  res.send({})
})
// app.get('/test', function (req, res) {
//   res.send(mockAPIResponse)
// })

app.post("/test", function(req,res){
  textapi.sentiment({
    url: req.body.text,
    mode: 'document'
  }, function(error, response) {
    if (error) {
      console.log(error)
    }
    res.send(response)
  });
})
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})




