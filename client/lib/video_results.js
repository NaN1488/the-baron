VideoResults = {
	_:{
		result_container:'#list_videos',
		videos_result: null,
		template_result:'<div class="video_result span2" data-video="%video_id%">'+
			'<div class="img"><span class="duration">%duration%</span><img src="%img_url%"/></div>'+
			'<div class="result_title">%title%</div>'+
			//'<div class="result_description movie-synopsis">%description%</div>'+
			''+
			'</div>',
		template_prev_button: '<div class="paginator"><button class="btn" id="prev_page" ><i class="icon-chevron-left"></i></button></div>',
		template_next_button: '<div class="paginator"><button class="btn" id="next_page" ><i class="icon-chevron-right"></i></button></div>'


	},
	fill_result_list: function (videos, page){
		var list_of_videos_html = '';
		this._.videos_result = videos;
		var self = this;
		$(videos).each(function (i, v){
			list_of_videos_html += self.formatVideoList(v);
		});
		list_of_videos_html += this._.template_next_button;
		if (page > 1){
			list_of_videos_html = this._.template_prev_button + list_of_videos_html;
		}
		$(this._.result_container).html(list_of_videos_html);
	},
	get_video_id: function (entry){
		return entry.id.$t.match(/(?!.*\/).*/)[0];
	},
	formatVideoList: function  (entry){
	    var time = new Date(null);
	    time.setSeconds(entry.media$group.yt$duration.seconds);
	    var minutes = time.toTimeString().substring(3,9);
	    video_id = this.get_video_id(entry);
	    var template = this._.template_result;
	    template = template.replace('%video_id%',video_id);
	    template = template.replace('%title%', entry.title.$t.substring(0, 55));
	    template = template.replace('%img_url%', entry.media$group.media$thumbnail[3].url);
	    template = template.replace('%description%', entry.content.$t.substring(0, 70));
	    template = template.replace('%duration%', minutes);
	    return template;
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