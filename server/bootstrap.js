Videos = new Meteor.Collection('videos');

Meteor.startup(function() {

  if(Videos.find().count() === 0) {
    videos = [{
      key: 'EzgGTTtR0kc',
      current: true
    }, {
      key: '7m7njvwB-Ks',
      current: false
    }];

    for(i = 0; i < videos.length; i++) {
      Videos.insert({
        key: videos[i].key,
        current: videos[i].current
      });

    }
  }
});