var Firebase = require("firebase");
var five = require("johnny-five"),
    button, led;

var firebaseRef = new Firebase("https://blistering-inferno-6120.firebaseio.com/chatters");

five.Board().on("ready", function() {

  button = new five.Button({
    pin: 2,
    invert: true
  });

  led = new five.Led(13);

  var createFurby;

  button.on("down", function() {
    console.log('button pressed');
    led.on();
    createFurby = firebaseRef.push({
	username: "Furby",
	message: "GIGGGGGGGGLE!"
    });
  });

  button.on("up", function() {
    console.log('button released');
    led.off();
  });

});
