/**
expose methods to call from the clients
**/
BaronServer = {
	current_time_video: function (channel){
		if (channel === undefined) channel = 'default'
		current_channel = Channels.find({name:channel}).fetch()[0];
		duration = Videos.find({key:current_channel.video_id}).fetch()[0].duration;
		diff_time = (Date.now() - current_channel.start_at) / 1000;
		if (diff_time < duration)
			return Math.floor(diff_time);
		return null;
	},
	get_server_time: function (){
		return Date.now();
	}
}
/**
* Adding methods wrapper inside
*/
Meteor.methods(BaronServer);