Template.channels_list.channels = function(){
  return Channels.find({});
}

Template.channels_list.events({
  'click a#create_new_channel': function(){
    $('#new_channel form').toggle();
  },
  'submit form': function(e){
    e.preventDefault();
    $target = $(e.target);
    
    $('#error').remove();
    $name = $target.find('[name=name]')

    var userId = Meteor.userId;
    var name = $name.val();
    
    if(Channels.findOne({name: name}) == undefined){
      Channels.insert({name: name, video_id:'', start_at: 0, user_id: userId});
      $name.val('');
    } else {
      $('#new_channel form').append('<p id="error">Name has been taken</p>');
    }
  }
})