var OAuth = require('OAuth').OAuth2;

var facebook = function(fbkey,fbsecret){

	var oauth = new OAuth(fbkey.fbsecret,'https://graph.facebook.com',null,
		'oauth2/token',null);

	var getImage = function(userKey,done){
		oauth.get('https://graph.facebook.com/v2.8/me/picture?redirect=false&type=large',
			userKey,//access token
			function(err,results,res){
				results = JSON.parse(results);
				done(results.data);
			});
	}

	var getFriends = function(userKey,done){
		oauth.get('https://graph.facebook.com/v2.8/me/friends?redirect=false',
			userKey,//access token
			function(err,results,res){
				results = JSON.parse(results);
				done(results.summary);
			});
	}

	return {
		getImage : getImage,
		getFriends : getFriends
	};
};

module.exports = facebook;

