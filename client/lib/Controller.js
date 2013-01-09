//Controller /bad name for a GOD class :(
Controller = {
	_:{
		//TODO: refactor default channel to current channel
		default_channel:'default',

	},
	//load the current video for the current channel at the current time :)
	load_video: function (channel){
		if (channel === undefined) channel = this._.default_channel;
		//check if _player is ready
		if (_player != undefined && _player.loadVideoById != undefined){
			//server call to get the current video
	 		Meteor.call('current_time_video', function (err, time){
	 			var current_video_id = Controller.current_video();
	 			if(_player.video_id != undefined){
			 		if ( _player.video_id == current_video_id)
			 			//the  video is already loaded 
			 			return false;
	 			}
	 			//set current video_id in _player(YoutubeObject)
	 			//_player.video_id is a custom variable for us to use
	 			_player.video_id = current_video_id;
	 			if (time !== null){
	 				_player.loadVideoById(current_video_id, time.time);
	 			}
	 		});
 		}
	},
	// return the current video id for a given channel
	current_video: function (channel){
		if (channel === undefined) channel = this._.default_channel;
		channels = Channels.find({name:channel}).fetch();
		if(channels.length == 0) return false;
		return channels[0].video_id;
	},
	add_video_to_queue: function(video_id, channel){
		//send the video_id to the server in order to add it to the queue on the current channel
		Meteor.call('add_video_to_queue', video_id, this._.default_channel, null);
	},
	subscribe_channel: function (){
		// when Channels are updated with a new video_id, trigger Controller.load_video() 
		var update_channel = function () {
		    var ctx = new Meteor.deps.Context();  // invalidation context
		    ctx.onInvalidate(update_channel);    // rerun update() on invalidation
		    ctx.run(function () {
			    if (typeof(Channels) === "undefined") return;
			     	var channel_data = Channels.findOne({name:'default'});
			     	if (typeof(channel_data) !== "undefined"){
				    	if (_player == undefined || channel_data.video_id != _player.video_id){
				      	Controller.load_video();// playVideo
			      	}
			      }
		    });
		  };
		  update_channel();
	}
}

