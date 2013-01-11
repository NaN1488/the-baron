Template.current_video_title.title = function (){
	channel = Channels.find({name:'default'}).fetch();
	if (channel.length > 0) {
		video_id = channel[0].video_id
		videos = Videos.find({key: video_id}).fetch();
		if (videos.length >0) return videos[0].title
	}
	return '';
}