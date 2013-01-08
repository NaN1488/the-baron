// main.js helper is for common global helpers
// for helpers that belong to a particular template/model
// create a new file in this folder

// TODO: Split JS templates events independently
Handlebars.registerHelper('user_logged_in', function() {
     return (Meteor.user() !== null);
});

Handlebars.registerHelper('current_channel', function() {
  var current_channel_id = ChannelHelper.current();
  return Channels.findOne({_id: current_channel_id});
});

Handlebars.registerHelper('is_current_channel', function(name) {
     return (Channels.findOne({_id:ChannelHelper.current()}).name == name);
});