

  Template.message.events({
    'click input.deleteChatLine': function() {
      var reply = prompt("Hey you! You are about to remove a chat line, give us the passphrase or your line will be there forever!", "");
      //TODO: check user is admin
      if(reply == "tategay") 
        Messages.remove({ _id: (this)._id });
    }
  });

  Template.message.events({
    'click input.editChatLine': function() {
      var reply = prompt("Hey you! You are about to edit a chat line, give us the passphrase or your will never change it", "");
      //TODO: check user is admin
      if(reply == "tategay") { 
        $("#messageBox").val((this).message); 
        $("#editingMessage").css('display', 'block');
        editingChatLineId = (this)._id;
        isLineUnderEdition = true;
        originalTs = (this).time;
      }
    }
  });