CurrentVideos = new Meteor.Collection('current_videos');

Meteor.startup(function() {
  if(CurrentVideos.find().count() === 0) {
    currents_videos = [{
      channel: 'default',
      time: 0,
      video_id: ''
    }];

    for(i = 0; i < currents_videos.length; i++) {
      CurrentVideos.insert({
        channel: currents_videos[i].channel,
        time: currents_videos[i].time,
        video_id: currents_videos[i].video_id
      });
    }
  }
});