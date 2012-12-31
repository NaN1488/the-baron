Template.current_video_title.title = function (){
	channel = Channels.find({name:'default'}).fetch();
	if (channel.length > 0){
		console.log(channel);
		video_id = channel[0].video_id
		return Videos.find({key: video_id}).fetch()[0].title
	}
	return 'untitle';
	
}