if (Meteor.isClient) {
  Match = new Meteor.Collection("match"); 

  Meteor.startup(function(){
    moment.lang('es');
    var m = Meteor.user();
    console.log(m);

  });

  Template.add_match.games = function(){
    var m = Match.find({}, {sort: {date: -1}, limit:10});
    return m;
  }


  Template.login.rendered = function() {
    $('#login-sign-in-link').text('Entrar');
    $('.login-close-text').text('Cerrar');
    $('#login-username-or-email-label').text('Nombre de usuario o email');
    $('#login-password-label').text('Password');
    $('#signup-link').text('Registrarse');
    $('#forgot-password-link').text('Idiot, olvide el password');
    $('#login-buttons-forgot-password').text('Olvidé password');
    $('#back-to-login-link').text('Volver');
    $('#login-username-label').text('Entrar');
    $('#login-buttons-open-change-password').text('Cambiar password');
    $('#login-buttons-logout').text('Salir');
    $('#reset-password-new-password-label').text('Password');
    $('#login-old-password-label').text('Actual password');
    $('#login-password-label').text('Password');
    $('#login-buttons-do-change-password').text('Cambiar password');
    if ($('#login-buttons-password').text().indexOf('Entrar') != -1) {
      $('#login-buttons-password').text('Entrar');
    } else {
      $('#login-buttons-password').text('Entrar');
    }

    if ($('.message.error-message').text().indexOf('Username debe ser de 3 caracteres o mas') != -1) {
      $('.message.error-message').text('Username debe ser de 3 caracteres o mas');
    } else if ($('.message.error-message').text().indexOf('Password incorrecto') != -1 || $('.message.error-message').text().indexOf('User not found') != -1) {
      $('.message.error-message').text('Password Incorrecto');
    }
  };





  Template.add_match.events({
    "submit": function(event){
      event.preventDefault();
      var player_a = $("#player_a").val();
      var player_b = $("#player_b").val();
      var owner = Meteor.user().emails[0].address;
      console.log(owner);
      $('#player_a, #player_b').val('');
      Meteor.call("addMatch", player_a, player_b, owner);
    }
  });
}

if (Meteor.isServer) {

  Match = new Meteor.Collection("match");


  Meteor.methods({
    addMatch: function(player_a, player_b, owner){
      console.log("adding match");
      Match.insert({
        "player_a":player_a, 
        "player_b":player_b,
        "date": new Date(),
        "owner": owner
      });
      console.log(Date());
    }
  });
}


