Template.current_video_title.title = function (){
	channel = Channels.find({name:'default'}).fetch();
<<<<<<< HEAD
	if (channel.length > 0 && typeof(channel) !== 'undefined'){
		//console.log(channel);	
		video_id = channel[0].video_id;

		if(typeof(Videos.find({key: video_id}).fetch()[0].title) !== 'undefined' ) {		
			console.log("Title: " + Videos.find({key: video_id}).fetch()[0].title);
			return Videos.find({key: video_id}).fetch()[0].title;
		}
=======
	if (channel.length > 0) {
		video_id = channel[0].video_id
		videos = Videos.find({key: video_id}).fetch();
		if (videos.length >0) return videos[0].title
>>>>>>> c885e5699d3c43b910b78f39694f91e094673b96
	}
	return '';
	
}