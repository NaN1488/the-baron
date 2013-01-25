/**
* Adding the Chat JS
*/

/**
 * Var Declarations
 */
var months = {};
var editingChatLineId = "";
var isLineUnderEdition = false;
Template.entry.events = {};
var originalTs = 0;
var canSendMessage = true;

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
        if(value && canSendMessage)
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
             $("#messageBox").val("Sending message...");
             $("#messageBox").attr("disabled", true);
             canSendMessage = false;
              Messages.insert({
               name:    nameEntry, 
               message: text, 
               time:    ts, 
               city:    location,
               utc:     localTime,
               channel: "default",
               formmatedDate: formmatedDate,
               edited: false
              }, function(){         
                  $("#messageBox").attr("disabled", false);
                  $("#messageBox").val("");
                  canSendMessage = true;
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
            $("#messageBox").removeClass("inputBoxEdit");
          }
          //event.target.value = "";
         });
      }
    }
  });

