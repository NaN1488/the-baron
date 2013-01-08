/**
expose methods to call from the clients
**/
BaronServer = {
	current_time_video: function (current_channel){
    if(current_channel != undefined){
      //TODO: get the duration of the current video
      diff_time = (Date.now() - current_channel.start_at) / 1000;
      return Math.floor(diff_time) ;
    }
	},
	get_server_time: function (){
		return Date.now();
	}
}
/**
* Adding methods wrapper inside
*/
Meteor.methods(BaronServer);