ChannelHelper = {
  current: function(){
    var current_channel = Session.get('currentChannel');
    if(current_channel != undefined){
      return current_channel
    } else {
      var default_channel = Channels.findOne({name: 'default'});
      Session.set('currentChannel', default_channel);
      return default_channel;
    }
  }
}
