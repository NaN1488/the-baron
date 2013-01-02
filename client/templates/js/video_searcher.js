Template.video_searcher.events({
	'keypress input#video_searcher': function (e){
		if (e.keyCode != 13 ) return; //if not "enter" key
		VideoSearcher.youtube($(e.currentTarget).val());
	},
	'click #btn_video_searcher': function (e){
		VideoSearcher.youtube($('input#video_searcher').val());
	},
	'click .video_result': function (e){
		playVideo($(e.currentTarget).data('video'));
	}
});
