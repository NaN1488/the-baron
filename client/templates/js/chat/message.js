  var optionsActive = false;

  Template.message.events({
    'click input.deleteChatLine': function() {
      //var reply = prompt("Hey you! You are about to remove a chat line, give us the passphrase or your line will be there forever!", "");
      //TODO: check user is admin
      //if(reply == "tategay") 
        Messages.remove({ _id: (this)._id });
    },
    'click input.editChatLine': function() {
      //var reply = prompt("Hey you! You are about to edit a chat line, give us the passphrase or your will never change it", "");
      //TODO: check user is admin
      //if(reply == "tategay") { 

        $("#messageBox").addClass("inputBoxEdit");
        $("#messageBox").val((this).message); 
        $("#editingMessage").css('display', 'block');
        editingChatLineId = (this)._id;
        isLineUnderEdition = true;
        originalTs = (this).time;

      //}
    }
  });

  Template.showMessageOptions.events({
    'click input#showMessageOptions': function(){
      if($(".messageOptions").css('display') == 'none') {
        $(".messageOptions").show("slow");
        optionsActive = true;
      } else {
        $(".messageOptions").hide("slow");
        optionsActive = false;
      } 
    }
  });


/*
Template.message.isMine = function (name) {
  me = Meteor.user();
  loggedUser = Meteor.users.find({ _id: me });
  console.log(loggedUser);
  

  //console.log(Meteor.get_current_user());
  //loggedUser = Users.get_current_user();
  if(name === loggedUser)
    //"guido@alloatti.com")
  //if( == name)
    return true;
};
*/