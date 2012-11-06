// jquery.stars v0.1
// Copyright (c) 2011 Sitekickr.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

jQuery.fn.stars = function(options) {

	var settings = {
		'off_image'	: '/images/star-off.png',
		'on_image'	: '/images/star-on.png'
	};
	
	if ( options ) { 
		jQuery.extend( settings, options );
	}

	$(this).each(function() {
		$(this).find('input,label').hide();
		
		$(this).find('input').each(function() {
			$(this).after('<img src="' + settings.off_image + '" alt="" />');
			$(this).next().click(function() { 
				$(this).prev().attr('checked', 'checked');
				$(this).parent().siblings().children('img').attr('src', settings.off_image);
				$(this).attr('src', settings.on_image).parent().prevUntil().children('img').attr('src', settings.on_image);
			});
		});
	});
	return this;
}