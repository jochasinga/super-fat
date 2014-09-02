// Require Firebase library to interface with JSON remotely on Firebase server
var Firebase = require('firebase');
var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

/* Firebase Reference */

// Declare a reference to Firebase root server
var firebaseRef = new Firebase("https://blistering-inferno-6120.firebaseio.com/");
// This reference the child node of the root reference
// Another RESTful way of doing this would be
// var chattersRef = new Firebase("https://blistering-inferno-6120.firebaseio.com/chatters")
var chattersRef = firebaseRef.child('chatters');
var chatterID = '';


// Specify port the server should listen to
server.listen(port, function() {
    console.log('Server listening on port %d', port);
});

//Routing to tatic files
app.use(express.static(__dirname + '/public'));

// Chatroom
// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket) {
    // log it just for peace of mind
    console.log('User connected...');
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function(data) {
	// tell the client to execute 'new message' event
	socket.broadcast.emit('new message', {
	    username: socket.username,
	    message: data
	});
	
	var currentChatter = chatterID.name();
	var userMsgCount = 0;
	// Also save the object to Firebase
	var newChatterMsg = chattersRef.child(currentChatter +'/messages').push({
	    userMsgCount: data
	});
	userMsgCount++; 
    });

    // when the client emits 'add user', listens and execute
    socket.on('add user', function(username) {
	// we store the username in the socket session for this client
	socket.username = username;
	// add the client's username to the global list
	usernames[username] = username;
	++numUsers;
	addedUser = true;
	socket.emit('login', {
	   // For informing number of logged in users
	   numUsers: numUsers 
	});
	// echo globally (all clients) that a uers had connected
	socket.broadcast.emit('user joined', {
	    username: socket.username,
	    numUsers: numUsers
	});
	
	// Update the chatterID session for current user
	chatterID = chattersRef.push({
	    username: socket.username,
	});
    });

    // when the client emits 'typing', broadcast it to other
    socket.on('typing', function() {
	socket.broadcast.emit('typing', {
	    username: socket.username
	});
	console.log(socket.username + ' typing');
    });

    // when the client stops typing, we broadcast that to others
    socket.on('stop typing', function() {
	socket.broadcast.emit('stop typing', {
	    username: socket.username
	});
	console.log(socket.username + ' stopped typing');
    });
    
    // when the user disconnects...
    socket.on('disconnect', function() {
	// remove username from the list
	if (addedUser) {
	    delete usernames[socket.username];
	    --numUsers;

	    // echo globally that this user has left
	    socket.broadcast.emit('user left', {
		username: socket.username,
		numUsers: numUsers
	    });
	}
	console.log(socket.username + ' has lefted');
    });
});

