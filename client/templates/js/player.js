
//return video_id
Template.player.current_video = function() {
  return Controller.current_video();	
}

//this function is called from the template in order to load the video for any client
Template.player.load_video = function (){
  Controller.load_video();
}

 //load_viewer will create _player once
Template.player.load_viewer = function (){
  if (_player == undefined) {
    //This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }   
}