var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google/callback')
	   .get(passport.authenticate('google',{
	   		successRedirect : '/users/',
	   		failureRedirect : '/error/'
	   }));
	
router.route('/google')
	   .get(passport.authenticate('google',{
	   		scope : ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/plus.profile.emails.read']
	   }));

router.route('/twitter/callback')
	   .get(passport.authenticate('twitter',{
	   		successRedirect : '/users/',
	   		failureRedirect : '/error/'
	   }));
	
router.route('/twitter')
	   .get(passport.authenticate('twitter'));

router.route('/facebook/callback')
	   .get(passport.authenticate('facebook',{
	   		successRedirect : '/users/',
	   		failureRedirect : '/error/'
	   }));
	
router.route('/facebook')
	   .get(passport.authenticate('facebook',{
	   	scope : ['email','user_friends']
	   }));

router.route('/github/callback')
	   .get(passport.authenticate('github',{
	   		successRedirect : '/users/',
	   		failureRedirect : '/error/'
	   }));
	
router.route('/github')
	   .get(passport.authenticate('github'));

router.route('/linkedin/callback')
	   .get(passport.authenticate('linkedin',{
	   		successRedirect : '/users/',
	   		failureRedirect : '/error/'
	   }));
	
router.route('/linkedin')
	   .get(passport.authenticate('linkedin'));

router.route('/instagram/callback')
	   .get(passport.authenticate('instagram',{
	   		successRedirect : '/users/',
	   		failureRedirect : '/error/'
	   }));
	
router.route('/instagram')
	   .get(passport.authenticate('instagram'));

router.route('/local')
	   .post(passport.authenticate('local-login',{
	   	 	successRedirect : '/profile/',
	   		failureRedirect : '/'
	   }));


router.route('/signup')
	  .get(function(req,res){
	  	res.render('register');
	  })
	   .post(passport.authenticate('local-register',{
	   	 	successRedirect : '/profile/',
	   		failure : '/auth/signup/'
	   }));

module.exports = router;   