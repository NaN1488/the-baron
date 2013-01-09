Meteor.startup(function() {
  if(Videos.find().count() === 0) {

    videos = [{
      key: 'EzgGTTtR0kc',
      current: true
    }];

    for(i = 0; i < videos.length; i++) {
      Videos.insert({
        key: videos[i].key,
        current: videos[i].current
      });

    }
  }
  if (Channels.find().count() === 0){
    Channels.insert({name:'default', video_id:'', start_at: 0, videos_in_queue:[]});
  }else{
    // Channels.update({name:'default'}, 
    //     {$set: {
    //       videos_in_queue: [],
    //       video_id: '',
    //       start_at: 0
    //     }
    //   });
  }
});