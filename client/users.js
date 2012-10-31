Users = {
	get_current_user_email: function() {
		if(Meteor.user() != null){
			return Meteor.user().emails[0].address;
		} else {
			return 'anonymous';
		}
	}
}