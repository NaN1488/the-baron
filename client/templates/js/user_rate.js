Template.user_rate.string_user_rate = function(){
  console.log("user_rate starting");
  rate = "Unknown.";
  var channel = Channels.find({name: 'default'}).fetch()[0];
     if (channel != undefined) {  
      if(Meteor.user().emails != undefined) {
       user_id = Meteor.user().emails[0].address;
      } else {
        user_id = "Unknown";
      }
       current_channel_id = channel._id;
       user_rate = UserRates.findOne({user: user_id, channel: current_channel_id});
       
       if(user_rate == undefined) {
         rate = "Not yet rated.";
       } else {
        var avg = user_rate.rate;
        ///////////////// Aca mostramos el rate del usuario por canal
        switch (true)
        {
          case ((avg > 0) && (avg <= 1)):
            rate = "BAAAD.";
            break;

          case ((avg > 1) && (avg <= 2)):
            rate = "Not Good.";
            break;

          case ((avg > 2) && (avg <= 3)):
            rate = "More and less.";
            break;

          case ((avg > 3) && (avg <= 4)):
            rate = "Not bad.";
            break;

          case ((avg > 4) && (avg <= 5)):
            rate = "Great.";
            break;

          default:
            rate = "Out of range (Wow).";
            break;
        }
      //////////////////////////

      }
   }
  return rate
}