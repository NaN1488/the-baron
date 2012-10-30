Meteor.setInterval(function(){
	current_videos = CurrentVideos.find({channel:'default'}).fetch();
	time = 0;
	duration = 0;
	if (current_videos.length == 1) {
		time = current_videos[0].time
		duration = current_videos[0].duration
	}
	time += 1;
	if (time < parseInt(duration)){
		CurrentVideos.update({channel:'default'}, {$set: {'time':time} });

		video_id = CurrentVideos.find({channel:'default'}).fetch()[0].video_id;
		console.log("current_time:",time, "video_id:", video_id, "duration:", duration);
	}
	//Template.player.set_current_time(Template.player.current_time() + 1);
}, 1000);
