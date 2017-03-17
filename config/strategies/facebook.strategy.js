var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var userModel = require('../models/usermodel');

module.exports = function(){

	passport.use(new FacebookStrategy({
		clientID: '619805931544735',
    clientSecret: '7dbd7092ae6e28da1aa3a83181d32c4b',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields : ['displayName','emails'],//other data in profile will be undefined
		passReqToCallback: true

	},
	function(req,accessToken,refreshToken,profile,done){
        console.log("at : ",accessToken);

                var query = {
            'facebook.id' : profile.id
        };  

        userModel.findOne(query,function(err,user){

            if(user){
                done(null,user);
            }
            else
            {
                user = new userModel; 
                user.email = profile.emails[0].value;
                user.displayName = profile.displayName;

                user.facebook = {};
                user.facebook.id = profile.id;
                user.facebook.token = accessToken;
                user.save();
                done(null,user);
            }
	});

    }));
};