/**
 * Var Declarations
 */
var months = {};
Videos = new Meteor.Collection('videos');
CurrentVideos = new Meteor.Collection('current_videos');
var editingChatLineId = "";
var isLineUnderEdition = false;
Messages = new Meteor.Collection('messages');
Rates = new Meteor.Collection('rates');
Template.entry.events = {};
var originalTs = 0;


/**
 * function to calculate local time in a different city given the city's UTC offset
 */
function calcTime(city, offset, utc) {
    // convert to msec, add local time zone offset, get UTC time in msec
    //utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    
    // create new Date object for different city, using supplied offset
    nd = new Date(utc + (3600000*offset));

    var localTime = nd.toLocaleString()
    var day = localTime.substr(8,2);
    var month = localTime.substr(4,3);
    var year = localTime.substr(13,2);
    var hour = localTime.substr(16,8);

    // return time as a string
    return { city: city, time: nd.toLocaleString(), formmatedDate: month+day+"@" +hour};
}




// TODO: Split JS templates events independently
Handlebars.registerHelper('user_logged_in', function() {
     return (Meteor.user() !== null);
});

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
      
      var ts = result.timestamp;
      var utc = result.utc;
      var date = result.date;

      if(window.location.hostname == "localhost") offset = -3;
      else offset = 0;

      var locale = calcTime('Buenos Aires', offset, utc);
      var location = locale.city;
      var localTime = locale.time;
      var hour = locale.formmatedDate;

       //set current false for all videos
       Videos.update({current: true}, {$set: {current: false}}, false, true);
       if (Videos.find({'key': key}).count() > 0) {
         Videos.update({'key': key}, {$set: {current: true}}, false, true);
       } else {
         Videos.insert({ key: key, 
                         title: video_selected.title.$t,
                         current: true, 
                         hour: hour, 
                         user: Users.get_current_user()});
       }
    });
  }
}

/**
* Adding the Chat JS
*/


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

Template.entry.events[okcancel_events('#messageBox')] = make_okcancel_handler({
    ok: function(text, event) {
      //var nameEntry = Meteor.user().emails[0].address;
      var nameEntry = Users.get_current_user();
      if(nameEntry.value != "") {
        Meteor.call('getTime', function (error, result) { 
          var ts = result.timestamp;
          var utc = result.utc;
          var date = result.date;
          
          if(window.location.hostname == "localhost") offset = -3;
          else offset = 0;

          var locale = calcTime('Buenos Aires', offset, utc);
          var location = locale.city;
          var localTime = locale.time;
          var formmatedDate = locale.formmatedDate;

          if( !isLineUnderEdition ) {


            Messages.insert({
             name:    nameEntry, 
             message: text, 
             time:    ts, 
             city:    location,
             utc:     localTime,
             formmatedDate: formmatedDate,
             edited: false
            });
          } else {
            Messages.update({ _id: editingChatLineId }, 
                            { message: text,
                              name:    nameEntry, 
                              //time:    ts,
                              time:    originalTs, 
                              city:    location,
                              utc:     localTime,
                              formmatedDate: formmatedDate, 
                              edited: true},
                            { multi: false });
            $("#editingMessage").css('display', 'none');
            isLineUnderEdition = false;
          }
          event.target.value = "";
         });
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


  Template.messages.messages = function(){
    return Messages.find({}, { sort: {time: -1} });
  }

