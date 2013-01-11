  Template.clean.events({
    'click input.cleanChat': function() {
      //TODO: check user is admin
      var reply = prompt("Hey you! You are about to clean all the F*C*NI Chat, give us the passphrase or will be silenced forever!", "");
      if(reply == "tategay") 
        Messages.remove({});
    }
  });