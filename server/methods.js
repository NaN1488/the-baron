/**
expose methods to call from the clients
**/
BaronServer = {
	current_time_video: function (channel){
		if (channel === undefined) channel = 'default';
			current_channel = Channels.findOne({name:channel});
		if (current_channel.video_id != ''){
			duration = Videos.findOne({key:current_channel.video_id}).duration;
			diff_time = (Date.now() - current_channel.start_at) / 1000;
			//console.log(diff_time, duration);
			if (diff_time < (duration+5)){
				return {time:Math.floor(diff_time), video_id: current_channel.video_id};
			} else {
				VideoTrigger.play_next_in_queue(channel);
			}
		}else{
			VideoTrigger.play_next_in_queue(channel);
		}
		return null;
	},
	get_server_time: function (){
		return Date.now();
	},
	add_video_to_queue: function(video_id, channel){
		console.log('add_video_to_queue', video_id);
		if (channel === undefined) channel = 'default';
		channel_data = Channels.findOne({name:channel});
		videos = channel_data.videos_in_queue;
		videos.push(video_id);
		Channels.update({name:channel}, {$set: {videos_in_queue: videos}});
		BaronServer.current_time_video();
	}
}
/**
* Adding methods wrapper inside
*/
Meteor.methods(BaronServer);