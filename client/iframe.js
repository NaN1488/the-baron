//@see https://developers.google.com/youtube/iframe_api_reference

if (Meteor.isClient){

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

  if (_player == undefined){
    var _player;
      // This function creates an <iframe> (and YouTube player)
      // after the API code downloads.
    function onYouTubeIframeAPIReady() {
      _player = new YT.Player('_player', {
        playerVars:{autoplay: 1, start: Template.player.current_time()},
        height: '390',
        width: '640',
        videoId: Template.player.current_video(),
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    // The API calls this function when the player's state changes.
    // The function indicates that when playing a video (state=1),
    // the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
      if (event.data == YT.PlayerState.CUED){
         event.target.playVideo();
      }
    }
    function stopVideo() {
      _player.stopVideo();
    }

  }
}