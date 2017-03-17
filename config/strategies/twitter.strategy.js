var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var userModel = require('../models/usermodel');

module.exports = function(){

	passport.use(new TwitterStrategy({
		consumerKey : 'JmjOJh8rrO3QUseidOYfKF9ZL',
		consumerSecret : '9hP29oB9rwb9ncrvDM9rOUNAfNBSPeWPGwoFBj2CCy82Sz2MES',
		callbackURL : 'http://localhost:3000/auth/twitter/callback',
		passReqToCallback: true

	},
	function(req,token,tokenSecret,profile,done){

		var query = {
            'twitter.id' : profile.id
        }; 

        userModel.findOne(query,function(err,user){

        	if(user){
                done(null,user);
            }
            else{
		        var user = new userModel;
		    	//no email for twitter
		    	user.image = profile._json.profile_image_url;
		    	user.displayName = profile.displayName;

		    	user.twitter = {};
		    	user.twitter.id = profile.id;
		    	user.twitter.token = token;
		    	user.twitter.tokenSecret = tokenSecret;
		    	user.save();
		    	done(null,user);
            }

        });

	}));
};