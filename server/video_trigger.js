VideoTrigger = {
	_:{
		seconds_offset: 5
	},

	play_next_in_queue: function(channel) {
		channel_data = Channels.findOne({name:channel});
		videos = channel_data.videos_in_queue;
		//remove last video if is it's the current
		if (videos.length > 0 && channel_data.video_id == videos[0]) videos.remove(0);
		//play next video
		if (videos.length > 0) {
			var duration = parseInt(Videos.findOne({key:videos[0]}).duration);
			//console.log('next video should be executed at DURATION->', duration);
			Channels.update({name:channel}, 
				{$set: {
					videos_in_queue: videos,
					video_id: videos[0],
					start_at: BaronServer.get_server_time()
				}
			});
			Meteor.setTimeout(function () {	
				//call next one in the queue when current video has ended
				VideoTrigger.play_next_in_queue(channel);
			}, 
				(duration+VideoTrigger._.seconds_offset) * 1000
			);

		} else {
			//last video was ran
			Channels.update({name:channel}, 
				{$set: {
					videos_in_queue: videos,
					video_id: '',
					start_at: 0
				}
			});

		}

	}
}