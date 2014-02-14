if (Meteor.isClient) {
  Match = new Meteor.Collection("match"); 

  Meteor.startup(function(){
    moment.lang('es');

  });

  Template.add_match.games = function(){
    var m = Match.find({}, {sort: {date: -1}, limit:3});
    return m;
  }





  Template.add_match.events({
    "click #add_match": function(event){
      event.preventDefault();
      var player_a = $("#player_a").val();
      var player_b = $("#player_b").val();
      Meteor.call("addMatch", player_a, player_b);
    }
  });
}

if (Meteor.isServer) {

  Match = new Meteor.Collection("match");


  Meteor.methods({
    addMatch: function(player_a, player_b){
      console.log("adding match");
      Match.insert({
        "player_a":player_a, 
        "player_b":player_b,
        "date": new Date()
      });
      console.log(Date());
    }
  });
}


