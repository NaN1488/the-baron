Channels = new Meteor.Collection('channels');
if (Meteor.isClient){
	Controller.subscribe_channel();
}
/* fields
name: ''
video_id:
start_at: datetime
videos_in_queue: arrays videos ID
*/
