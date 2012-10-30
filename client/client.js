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
		var key = $.getParam($('input#url').val(), 'v');
		//set current false for all videos
		Videos.update({current: true}, {$set: {current: false}}, false, true);

		if (Videos.find({'key': key}).count() > 0) {
			Videos.update({'key': key}, {$set: {current: true}}, false, true);
		} else {
			Videos.insert({'key': key, current: true});
		}

		if (typeof console !== 'undefined') console.log("You pressed the button play");
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
      var nameEntry = document.getElementById('name');
      
      if(nameEntry.value != "") {
        
        var ts = Date.now() / 1000;
        var dateTime = new Date();
        var minutes = dateTime.getMinutes();
        var hours = dateTime.getHours();
        

        var messageID = Messages.insert({
          name: nameEntry.value, 
          message: text, 
          time: ts, 
          hours: hours,
          minutes: minutes
        });
        event.target.value = "";

       console.log("===== NEW ENTRY ======");
       console.log(Messages);
       /*
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
      Messages.remove({});
    }
  });

  Template.messages.messages = function(){
    return Messages.find({}, { sort: {time: -1} });
  }