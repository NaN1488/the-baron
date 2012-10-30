//extract param name from url
$.getParam = function(url, name) {
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
	return results[1] || 0;
}