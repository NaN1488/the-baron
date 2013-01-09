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
      if (Meteor.user() != null) {
        //current_video_id = CurrentVideos.findOne({channel: 'default'}).video_id;
        current_video_id = Channels.find({name: 'default'}).fetch()[0].video_id;
        video_rate = parseInt($(event.target).attr('id').slice(5,6));
        channel_id = Channels.findOne({name: 'default'})._id
        var already_rate = Rates.findOne({video: current_video_id, channel: channel_id, user_id: Meteor.userId()});
        if (already_rate == undefined) {
          Rates.insert({video: current_video_id, channel: channel_id, rate: video_rate, user_id: Meteor.userId()});
        } else {
          Rates.update({video: current_video_id, channel: channel_id, user_id: Meteor.userId()}, {$set: {rate:video_rate}});
        }
      } else {
        alert("be connected to rate");
      }
    }

});