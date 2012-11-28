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