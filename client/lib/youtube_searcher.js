function formatVideoList (entry){
    var time = new Date(null);
    time.setSeconds(entry.media$group.yt$duration.seconds);
    var minutes = time.toTimeString().substring(3,9);
    video_id =entry.id; // entry.id.$t.match(/(?!.*\/).*/)[0];
    var markup = "<table class='movie-result' ><tr>";
        //if (entry.media$group.media$thumbnail !== undefined && movie.media$group.media$thumbnail[0] !== undefined) {
        markup += "<td class='movie-image'><img data-video-id='"+video_id+"' class='youtube-search-result' src='" + entry.media$group.media$thumbnail[3].url + "' /><strong class='movie-synopsis'>" + minutes + "</strong></td>";
       
        //}
        markup += "<td class='movie-info'><div class='movie-title'>" + entry.title.$t + "</div>";
        
        
        
        if (entry.content.type == 'text') {
            markup += "<div class='movie-synopsis'>" + entry.content.$t.substring(0, 200); + "</div>";
        }

        markup += "</td></tr></table>";
        console.log(entry);
        return "<div class='video_result' data-video='"+video_id+"'>" + markup +'</div>';
}

var video_selected;
function formatVideoSelection(entry){
    video_selected=entry;
    return entry.title.$t;
}
