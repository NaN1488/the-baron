Template.current_video_title.title = function (){
	channel = Channels.find({name:'default'}).fetch();
	if (channel.length > 0 && typeof(channel) !== 'undefined'){
		//console.log(channel);	
		video_id = channel[0].video_id;

		if(typeof(Videos.find({key: video_id}).fetch()[0].title) !== 'undefined' ) {		
			console.log("Title: " + Videos.find({key: video_id}).fetch()[0].title);
			return Videos.find({key: video_id}).fetch()[0].title;
		}
	}
	return 'untitle';
	
}