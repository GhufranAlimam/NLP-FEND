
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
var AYLIENTextAPI = require('aylien_textapi');
dotenv.config();
var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
const app = express()

app.use(express.static('dist'))

console.log(__dirname)
const PORT = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log('Example app listening on port ${PORT}!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
