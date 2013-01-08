Videos = new Meteor.Collection('videos');

/** FIELDS
key: key, 
title: video_selected.title.$t,
current: true, 
hour: hour, 
user: Users.get_current_user()
yootube: entry
*/