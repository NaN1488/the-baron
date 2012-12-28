//set current rate
Template.rateas.rate = function(){
  /*console.log(Channels.find({name: 'default'}).fetch());
  current_video = Channels.find({name: 'default'}).fetch()[0].video_id;
  
  if (current_video != undefined) {  
    current_video_id = current_video.video_id;
    cursor = Rates.find({video: current_video_id});
    var avg = 0, total = 0;
    count = cursor.count();
    
    if(count == 0) {
      avg = "72"; //VP rule
    } else {
      cursor.forEach(function(e) {
        total += e.rate;
      });
      avg = Math.round((total / count) * 25);
      return avg.toString();
    }

  }*/
  return "72"
}

//events
Template.rateas.events({
    //set rate for the current video
    /*'click a.stars': function(event) {
      current_video_id = CurrentVideos.findOne({channel: 'default'}).video_id;
      video_rate = parseInt($(event.target).attr('id').slice(5,6));
      var already_rate = Rates.findOne({video: current_video_id, user_id: Meteor.userId()});
      if (already_rate == undefined) {
        Rates.insert({video: current_video_id, rate: video_rate, user_id: Meteor.userId()});
      } else {
        Rates.update({video: current_video_id, user_id: Meteor.userId()}, {$set: {rate:video_rate}});
      }
    }
    */


});