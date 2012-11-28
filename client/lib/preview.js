Preview = {

	_ : {
		css_search_result:'.youtube-search-result',
		css_preview_container:'.preview',
		css_main_iframe: 'iframe',
		data:{
			video_id:'video-id',
			is_mouseover:'is_mouseover',
			current_volume:'current_volume'
		},
		size:{
			width: '280',
			height: '210'
		}
	},
	show: function(result){
		//remove any other preview
		$(this._.css_preview_container).remove();
		$preview = '<div class="well preview" data-video-id="' + $(result).data(this._.data.video_id) + '" ><iframe width="' + this._.size.width + '" height="' + this._.size.height + '" src="http://www.youtube.com/embed/'+ $(result).data(this._.data.video_id) +'" frameborder="0" allowfullscreen></iframe><h5>Is this the video you were looking for?</h5></div>';
        
        $(this._.css_main_iframe).after($preview);
        var self = this;
        //add events
        $(this._.css_preview_container).mouseenter(function(event) {
                $(this).data(self._.data.is_mouseover, true);
                $(this).data(self._.data.current_volume, _player.getVolume());
                //mute video
                _player.setVolume(0);
        });
        $(this._.css_preview_container).mouseleave(function (){
         	_player.setVolume($(this).data(self._.data.current_volume));
            console.log('leaving preview');
            $(this).remove();                
        });
	},
	hide: function (result){
		var self = this;
        setTimeout(function() {
            if ($(self._.css_preview_container).data(self._.data.is_mouseover) != true && $('.preview').data('video-id') == $(result).data('video-id')){
                console.log('changing preview');
                 //_player.setVolume($(this).data('current_volume'));
                $(self._.css_preview_container).remove();
            }  
        }, 600);
	},

	bind_search_result: function (){
		//TODO: check problems with multiple binding
		//below is a quick fix
		$(this._.css_search_result).die('mouseenter');
    	$(this._.css_search_result).die('mouseleave');
    	var self = this;
		$(this._.css_search_result).live(
        	{mouseenter: function (){
                self.show(this);
            }, 
         mouseleave: function (){
            	self.hide(this);
            }
        });
	}
}