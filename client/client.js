Videos = new Meteor.Collection('videos');
CurrentVideos = new Meteor.Collection('current_videos');

Template.playlist.videos = function() {
	return Videos.find({});
}


$.getParam = function(url, name) {
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
	return results[1] || 0;
}

Template.player.current_video = function() {
	var videos = Videos.find({
		current: true
	}).fetch();
	if(videos.length == 0) return false;
	
	return videos[0].key;
}
//this function is called from the template in order to load the video for any client
Template.player.load_video = function (){
 	if (_player != undefined){
 		_player.loadVideoById(Template.player.current_video());
 	}
}

Template.player.set_current_time = function (current_time){
	CurrentVideos.update({channel:'default'}, {$set: {time:current_time} });
}

Meteor.setInterval(function(){
	if (_player != undefined) {
		Template.player.set_current_time(parseInt(_player.getCurrentTime())+4);
	}
}, 1000);

Template.player.current_time = function () {
	current_videos = CurrentVideos.find({channel:'default', video_id: Template.player.current_video()}).fetch();
 		time = 0;
 		if (current_videos.length == 1) {
 			time = current_videos[0].time
 		}else{
 			CurrentVideos.update({channel:'default'}, {$set: {'time':time, video_id: Template.player.current_video()} });
 			//CurrentVideos.find({channel:'default', video_id: Template.player.current_video()}).fetch();
 		}
	return time;//CurrentVideos.find({channel:'default'}).fetch()[0].time;
}

Template.playlist.events({
	'click input#play': function() {
		//console.log(Template.player.current_video);
		var key = $.getParam($('input#url').val(), 'v');
		Videos.update({
			current: true
		}, {
			$set: {
				current: false
			}
		}, false, true);
		console.log('videos con esta key', Videos.find({
			'key': key
		}).count());
		if(Videos.find({
			'key': key
		}).count() > 0) {
			Videos.update({
				'key': key
			}, {
				$set: {
					current: true
				}
			}, false, true);
			//console.log('asdasd');
		} else {
			Videos.insert({
				'key': key,
				current: true
			});
		}
		
		if(typeof console !== 'undefined') console.log("You pressed the button play");
	}
});