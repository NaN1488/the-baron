// main.js helper is for common global helpers
// for helpers that belong to a particular template/model
// create a new file in this folder

// TODO: Split JS templates events independently
Handlebars.registerHelper('user_logged_in', function() {
     return (Meteor.user() !== null);
});

Handlebars.registerHelper('isYourMessage', function() {
    	return true;
});