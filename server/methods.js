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
		if (videos.length > 0 && videos.indexOf(video_id) > -1) {
			return {ret:false, error:"the viedo was added recently"};
		}
		BaronServer.add_ordered_video(videos,video_id);
		Channels.update({name:channel}, {$set: {videos_in_queue: videos}});
		BaronServer.current_time_video();
		return {ret:true, error:''};
	},
	pop_video: function (video_id, channel){
		if (channel === undefined) channel = 'default';
		channel_data = Channels.findOne({name:channel});
		videos = channel_data.videos_in_queue;
		console.log(videos, videos.indexOf(video_id), video_id);
		videos.remove(videos.indexOf(video_id));
		if (channel_data.video_id == video_id){
			console.log('blanquea',video_id);
			Channels.update({name:channel}, {$set: {videos_in_queue: videos, video_id: ''}}, function (){
				BaronServer.current_time_video();
			});
		}else{
			Channels.update({name:channel}, {$set: {videos_in_queue: videos}});
		}
		
		return {ret:true, error:''};
	},
	add_ordered_video: function (videos, video_id){
		
		var user_video = Videos.findOne({key: video_id}).user;
		if (videos.length == 0 || user_video == "anonymous") {
			videos.push(video_id);
		}
		else {
			var user_playlist = new Array();
			var count = 0;
			var flag = true;
			while(flag && count < videos.length) {
				user = Videos.findOne({key: videos[count]}).user;
				if(user == user_video) { 
					user_playlist.splice(0, user_playlist.length);
				} else {
					if ((user == "anonymous" && count > 0) || user_playlist.indexOf(user) > -1 ) {
						videos.splice(count,0,video_id);
						flag = false;
					} else {
						user_playlist.push(user);
					}

				}
				count = count + 1;

			}
			if(flag) {
				videos.push(video_id);
			}
		}
	}
}
/**
* Adding methods wrapper inside
*/
Meteor.methods(BaronServer);