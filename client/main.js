/**
 * Var Declarations
 */
var months = {};
var editingChatLineId = "";
var isLineUnderEdition = false;
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
         Videos.update({'key': key}, {$set: {current: true, youtube: video_selected}}, false, true);
       } else {
          console.log('inserte video', video_selected);
          Videos.insert({ key: key, 
                         title: video_selected.title.$t,
                         current: true, 
                         hour: hour, 
                         user: Users.get_current_user()});
       }

       Controller.play_video(key);
    });
  }
}

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



