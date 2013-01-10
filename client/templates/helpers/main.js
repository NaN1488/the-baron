// main.js helper is for common global helpers
// for helpers that belong to a particular template/model
// create a new file in this folder

// TODO: Split JS templates events independently
Handlebars.registerHelper('user_logged_in', function() {
     return (Meteor.user() !== null);
});

Handlebars.registerHelper('current_channel', function() {
  return ChannelHelper.current();
});

Handlebars.registerHelper('current_channel_name', function() {
  var channel = ChannelHelper.current();
  if(channel == undefined){
    return ''
  } else {
    return channel.name
  }
});

Handlebars.registerHelper('is_current_channel', function(name) {
  var channel = ChannelHelper.current();
  if(channel != undefined){
    return (ChannelHelper.current().name == name)
  }
});

Handlebars.registerHelper('isYourMessage', function() {
    	return true;
});

Handlebars.registerHelper('is_current_user', function(username) {
	var current_username = '';
	if(Meteor.user() != null  && typeof(Meteor.user()) === "object"){
		if(Meteor.user().emails == undefined){
			console.log(Meteor.user());
			current_username = Meteor.user().profile.name;
		} else {	
			current_username = Meteor.user().emails[0].address;
		}
	    return (username == current_username);
	}
});
