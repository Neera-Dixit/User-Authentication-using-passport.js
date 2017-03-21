var express = require('express');
var router = express.Router();

/* GET home page. */

var checkUserisLoggedIn = function checkUserisLoggedIn(req,res,next){
		if(req.isAuthenticated()){
			if(req.user.local){
				res.redirect('/profile');
			}
			else{
				res.redirect('/users');
			}
		}
		else{
			next();
		}
	
};

router.get('/', checkUserisLoggedIn,function(req, res, next) {
  res.render('index');
});

module.exports = router;
