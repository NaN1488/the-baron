   Template.rateas.rate = function(){
      current_video = CurrentVideos.findOne({channel: 'default'});
      if (current_video != undefined) {
         current_video_id = current_video.video_id;
         cursor = Rates.find({video: current_video_id});
         var avg = 0, total = 0;
         count = cursor.count();
         if(count == 0) {
           avg = 72; //VP rule
         } else {
          cursor.forEach(function(e)
         {
           total += e.rate;
         });
         avg = Math.round((total / count) * 25);
         return avg.toString();
        }
     }
    return "72"
  }


  Template.rateas.events({
    'click a.stars': function(event) {
      current_video_id = CurrentVideos.findOne({channel: 'default'}).video_id;
      video_rate = parseInt($(event.target).attr('id').slice(5,6));
      var already_rate = Rates.findOne({video: current_video_id, user_id: Meteor.userId()});
      if(already_rate == undefined) {
        Rates.insert({video: current_video_id, rate: video_rate, user_id: Meteor.userId()});
      } else {
        console.log
        Rates.update({video: current_video_id, user_id: Meteor.userId()}, {$set: {rate:video_rate}});
      }
    }
  });