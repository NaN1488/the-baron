function getTime() {
	var dateTime = new Date();
    var minutes = dateTime.getMinutes();
    var hours = dateTime.getHours();

    if(minutes < 10) minutes = "0"+minutes;

    return {time: hours+":"+minutes, timestamp: (Date.now() / 1000)};
}

function removeSong(key) {
	Videos.remove({ key: key});
}

Meteor.methods({
  getTime: function () {
 		return getTime();
  },

  bar: function () {
    // .. do other stuff ..
    return "baz";
  }
});