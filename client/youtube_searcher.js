//rendered is like document ready
Template.playlist.rendered = function(){
    $("#url").select2({
            placeholder: "Search in Youtube",
            minimumInputLength: 3,
            ajax: {
                url: "http://gdata.youtube.com/feeds/api/videos",
                dataType: 'jsonp',
                quietMillis: 100,
                data: function (term, page) { // page is the one-based page number tracked by Select2
                    return {
                        q: term, //search term
                        //page_limit: 10, // page size
                        'start-index': (page==1)?1:(((page-1) * 10)+1), // page number
                        key:'AI39si60UmOiyTb4Pg9kSmqg4Vo2RC290YMztfSKl-vE1eoXj6rDZDgZfT5D7QQ6mKWWeRX5Pjr6hy3dT6OOUcBCTmvHja0mgg',
                        time:'all_time',
                        orderby:'relevance',
                        'max-results':10,
                        format:5,
                        alt:'json'
                        //callback:'?' // please do not use so this example keeps working
                    };
                },
                results: function (data, page) {
                    console.log(data)
                    var more = (page * 10) < data.feed.openSearch$totalResults.$t; // whether or not there are more results available
                    $.each(data.feed.entry, function(i, entry){
                        id = entry.id.$t.split(/\//);
                        id = id[id.length-1];
                        entry.id = id;
                    });
                    
                    // notice we return the value of more so Select2 knows if more results can be loaded
                    return {results: data.feed.entry, more: more};
                }
            },
            formatResult: formatVideoList, // omitted for brevity, see the source of this page
            formatSelection: formatVideoSelection, // omitted for brevity, see the source of this page
            dropdownCssClass: "bigdrop" // apply css that makes the dropdown taller
        });
   $('#url').change(function (){
        if ($('#url').data('send') != video_selected.id){
            $('#url').data('send',$(this).val());
            $('#title').html(video_selected.title.$t);
            $('#play').trigger('click');
        }
   });
   $().ready(function (){
        Preview.bind_search_result();
   })
  
}
function formatVideoList (entry){
    var time = new Date(null);
    time.setSeconds(entry.media$group.yt$duration.seconds);
    var minutes = time.toTimeString().substring(3,9);
    
    var markup = "<table class='movie-result' ><tr>";
        //if (entry.media$group.media$thumbnail !== undefined && movie.media$group.media$thumbnail[0] !== undefined) {
        markup += "<td class='movie-image'><img data-video-id='"+entry.id+"' class='youtube-search-result' src='" + entry.media$group.media$thumbnail[3].url + "' /><strong class='movie-synopsis'>" + minutes + "</strong></td>";
       
        //}
        markup += "<td class='movie-info'><div class='movie-title'>" + entry.title.$t + "</div>";
        
        
        
        if (entry.content.type == 'text') {
            markup += "<div class='movie-synopsis'>" + entry.content.$t.substring(0, 200); + "</div>";
        }

        markup += "</td></tr></table>";
        return markup;
}

var video_selected;
function formatVideoSelection(entry){
    video_selected=entry;
    return entry.title.$t;
}
