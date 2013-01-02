VideoResults = {
	_:{
		result_container:'#list_videos',
		videos_result: null
	},
	fill_result_list: function (videos, source){
		var html = '';
		this._.videos_result = videos;
		var self = this;
		$(videos).each(function (i, v){
			html += self.formatVideoList(v);
		});
		$(this._.result_container).html(html);
	},
	get_video_id: function (entry){
		return entry.id.$t.match(/(?!.*\/).*/)[0];
	},
	formatVideoList: function  (entry){
	    var time = new Date(null);
	    time.setSeconds(entry.media$group.yt$duration.seconds);
	    var minutes = time.toTimeString().substring(3,9);
	    video_id = this.get_video_id(entry);
	    var markup = "<table class='movie-result' ><tr>";
	        //if (entry.media$group.media$thumbnail !== undefined && movie.media$group.media$thumbnail[0] !== undefined) {
	        markup += "<td class='movie-image'><img data-video-id='"+video_id+"' class='youtube-search-result' src='" + entry.media$group.media$thumbnail[3].url + "' /><strong class='movie-synopsis'>" + minutes + "</strong></td>";
	       
	        //}
	        markup += "<td class='movie-info'><div class='movie-title'>" + entry.title.$t + "</div>";
	        
	        
	        
	        if (entry.content.type == 'text') {
	            markup += "<div class='movie-synopsis'>" + entry.content.$t.substring(0, 200); + "</div>";
	        }

	        markup += "</td></tr></table>";
	        return "<div class='video_result' data-video='"+video_id+"'>" + markup +'</div>';
	},
	video: function (id){
		var video = null;
		var self = this;
		$(this._.videos_result).each(function (i, v){
			video_id = self.get_video_id(v);
			if (video_id == id) {
				video = v;
				return false;
			}
		});
		return video;
	}

}