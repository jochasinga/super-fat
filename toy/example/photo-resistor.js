var Firebase = require("firebase");
var five = require("johnny-five"),
    board, myPhotoresistor, myLed;

var firebaseRef = new Firebase("https://blistering-inferno-6120.firebaseio.com/chatters");

board = new five.Board();

board.on("ready", function() {

  myLed = new five.Led(5);
  myPhotoresistor = new five.Sensor({
    pin: "A1",
    freq: 250
  });

  myPhotoresistor.on("read", function( err, value ) {
    // range of led brightness is 0 - 255
    var brightnessValue = five.Fn.constrain(five.Fn.map(value, 0, 900, 0, 255), 0, 255);
    console.log( value );
    myLed.brightness(brightnessValue);

    // Some condition to make Furby sleep with less light here

  });
});
