Template.player.events({
	'click input#addMediaButton': function() {
		if($("#addMedia").is(":visible"))
			$("#addMedia").hide("slow");
		else
			$("#addMedia").show("slow");
	}
});