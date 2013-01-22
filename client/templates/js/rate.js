//set current rate
Template.rateas.rate = function(){
  stars_length = 100;
  stars_qty = 5;
  var channel = Channels.find({name: 'default'}).fetch()[0];
    if (channel != undefined) {  
      current_video_id = channel.video_id;
      cursor = Rates.find({video: current_video_id});
      var avg = 0, total = 0;
      count = cursor.count();
      if(count == 0) {
        avg = (stars_length/2); //VP rule
        return avg.toString();
      } else {
        cursor.forEach(function(e) {
          total += e.rate;
        });
        avg = Math.round((total / count) * (stars_length / stars_qty));
        return avg.toString();  
      }
  }
  avg = (stars_length/2);
  return avg.toString()
}

//events
Template.rateas.events({
    //set rate for the current video
    'click a.stars': function(event) {
      console.log("star_click");
      if (Meteor.user() != null) {
        user_rated = Videos.findOne({key: current_video_id}).user;
        if(user_rated == Users.get_current_user()) {
          alert("you cannot vote yourself");
        } 
        else {
          //current_video_id = CurrentVideos.findOne({channel: 'default'}).video_id;
          current_video_id = Channels.findOne({name: 'default'}).video_id;
          video_rate = parseInt($(event.target).attr('id').slice(5,6));
          channel_id = Channels.findOne({name: 'default'})._id
          

          var already_rate = Rates.findOne({video: current_video_id, channel: channel_id, user_id: Meteor.userId(), user_rated:user_rated});
          console.log("before_if");
          var already_user_rate = UserRates.findOne({user: user_rated, channel: channel_id});
          if (already_rate == undefined) {
            console.log("not rated");
            Rates.insert({video: current_video_id, channel: channel_id, rate: video_rate, user_id: Meteor.userId(), user_rated:user_rated});
            if (already_user_rate == undefined) {
              UserRates.insert({user: user_rated, channel: channel_id, rate: (video_rate*1.0), rate_qty: 1, previous_rate:0});
            }
            else {
              var quantity = already_user_rate.rate_qty;
              var new_rate = ((already_user_rate.rate * quantity) + video_rate) / (quantity + 1);
              var old_rate = already_user_rate.rate;
              quantity = quantity + 1;
              UserRates.update({user: user_rated, channel: channel_id}, {$set: {rate: new_rate, rate_qty: quantity, previous_rate:old_rate}})
            }
          } else {
            console.log("already rated");
            Rates.update({video: current_video_id, channel: channel_id, user_id: Meteor.userId(), user_rated:user_rated}, {$set: {rate:video_rate}});
            var quantity = already_user_rate.rate_qty - 1;
            var new_rate = ((already_user_rate.previous_rate * quantity) + video_rate) / (quantity + 1);
            var old_rate = already_user_rate.previous_rate;
            quantity = quantity + 1;
            console.log("new_rate", new_rate);
            UserRates.update({user: user_rated, channel: channel_id}, {$set: {rate: new_rate, rate_qty: quantity, previous_rate:old_rate}})
          }
        }
      } else {
        alert("be connected to rate");
      }
    }

});