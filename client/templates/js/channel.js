Template.channel.events({
  'click a.set_channel': function(e, instance){
    ChannelHelper.set_current(instance.data._id);
    $('#channels_list_modal').modal('hide');
  }
})