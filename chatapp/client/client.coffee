Template.messages.messages = ->
  Messages.find {}, {sort: {time: -1}}

Template.input.events({
  'submit form': (e, template) ->
    e.preventDefault()
    # if user is logged in
    if Meteor.user()
      name = Meteor.user().emails[0].address
    else
      name = 'Anonymous'

    message = template.find('#message').value 
    # Check if the input value isn't blank
    if message isnt ''
      Messages.insert({
        name: name
        message: message
        time: Date.now()
      })
      # clear the input value
      template.find('#message').value = ''

})
