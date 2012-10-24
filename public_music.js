Videos = new Meteor.Collection('videos');
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to public_music.";
  };
  Template.player.videos = function () {
    return Videos.find({});
  }
  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
$.getParam = function (url, name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    return results[1] || 0;
}

Template.player.current_video = function(){
   var videos = Videos.find({current:true}).fetch();
   console.log(videos);
   if (videos.length == 0) return false;
   return videos[0].key;
}
Template.player.events({
    'click input#play' : function () {
      //console.log(Template.player.current_video);
      var key = $.getParam($('input#url').val(), 'v');
      Videos.update({current:true}, {$set:{current:false}},false, true);
      console.log('videos con esta key', Videos.find({'key':key}).count());
      if (Videos.find({'key':key}).count() > 0){
        Videos.update({'key':key}, {$set:{current:true}}, false, true);
        //console.log('asdasd');
      }else{
        Videos.insert({'key':key, current: true});
      }
      //console.log(Template.player.current_video);
      //Session.set('current_video', $('input#url').val());
      // template data, if any, is available in 'this'
     // console.log(this,"-------------", Template.player.current_video);
      //Session.set('current_video', '2222');
     // this.current_video = 'sssss';
      //console.log(Template.player.current_video);
      if (typeof console !== 'undefined')
        console.log("You pressed the button play");
    } 
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {

          if(Videos.find().count() === 0) {
        videos = [{key:'EzgGTTtR0kc', current: true},
          {key:'7m7njvwB-Ks', current: false}
          ];
      
        for( i=0; i< videos.length; i++){
          Videos.insert({key: videos[i].key, current:  videos[i].current });
         
        }
      }
    // code to run on server at startup
  });
}
