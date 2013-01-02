VideoSearcher = {
	_:{
		result_per_page: 10,
	},
	youtube: function(query, page){
		if (page === undefined) page = 1;
		
		page = (page==1)?1:(((page-1) * this._.result_per_page)+1)
		
		var data = {
			q:query, 
			'start-index':page,
			key:'AI39si60UmOiyTb4Pg9kSmqg4Vo2RC290YMztfSKl-vE1eoXj6rDZDgZfT5D7QQ6mKWWeRX5Pjr6hy3dT6OOUcBCTmvHja0mgg',
            time:'all_time',
            orderby:'relevance',
            'max-results':this._.result_per_page,
            format:5,
            alt:'json'
        };
		$.ajax({
			url:"http://gdata.youtube.com/feeds/api/videos",
			dataType: 'jsonp',
			data: data,
			success: function(response){
				VideoResults.fill_result_list(response.feed.entry);
			}
		});
	}
}