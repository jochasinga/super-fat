// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// ENV variable $PORT
var port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log('Server listening on port %d', port);
});

//Routing
app.use(express.static(__dirname + '/public'));

// Chatroom
// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket) {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function(data) {
	// tell the client to execute 'new message' event
	socket.broadcast.emit('new message', {
	    username: socket.username,
	    message: data
	});
    });

    // when the client emits 'add user', listens and execute
    socket.on('add user', function(username) {
	// add the client's username to the global list
	usernames[username] = username;
	++numUsers;
	addedUser = true;
	socket.emit('login', {
	   // For informing number of logged in users
	   numUsers: numUsers 
	});
    });

    // when the client emits 'stop typing', we broadcast that to others
    socket.on('stop typing', function() {
	socket.broadcast.emit('stop typing', {
	    username: socket.username
	});
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
    });
});

