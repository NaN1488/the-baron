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
});