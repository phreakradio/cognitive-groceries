var gpio = require('rpi-gpio');
var RaspiCam = require('raspicam');

var buttonPIN = 14

//Set up camera functionality
var camera = new RaspiCam({
  mode: "photo",
  output: "./photo/curr.jpg",
  encoding: "jpg",
  quality: 100,
  timeout: 1 // take the picture immediately
});

camera.on("started", function( err, timestamp ){
	console.log("photo started at " + timestamp );
});

camera.on("read", function( err, timestamp, filename ){
	console.log("photo image captured with filename: " + filename );
});

camera.on("exit", function( timestamp ){
	console.log("photo child process has exited at " + timestamp );
});

//Set up button press / event trigger
gpio.setup(buttonPIN, gpio.DIR_IN, readInput);
function readInput(){
  gpio.read(buttonPIN,function(err,value){
     camera.start();
  });
}

//Set up call to DB
// Go for it
