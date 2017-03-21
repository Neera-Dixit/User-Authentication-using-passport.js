var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../models/usermodel');

module.exports = function(){

	passport.use('local-register',new LocalStrategy(

		{usernameField:"username", passwordField:"password",passReqToCallback : true},
  		function(req,username, password, done) {

			var query = {
            	'local.email' : req.body.username
        	}; 

 			userModel.findOne(query,function(err,user){

 				if(err){
 					done(err,null);
 				}	

 				if(user){
 					done(null,false);
 				}
 				else{
	 				user = new userModel;
	 				user.local = {};
	 				user.local.email = req.body.username;
	 				user.local.password = user.hashPassword(req.body.password);
	 				user.local.age = req.body.age;
	 				user.save();
	 				done(null,user);
 				}

 			});

 		}

 	));

	passport.use('local-login',new LocalStrategy(

		{usernameField:"username", passwordField:"password"},
  		function(username, password, done) {

	 		var query = {
            	'local.email' : username
        	}; 

 			userModel.findOne(query,function(err,user){

 				if(user){

 					if(user.validatePassword(password)){
 						done(null,user);
 					}
 					else{
 						done(err,null);
 					}
 				}
 				else{
 					console.log("S");
 					done(err,null);
 				}
 			});
  		}
	));

};
