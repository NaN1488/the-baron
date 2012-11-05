function getTime() {
  var date = new Date();
  var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  return {  date: date, 
            utc: utc, 
            timestamp: (Date.now() / 1000)};
}

/**
* Adding methods wrapper inside
*/
Meteor.methods({
  getTime: function () {
 		return getTime();
  },
});