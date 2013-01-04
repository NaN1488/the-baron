//set videos collection
Template.playlist.videos = function() {
	return Videos.find({},{ sort: {hour: -1} });
}

//Define events for playlist
Template.playlist.events({ 

  //click play button
  'click input#play': function() {
    var key = $('#url').val();
    playVideo(key);
  },
  //clean play list
  'click input#emptyPlaylist': function() {
    var reply = prompt("Hey you! You are about to remove ALL Videos, give us the passphrase or you will be EXTERMINATED!", "");
    //TODO: check user is admin
    if(reply == "tategay") 
      Videos.remove({});
  },
  'click input.deleteSong': function() {
    var reply = prompt("Hey you! You are about to remove a video, give us the passphrase or DIE!", "");
    //TODO: check user is admin
    if(reply == "tategay") 
      Videos.remove({ key: (this).key });
  },
  'click input.replaySong': function() {
    var reply = prompt("Hey you! You are about to make us all hear the same song again, it must be GOOD! So give us the passphrase or run!", "");
    //TODO: check user is admin
    if(reply == "tategay") 
      playVideo((this).key);
  },
  'click input#addMediaButton': function() {
    if($("#addMedia").is(":visible"))
      $("#addMedia").hide("slow");
    else
      $("#addMedia").show("slow");
    }
});


//Rendered is like document ready Jquery
Template.playlist.rendered = function(){
   /* $("#url").select2({
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
            $('#play').trigger('click');
        }
   });
   $().ready(function (){
        Preview.bind_search_result();
   })*/
  
}