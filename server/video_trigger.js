VideoTrigger = {
	play_next_in_queue: function(channel) {
		console.log('play_next_in_queue');
		channel_data = Channels.findOne({name:channel});
		console.log(channel_data);
		videos = channel_data.videos_in_queue;
		//remove last video if is it's the current
		if (videos.length > 0 && channel_data.video_id != '') videos.remove(0);
		//play next video
		if (videos.length > 0) {
			var duration = Videos.findOne({key:videos[0]}).duration;
			console.log('next video should be executed at DURATION->', duration);
			Channels.update({name:channel}, 
				{$set: {
					videos_in_queue: videos,
					video_id: videos[0],
					start_at: BaronServer.get_server_time()
				}
			});
			Meteor.setTimeout(function () {	
				VideoTrigger.play_next_in_queue(channel);
			}, duration*1000);

		}
	}
}