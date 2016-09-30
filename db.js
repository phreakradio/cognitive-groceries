var configAuth = require('./config/auth');
var fs = require('fs');

// Load the Cloudant library.
var Cloudant = require('cloudant');

var request = require('request');

// Get Authorization keys from config file
const username = configAuth.cloudant_credentials.username;
const password = configAuth.cloudant_credentials.password;
const WATSON_API_KEY = configAuth.watson_credentials.api_key;

// name of the database to use
const dbname = "current-picture"

// Initialize the library with my account.
var cloudant = Cloudant({account:username, password:password});


currentPicDB = cloudant.db.use(dbname);


// Add picture to current database for easy access
fs.readFile('apple.jpg', function(err, data) {
  if (!err) {
    currentPicDB.multipart.insert({ file: 'picture' }, [{name: 'current.jpg', data: data, content_type: 'image/png'}], 'currentPicture', function(err, body) {
        if (!err)
          console.log(body);
          currentPhoto();
    });
  } else {
    console.log(err);
  }
});


function currentPhoto() {
  var url = "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=0d548472e99bf5301152b2b8b3dc24263be5541b&url=https://ad9a8b15-7414-47e6-b37d-507983626073-bluemix.cloudant.com/current-picture/currentPicture/current.jpg&version=2016-05-19"

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body.images) // Show the HTML for the Google homepage.
      data = JSON.parse(body).images;
      console.log(data.images);
    }
  })
}


// groceriesDB.insert({ _id: "mydoc", a:1, b: "two"}, function(err, data) {
//     console.log("Error:", err);
//     console.log("Data:", data);
//     //callback(err, data);
// });
//
// groceriesDB.list(function(err, body) {
//   if (!err) {
//     body.rows.forEach(function(doc) {
//       console.log(doc);
//     });
//   }
// });
