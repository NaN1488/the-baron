//controller
Controller = {
	_:{
		default_channel:'default',

	},
	//this method propagate the selected video to the rest of the clients
	load_video: function (channel){
		console.log('load_video');
		var channel = ChannelHelper.current();
		//check if _player is ready
		if (_player != undefined && _player.loadVideoById != undefined && channel != undefined){

	 		Meteor.call('current_time_video', function (err, time){
	 			var current_video_id = Controller.current_video();
	 			if(_player.video_id != undefined){
			 		if ( _player.video_id == current_video_id)
			 			//the  video is already loaded
			 			return false;
	 			}
	 			_player.video_id = current_video_id;
	 			_player.loadVideoById(current_video_id, time);
	 		});
 		}
	},
	// return video id for a given channel
	current_video: function (){
		var channel = ChannelHelper.current();
		if(channel == undefined) return false;
		return channel.video_id;
	},
	change_video: function (video_id, channel){
		console.log('change_video')
		var channel = ChannelHelper.current();
		Meteor.call('get_server_time', function (err, time){	
	 		Channels.update({_id: channel._id}, 
	 			{
	 				$set:{
	 					video_id: video_id,
	 					start_at: time
	 				}
	 			}
	 		);
	 		Controller.load_video();
	 	})	
	}
}