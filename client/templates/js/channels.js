Template.channels_list.channels = function(){
  return Channels.find({});
}

Template.channels_list.events({
  'click a#create_new_channel': function(){
    $('#new_channel form').toggle();
  },
  'submit form': function(e){
    console.log('form submitted!');
    $target = $(e.target);
    e.preventDefault();
    var userId = Meteor.userId;
    var name = $target.find('[name=name]').val();
    Channels.insert({name: name, video_id:'', start_at: 0, user_id: userId});
  }
})