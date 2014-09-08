var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

// connect to mongodb
var db = new mongodb.Db ("mydb", new mongodb.Server('localhost', 27017,
  {auto_reconnect: true}), {w: 1});

db.open( function(err, conn) {
  db.collection('chatroomMessages', function(err, collection) {
    // init the chatroomInit
    chatroomInit(collection);
  });
});


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Setting the Port
var PORT = 3000

// socket io listening port
server.listen(PORT);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var chatroomInit = function (messageCollection) {

  // Use to create a time stamp
  var moment = require('moment');

  //Socket io code
  var activeClients = 0;

  // on connection
  io.sockets.on('connection', function(socket){
    activeClients++;
    io.sockets.emit('message', {clients: activeClients});

    // get the last ten messages from mongodb
    messageCollection.find({}, {sort: [['_id', 'desc']], limit: 10}).
    toArray(function(err, results) {
      // loops through the results in reverse order
      var i = results.length;
      while(i--){
        //send each over the single sockets
        socket.emit('chat', results[i]);
      }
    });

    console.log("Someone connected!");

    // on disconnect
    socket.on('disconnect', function(data){
      activeClients--;
      io.sockets.emit('message', {clients: activeClients});
    });

    // new chat received
    socket.on('newchat', function(data) {
      data.timestamp = moment().format('h:mm')
      io.sockets.emit('chat', data);

      // save the new message to mongodb
      messageCollection.insert(data, function(err, result) {
        console.log(result);
      });
    });
  });

};

//app.listen(3000);
console.log("Express server listening on port %d", 3000);
module.exports = app;
