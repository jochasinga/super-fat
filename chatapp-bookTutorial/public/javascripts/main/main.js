var SETUP = {
    host: 'http://localhost:3000',
    dom: {
      count: $("#client-count"),
      form: $('.chatbox'),
      room: $('#chatroom')
    }
  };

var socket;
//Chat = {} || Chat;

Chat.init = function(setup) {

  // connect to the socket
  socket = new io.connect(setup.host);

  // When data is received, update the user count
  socket.on('message', function(data) {
    setup.dom.count.text(data.clients);
  });

  // Get username
  Chat.username = Chat.getUsername();

  // initialize the collection and views
  Chat.messages = new Chat.Messages();

 //Error in my views!
  Chat.messagesViews = new Chat.MessagesView({
    collection: Chat.messages
  });

  // bind submit for chat box
  setup.dom.form.submit(Chat.submit);

  //handle new chats
  Chat.$chatroom = setup.dom.room;
  socket.on('chat', Chat.addMessage);
};

// add a new message to the chat room
Chat.addMessage = function(data) {
  Chat.messages.add(data);
};

// get the user's name
Chat.getUsername = function() {

  return prompt("What's your name?", '') || "Anonymous";
};

Chat.submit = function() {
  // get the text of the input and empty it
  var $message = $("#message");
  text = $message.val();

  $message.val("");

  // send the message over the socket
  socket.emit('newchat', {
    name: Chat.username,
    text: text
  });

  // This prevents the default submit settings from running (cool)
  return false;
};

// Print a new chat to the chat room
Chat.printChat = function(data) {
  var $newChat = $('<p>' + data.text + '</p>');

  $newChat.appendTo(Chat.$chatroom);

  // scroll to the bottom
  Chat.$chatroom.animate({ scrollTop: Chat.$chatroom.height() }, 100);
};

Chat.init(SETUP);

/*
Note:
-----

Need to refactor and get rid of the excess global variables.
*/
