function getTime() {
	var dateTime = new Date();
  var minutes = dateTime.getMinutes();
  var hours = dateTime.getHours();
  
  if(minutes < 10) 
    minutes = "0"+minutes;
  
  return {time: hours+":"+minutes, timestamp: (Date.now() / 1000)};
}

/**
* Adding methods wrapper inside
*/
Meteor.methods({
  getTime: function () {
 		return getTime();
  },
});