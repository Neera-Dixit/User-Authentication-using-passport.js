var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var userModel = require('../models/usermodel');

module.exports = function(){

passport.use(new GoogleStrategy({
    clientID: '610664193885-9t1oksnnbaec87uqnn1qh3q6anpi1n68.apps.googleusercontent.com',
    clientSecret: '1vEIxH2XJa9o4_K7kLK3LBa5',
    callbackURL: "http://localhost:3000/auth/google/callback"},
    function(token,refreshToken,profile,done){

        var query = {
            'google.id' : profile.id
        };  

        userModel.findOne(query,function(err,user){

            if(user){
                done(null,user);
            }
            else{
                var user = new userModel;
                user.email = profile.emails[0].value;
                user.image = profile._json.image.url;
                user.displayName = profile.displayName;

                user.google = {};
                user.google.id = profile.id; 
                user.google.token = token;

                user.save();
                done(null,user); 
            }
        });
    	
    }));

}