
VideosWrapper = {
	current: function(channel){
		if (channel == undefined) channel = 'default'
		current_videos = CurrentVideos.find({channel:channel}).fetch()[0];
		return Videos.find({key:current_videos.video_id}).fetch()[0]
	}
}