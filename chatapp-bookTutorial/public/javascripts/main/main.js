// connect to the socket on port 3000
var socket = new io.connect(null, {port: 3000});

// when data is received, update the count on the page
socket.on("message", function(data){
  document.getElementById('client-count').innerHTML = data.clients;
});
