//set videos collection
Template.playlist.videos = function() {
	return Videos.find({},{ sort: {hour: -1} });
}

//Define events for playlist
Template.playlist.events({ 
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