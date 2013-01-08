// main.js helper is for common global helpers
// for helpers that belong to a particular template/model
// create a new file in this folder

// TODO: Split JS templates events independently
Handlebars.registerHelper('user_logged_in', function() {
     return (Meteor.user() !== null);
});

Handlebars.registerHelper('current_channel', function() {
     return Channels.findOne({name: 'default'});
});

Handlebars.registerHelper('is_current_channel', function(name) {
     return (Channels.findOne({name: 'default'}).name == name);
});