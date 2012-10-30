CurrentVideos = new Meteor.Collection('current_videos');

Meteor.startup(function() {
  CurrentVideos.remove({});
  if(CurrentVideos.find().count() === 0) {
    currents_videos = [{
      channel: 'default',
      time: 0,
      video_id: '',
      duration: 0
    }];

    for(i = 0; i < currents_videos.length; i++) {
      CurrentVideos.insert({
        channel: currents_videos[i].channel,
        time: currents_videos[i].time,
        video_id: currents_videos[i].video_id,
        duration: currents_videos[i].duration
      });
    }
  }
});