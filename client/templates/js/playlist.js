//set videos collection
Template.playlist.videos = function() {
  var channel_data = Channels.findOne({name:'default'});
	var videos;
  if (typeof(channel_data) !== "undefined"){
    console.log(channel_data);
    videos = Videos.find({key:{$in: channel_data.videos_in_queue}}, { sort: {hour: 0}});
    console.log(videos);
    
  }else{
     videos = Videos.find({},{ sort: {hour: -1} });
  }
  return videos;
}

Template.emptyPlaylist.events({
    //clean play list
  'click input.emptyPlaylist': function() {
    var reply = prompt("Hey you! You are about to remove ALL Videos, give us the passphrase or you will be EXTERMINATED!", "");
    //TODO: check user is admin
    if(reply == "tategay") 
      Videos.remove({});
  }
});

//Define events for playlist
Template.playlist.events({
  'click .deleteSong': function() {
    console.log((this).key);
    //TODO: check user is admin
    Controller.pop_video((this).key);
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