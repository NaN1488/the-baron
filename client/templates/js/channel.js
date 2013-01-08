Template.channel.events({
  'click a.set_channel': function(e, instance){
    Session.set('currentChannelId', instance.data._id);
    $('#channels_list_modal').modal('hide');
  }
})