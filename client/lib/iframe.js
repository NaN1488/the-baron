//@see https://developers.google.com/youtube/iframe_api_reference
if (_player == undefined){
  var _player;
    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
  function onYouTubeIframeAPIReady() {
    _player = new YT.Player('_player', {
      playerVars:{autoplay: 1, start: Controller.current_time()},
      height: '390',
      width: '640',
      videoId: Controller.current_video(),
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
  // The function indicates that when playing a video (state=1)
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      Controller.update_duration();
    }
  }
  function stopVideo() {
    _player.stopVideo();
  }

}