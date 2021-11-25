import { Template } from 'meteor/templating';
import { Messages } from '../imports/api/messages';
import { Accounts } from 'meteor/accounts-base'

import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
})

Template.chat.helpers({
  messages() {
    return Messages.find();
  },
  getEmail(userId){
    if(userId){
         const user = Accounts.users.findOne(userId);
         
         if (user) return user.username 
    }
  }
});

Template.chat.events({
  'submit #chat-form'(event, instance) {
    event.preventDefault();
    const text = event.target.text.value;
    Meteor.call('messages.insert', text, (err) => {
      if(err){
        alert(err.message);
      } else {
        event.target.reset();
      }
    })
  },
});
