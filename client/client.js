// TODO: Split JS templates events independently

Videos = new Meteor.Collection('videos');
CurrentVideos = new Meteor.Collection('current_videos');

Handlebars.registerHelper('user_logged_in', function() {
     return (Meteor.user() !== null);
});

Template.playlist.videos = function() {
	return Videos.find({});
}

//return video_id
Template.player.current_video = function() {
	return Controller.current_video();	
}

//this function is called from the template in order to load the video for any client
Template.player.load_video = function (){
 	Controller.load_video();
}

// Moving the functionality to play the video outside the event
// TODO: move to helper
function playVideo(key) {
  console.log("KEY: " + key);
  if (key !==''){
    Meteor.call('getTime', function (error, result) { 
      var hour = result.time;
      var ts = result.timestamp;
       //set current false for all videos
       Videos.update({current: true}, {$set: {current: false}}, false, true);
       if (Videos.find({'key': key}).count() > 0) {
         Videos.update({'key': key}, {$set: {current: true}}, false, true);
       } else {
         Videos.insert({'key': key, current: true, hour: hour, user: Users.get_current_user()});
       }
    });
  }
}

Template.playlist.events({	
	'click input#play': function() {
    var key = $('#url').val();
    playVideo(key);
	}
});

/**
* Adding the Chat JS
*/
Messages = new Meteor.Collection('messages1');

var okcancel_events = function (selector) {
	return 'keyup '+selector+', keydown'+selector+', focusout '+selector;
};

var make_okcancel_handler = function (options) {
    var ok = options.ok || function(){};
    var cancel = options.cancel || function (){};

    return function (evt) {
      if(evt.type === "keydown" && evt.which === 27) {
        cancel.call(this, evt);
      } else if (evt.type === "keyup" && evt.which === 13) {
        var value = String(evt.target.value || "");
        if(value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };
  };

Template.entry.events = {};

Template.entry.events[okcancel_events('#messageBox')] = make_okcancel_handler({
    ok: function(text, event) {
      //var nameEntry = Meteor.user().emails[0].address;
      var nameEntry = Users.get_current_user();
      if(nameEntry.value != "") {
        Meteor.call('getTime', function (error, result) { 
          var hour = result.time;
          var ts = result.timestamp;
          var messageID = Messages.insert({
           name: nameEntry, 
           message: text, 
           time: ts, 
           hour: hour
          });
          event.target.value = "";
         } );
       /*
       console.log("===== NEW ENTRY ======");
       console.log(Messages);
       console.log("MESSAGE ID: " + messageID);
       console.log("YOUR NAME: " + nameEntry.value);
       console.log("YOUR MESSAGE: " + text);
       console.log("YOUR TIMESTAMP: " + ts);
       console.log("YOUR HOUR: " + hours);
       console.log("YOUR MINUTES: " + minutes);
       */
      }
    }
  });

  Template.clean.events({
    'click input#cleanChat': function() {
      //TODO: check user is admin
      var reply = prompt("Hey you! You are about to clean all the F*C*NI Chat, give us the passphrase or will be silenced forever!", "");
      if(reply == "tategay") 
        Messages.remove({});
    }
  });

  Template.playlist.events({
    'click input#emptyPlaylist': function() {
      var reply = prompt("Hey you! You are about to remove ALL Videos, give us the passphrase or you will be EXTERMINATED!", "");
      //TODO: check user is admin
      if(reply == "tategay") 
        Videos.remove({});
    }
  });

    Template.playlist.events({
    'click input.deleteSong': function() {
      var reply = prompt("Hey you! You are about to remove a video, give us the passphrase or DIE!", "");
      //TODO: check user is admin
      if(reply == "tategay") 
        Videos.remove({ key: (this).key });
    }
  });

    Template.playlist.events({
    'click input.replaySong': function() {
      var reply = prompt("Hey you! You are about to make us all hear the same song again, it must be GOOD! So give us the passphrase or run!", "");
      //TODO: check user is admin
      if(reply == "tategay") 
        playVideo((this).key);
    }
  });

  Template.messages.messages = function(){
    return Messages.find({}, { sort: {time: -1} });
  }