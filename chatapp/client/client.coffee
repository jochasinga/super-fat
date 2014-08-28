Template.messages.messages = ->
  Messages.find {}, {sort: {time: -1}}

Template.input.events({
  'keydown input#message': (event) ->
    # if key is ENTER
    if event.which is 13
      if Meteor.user()
        name = Meteor.user().profile.name
      else
        name = 'Anonymous'
        
      message = document.getElementById 'message'
      # Check if the input value isn't blank
      if message.value isnt ''
        Messages.insert({
          name: name
          message: message.value
          time: Date.now()
        })
        # clear the input value
        document.getElementById('message').value = ''
        message.value = ''
})
