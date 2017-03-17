var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var userModel = require('../models/usermodel');

module.exports = function(){

	passport.use(new InstagramStrategy({
	    clientID: 'cc5b81d6b1824f42b974407e639ad513',
        clientSecret: 'aaf125a45347479097aa0d97c03dd679',
        callbackURL: 'http://localhost:3000/auth/instagram/callback',
  	},
  	function(accessToken, refreshToken, profile, done) {
        var query = {
            'instagram.id' : profile.id
        };  

         userModel.findOne(query,function(err,user){

            if(user){
                done(null,user);
            }
            else{
                var user = new userModel;
                //no email for twitter
                user.image = profile._json.data.profile_picture;
                user.displayName = profile.displayName;

                user.instagram = {};
                user.instagram.id = profile.id;
                user.instagram.token = accessToken;
                user.save();
                done(null,user);
            }


        });

	}));
};