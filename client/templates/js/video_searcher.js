Template.video_searcher.rendered =  function (){
	YoutubeAutocomplete.bind_autocomplete();
}

Template.video_searcher.events({
	'keypress input#video_searcher': function (e){
		if (e.keyCode != 13 ) return; //if not "enter" key
		VideoSearcher.youtube($(e.currentTarget).val());
	},
	'click #btn_video_searcher': function (e){
		VideoSearcher.youtube($('input#video_searcher').val());
		e.preventDefault();
	},
	'click .video_result': function (e){
		playVideo($(e.currentTarget).data('video'));
	}
});