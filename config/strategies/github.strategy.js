var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var userModel = require('../models/usermodel');

module.exports = function(){

	passport.use(new GithubStrategy({
		clientID: '1742227e8ac66ae4208f',
    	clientSecret: '16b60a982584b9356bbf526a35fb4f1390a4696b',
    	callbackURL: 'http://localhost:3000/auth/github/callback',
  	},
  	function(accessToken, refreshToken, profile, done) {
         console.log(accessToken+" : "+refreshToken+" : "+profile);
        var query = {
            'github.id' : profile.id
        };  

        userModel.findOne(query,function(err,user){

            if(user){
                done(null,user);
            }
            else{
                var user = new userModel;
                //no email for twitter
                user.image = profile.photos[0].value;
                user.displayName = profile.displayName;

                user.github = {};
                user.github.id = profile.id;
                user.github.token = accessToken;
                user.save();
                done(null,user);
            }

        });


	}));
};