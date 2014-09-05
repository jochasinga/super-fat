// Child View
Chat.MessageView = Backbone.View.extend({

  tagName: "p",

  template: _.template("<strong> <%=name%>: </strong> <%=text %>"),

  render: function() {
    // add the message text
    //this.$el.text(this.model.get("text"));
    this.$el.html(this.template(this.model.toJSON()));

    // append the new message to the parent view
    this.parentView.$el.append(this.$el);

    return this;
  }
});

// Parent View
Chat.MessagesView = Backbone.View.extend({

  el: "#chatroom",

  initialize: function() {
    // bind "this" context to the render function
    _.bindAll(this, 'render');

    // register event handlers on the collection
    this.collection.on('change', this.render);
    this.collection.on('add', this.render);
    this.collection.on('remove', this.render);

    // render the initial state
    this.render();

    //debugging
    console.log(this);

    //debugging
    console.log("Parent view initialize ran\n\n")
  },

  render: function() {

  // Empty out the wrapper
  this.$el.empty();

  var thisView = this;

  // loop through the messages in the collection
  this.collection.each(function(message){

    //debugging
    console.log("parenet view: iterating over collection\n\n")

    var messageView = new Chat.MessageView({
      model: message
    });

    //debugging
    console.log("messageView\n");
    console.log(messageView);
    console.log('Child views have been made in the parent view\n\n');

    // Save a reference to this view within the child view
    messageView.parentView = thisView;

    // render it
    messageView.render();
  }, this);

  //debugging
  console.log("Render has ran");
  console.log(this);

  //scroll to the bottom
  this.$el.animate({ scrollTop: this.$el.height()}, 100);

  return this;
  }
});
