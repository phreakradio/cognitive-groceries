var gpio = require('pi-gpio');
var raspiCam = require('raspicam');

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
gpio.open(buttonPIN,"input",function(err){
  gpio.read(buttonPIN,function(err,value){
    if(err) throw err;

    if(value == 1){camera.start();}
    else {camera.stop();}

  });
});


//Set up call to DB
