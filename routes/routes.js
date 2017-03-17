var express = require('express');
var passport = require('passport');
var app = express();

var router = express.Router();

router.route('/google/callback')
	   .get(passport.authenticate('google',{
	   		successRedirect : '/users/',
	   		failure : '/error/'
	   }));
	
router.route('/google')
	   .get(passport.authenticate('google',{
	   		scope : ['https://www.googleapis.com/auth/profile','https://www.googleapis.com/auth/email']
	   }));

module.exports = router;   