Template.user_rate.string_user_rate = function(){
  console.log("user_rate starting");
  rate = "Unknown.";
  var channel = Channels.find({name: 'default'}).fetch()[0];
     if (channel != undefined) {  
       user_id = Meteor.user()._id;
       current_channel_id = channel._id;
       cursor = Rates.find({user_id: user_id, channel: current_channel_id});
       var avg = 0, total = 0;
       count = cursor.count();
       if(count == 0) {
         rate = "Lonely Ranger.";
       } else {
         cursor.forEach(function(e) {
           total += e.rate;
         });
        avg = (total / count);

        ///////////////// Aca mostramos el rate del usuario por canal
        switch (true)
        {
          case ((avg > 0) && (avg <= 1)):
            rate = "Your mother even hates you.";
            break;

          case ((avg > 1) && (avg <= 2)):
            rate = "You really suck. Continue this way.";
            break;

          case ((avg > 2) && (avg <= 3)):
            rate = "God and Devil.";
            break;

          case ((avg > 3) && (avg <= 4)):
            rate = "Improving.";
            break;

          case ((avg > 4) && (avg <= 5)):
            rate = "King of the world.";
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