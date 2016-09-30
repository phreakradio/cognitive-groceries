var express = require('express');
var request = require('request');
// Load the Cloudant library.
var Cloudant = require('cloudant');

var configAuth = require('./config/auth');

// Get Authorization keys from config file
const username = configAuth.cloudant_credentials.username;
const password = configAuth.cloudant_credentials.password;
const WATSON_API_KEY = configAuth.watson_credentials.api_key;

console.log(username,password,WATSON_API_KEY);

// name of the database to use
const dbname = "current-picture"

// Initialize the library with my account.
var cloudant = Cloudant({account:username, password:password});

var app = express();

currentPicDB = cloudant.db.use(dbname);

var fs = require('fs');


app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.post('/work', function (req, res) {
  // Add picture to current database for easy access
  fs.readFile('curr.jpg', function(err, data) {
    if (!err) {
      currentPicDB.multipart.insert({ file: 'picture' }, [{name: 'curr.jpg', data: data, content_type: 'image/png'}], 'currentPicture', function(err, body) {
        if (!err) {
          var url = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=0d548472e99bf5301152b2b8b3dc24263be5541b&url=https://ad9a8b15-7414-47e6-b37d-507983626073-bluemix.cloudant.com/current-picture/currentPicture/current.jpg&version=2016-05-19"
          request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              //console.log(body.images) // Show the HTML for the Google homepage.
              data = JSON.parse(body).images;
              console.log(data);
            }
          })
        }
      });
    } else {
      console.log(err);
    }
  });
  res.send('Done');
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
