var express = require('express');
var router = express.Router();

router.use('/',function(req,res,next){
	if(!req.user){
		return res.redirect('/');
	}

	next();
	
});

router.route('/')
	  .get(function(req,res){
	  		res.render('profile',{
 				user : req.user.local
			});
	  });

module.exports = router;