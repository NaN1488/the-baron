//@see https://developers.google.com/youtube/iframe_api_reference
if (_player == undefined){
  var _player;
    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
  function onYouTubeIframeAPIReady() {
    _player = new YT.Player('_player', {
      playerVars:{autoplay: 0, start: 0},
      height: '390',
      width: '640',
      videoId: '',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
  // The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    console.log('onPlayerReady');
    Controller.load_video();
    /*Meteor.call('current_time_video', function (err, time){
      _player.seekTo(time);
      _player.playVideo();
    });*/
  }

  // The API calls this function when the player's state changes.
  // The function indicates that when playing a video (state=1)
  function onPlayerStateChange(event) {
    /*if (event.data == YT.PlayerState.PLAYING) {
    
    }*/
  }
  function stopVideo() {
    _player.stopVideo();
  }

}