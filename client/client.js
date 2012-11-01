Videos = new Meteor.Collection('videos');
CurrentVideos = new Meteor.Collection('current_videos');

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

Template.playlist.events({	
	'click input#play': function() {
	    var key = $('#url').val();
	    if (key !==''){

      var dateTime = new Date();
      var minutes = dateTime.getMinutes();
      var hours = dateTime.getHours();

      if(minutes < 10) {
       minutes = "0"+minutes;
      }
	      //set current false for all videos
	      Videos.update({current: true}, {$set: {current: false}}, false, true);

	      if (Videos.find({'key': key}).count() > 0) {
	        Videos.update({'key': key}, {$set: {current: true}}, false, true);
	      } else {
	        Videos.insert({'key': key, current: true, minutes: minutes, hours: hours});
	     }
	    }
	  }
});

Template.entry.user_logged_in = function(){
	if(Meteor.user() !== null){
		return true;
	} else {
		return false;
	}
}

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
      var nameEntry = Meteor.user().emails[0].address;
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
      }
    }
  });

  Template.clean.events({
    'click input#cleanChat': function() {
      //TODO: check user is admin
      var reply = prompt("Hey there, stop messing around, give us the passphrase or leave!", "");
      if(reply == "tategay") Messages.remove({});
    }
  });

  Template.playlist.events({
    'click input#emptyPlaylist': function() {
      var reply = prompt("Hey there, stop messing around, give us the passphrase or leave!", "");
      //TODO: check user is admin
      if(reply == "tategay") Videos.remove({});
    }
  });

    Template.playlist.events({
    'click input#deleteSong': function() {
      console.log(this);
      Videos.remove({ key: (this).key });
    }
  });


  Template.messages.messages = function(){
    return Messages.find({}, { sort: {time: -1} });
  }