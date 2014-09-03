var Firebase = require('firebase');
var five = require("johnny-five"),
    board, myMotor, led;

/* the data structure on my Firebase server looks something like:

"root": {
  "chatters": {
     // Firebase's auto generated unique ID for each new chatter
     "-JVwFypmDKOUzEtkANZe": {
       "username" : "chatter1",
       "message"  : "current_message"
     },
     ...
   }
}

 * the "root" is the domain, so Firebase provide something RESTful like
 * "<root>/chatters/-JVwFypmDKOUzEtkANZe/username" to access username value
 */

// Data reference to the chatters object on my free Firebase server    
var firebaseRef = new Firebase("https://blistering-inferno-6120.firebaseio.com/chatters"); 

board = new five.Board();

board.on("ready", function() {
  myMotor = new five.Motor({
    pin: 9
  });

  // event handler on start
  myMotor.on("start", function( err, timestamp ) {
    console.log( "started", timestamp );

    // stop after 2 seconds
    board.wait(2000, function() {
      myMotor.stop();
    });

  });

  // event handler on stop
  myMotor.on("stop", function( err, timestamp ) {
    console.log( "stopped", timestamp );
  });

  // event handler for the latest added chatter
  firebaseRef.on('child_added', function(snapshot) {
    var addedChatter = snapshot.name();

    // event handler on any message change for that latest chatter
    firebaseRef.child(addedChatter + '/message').on('value', function(snapshot) {
      console.log(addedChatter + ' : ' + snapshot.val());

      // start motor on new message - speed argument (between 0 and 255) is optional
      myMotor.start(250);
    });
  });

  // motor's method can be accessed on Node REPL
  this.repl.inject({
    myMotor: myMotor
  });
});
