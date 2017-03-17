var passport = require('passport');
var LinkedinStrategy = require('passport-linkedin').Strategy;
var userModel = require('../models/usermodel');

module.exports = function(){

	passport.use(new LinkedinStrategy({
		consumerKey: '8101shdnywr66t',
    	consumerSecret: 'A0BPXUnQHToQTTdd',
    	callbackURL: 'http://localhost:3000/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile'],
        profileFields: ['id', 'first-name', 'last-name', 'email-address','public-profile-url']
  	},
  	function(token, tokenSecret, profile, done) {

        var query = {
            'linkedin.id' : profile.id
        };  

        userModel.findOne(query,function(err,user){

            if(user){
                done(null,user);
            }
            else{
                var user = new userModel;
                //no email for twitter
                //user.image = profile.photos[0].value;
                user.displayName = profile.displayName;

                user.linkedin = {};
                user.linkedin.id = profile.id;
                user.linkedin.token = token;
                user.save();
                done(null,user);
            }

        });

	}));
};