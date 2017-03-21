var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('619805931544735','7dbd7092ae6e28da1aa3a83181d32c4b');

router.use('/',function(req,res,next){
	if(!req.user){
		return res.redirect('/');
	}

	next();
	
});

/* GET users listing. */
router.get('/', function(req, res, next) {

	var user = 	req.user;
	
	if(req.user.facebook){
		facebook.getImage(req.user.facebook.token,function(results){
			user.image = results.url;

			facebook.getFriends(req.user.facebook.token,function(results){
				user.friendsCount = results.total_count;
				res.render('users',{
		 			user : user
				});

			});

		});
	}
	else{
		user.image = req.user.image;
		res.render('users',{
 			user : user
		});
	}



});

module.exports = router;
