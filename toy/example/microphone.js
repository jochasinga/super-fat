var Firebase = require("firebase");
var five = require("johnny-five");
var board = new five.Board();

var firebaseRef = new Firebase("https://blistering-inferno-6120.firebaseio.com/chatters");

board.on("ready", function() {
  var mic = new five.Sensor("A0");
  var led = new five.Led(13);
  //var base = 530;
  var base = 594;  // This value is my room with closed windows
  //var base = 800;

  // Simple analog tracking
  mic.on("data", function() {
    if (this.value > base) {
      led.on();

      // run the motor for motion and trigger Furby's voice
	
      // sync the action to the database
      // Not a great idea now, since this can populate the database with craps

      // firebaseRef.push({
      //   username: "Furby",
      //   message: "What's that noise?"
      // });

    } else {
      led.off();
    }
  });
});
