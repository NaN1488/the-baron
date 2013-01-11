Handlebars.registerHelper('is_current_video', function(video_id) {
    	return (video_id == Channels.findOne({name:'default'}).video_id);
});

//TODO: refactor this to call the helper from javscript
var position_in_queue = function(video_id) {
    	var channel_data = Channels.findOne({name:'default'});
    	var videos = channel_data.videos_in_queue;
    	var positions = '';
    	do{
    		var position = videos.indexOf(video_id);
    		if (position > -1){
    			positions += (position + 1) + ' ';
    			videos[position] = '';
    		}
    	}while(position > -1);
    	
    	return positions;


}
Handlebars.registerHelper('position_in_queue', position_in_queue);