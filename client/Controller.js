//controller
Controller = {
	_:{
		default_channel:'default'
	},
	/**
	* send the duration of the current video
	* @used current_time.js
	*/
	update_duration: function (channel){
		if (channel === undefined) channel = this._.default_channel;
		CurrentVideos.update({channel:channel},
 		 {$set: 
 		 	{
 		 		duration: _player.getDuration()
 		 	}
 		 });
	},
	//load the video and update the CurrentVideos for a given channel
	load_video: function (channel){
		if (channel === undefined) channel = this._.default_channel;

		if (_player != undefined){
	 		_player.loadVideoById(Template.player.current_video());
	 		CurrentVideos.update({channel:'default'},
	 		 {$set: 
	 		 	{
	 		 		time:0, 
	 		 		video_id:Template.player.current_video(),
	 		 		duration: _player.getDuration()
	 		 	}
	 		 });
 		}
	},
	//return curren time
	current_time: function (){
		current_videos = CurrentVideos.find({channel:'default', video_id: Template.player.current_video()}).fetch();
 		time = 0;
 		if (current_videos.length == 1) {
 			time = current_videos[0].time
 		}else{
 		 	CurrentVideos.update({channel:'default'}, {$set: {'time':time, video_id: Template.player.current_video()} });
 		}
		return time;
	},
	// return video id
	current_video: function (){
		var videos = Videos.find({current: true}).fetch();
		if(videos.length == 0) return false;
		return videos[0].key;
	}
}