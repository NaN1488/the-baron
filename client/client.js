Videos = new Meteor.Collection('videos');
CurrentVideos = new Meteor.Collection('current_videos');

Template.playlist.videos = function() {
	return Videos.find({});
}

//return video_id
Template.player.current_video = function() {
	return Controller.current_video();	
}
//this function is called from the template in order to load the video for any client
Template.player.load_video = function (){
 	Controller.load_video();
}

Template.playlist.events({
	'click input#play': function() {
		var key = $.getParam($('input#url').val(), 'v');
		//set current false for all videos
		Videos.update({current: true}, {$set: {current: false}}, false, true);

		if (Videos.find({'key': key}).count() > 0) {
			Videos.update({'key': key}, {$set: {current: true}}, false, true);
		} else {
			Videos.insert({'key': key, current: true});
		}

		if (typeof console !== 'undefined') console.log("You pressed the button play");
	}
});