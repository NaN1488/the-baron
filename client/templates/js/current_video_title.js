Template.current_video_title.title = function (){
	channel = ChannelHelper.current();
	if (channel != undefined) {
		video_id = channel.video_id
		video = Videos.findOne({key: video_id});
		if (video != undefined) return video.title;
	}
	return '';
}