//controller
Controller = {
	_:{
		default_channel:'default'
	},
	//this method propagate the selected video to the rest of the clients
	load_video: function (channel){
		if (channel === undefined) channel = this._.default_channel;
		//check if _player is ready
		if (_player != undefined && _player.loadVideoById != undefined){
	 		Meteor.call('current_time_video', function (err, data){
	 			_player.loadVideoById(Controller.current_video());
	 			_player.seekTo(data);
	 		})	
 		}
	},
	// return video id for a given channel
	current_video: function (channel){
		if (channel === undefined) channel = this._.default_channel;
		channels = Channels.find({name:channel}).fetch();
		if(channels.length == 0) return false;
		return channels[0].video_id;
	},
	play_video: function (video_id, channel){
		if (channel === undefined) channel = this._.default_channel;
		Meteor.call('get_server_time', function (err, data){	
	 		Channels.update({name:channel}, 
	 			{
	 				$set:{
	 					video_id: video_id,
	 					start_at: data
	 				}
	 			}
	 		);
	 		_player.loadVideoById(video_id);
	 	})	
	}
}