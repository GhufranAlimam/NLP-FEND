const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors")
const AYLIENTextAPI = require('aylien_textapi');
dotenv.config();
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('dist'))

// console.log(__dirname)
const PORT = process.env.PORT || 8081;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
  res.send({})
})
// app.get('/test', function (req, res) {
//   res.send(mockAPIResponse)
// })

app.post("/test", function(req,res){
  // console.log(req.body)
  // console.log(res)
  textapi.sentiment({
    url: req.body.text,
    mode: 'document'
  }, function(error, response) {
    if (error) {
      console.log(error)
      res.send() 
    }
    // console.log(response)
    res.send(response)
    res.send("YOU got it right")
  });
})
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})




