ChannelHelper = {
  current: function(){
    var channel_id = Session.get('currentChannelId');
    if(channel_id == undefined){
      var default_channel = Channels.findOne({name: 'default'});
      Session.set('currentChannelId', default_channel._id);
      return default_channel;
    }
      return Channels.findOne({_id: channel_id});
  },
  set_current: function(channel_id){
    Session.set('currentChannelId', channel_id);
  }
}
