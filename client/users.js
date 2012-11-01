Users = {
	get_current_user: function() {
		if(Meteor.user() != null){
			if(Meteor.user().emails == undefined){
				return Meteor.user().profile.name;
			} else {	
				return Meteor.user().emails[0].address;
			}
		} else {
			return 'anonymous';
		}
	}
}