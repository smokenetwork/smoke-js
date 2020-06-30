var smoke = require('../lib');

smoke.api.getAccountCount(function(err, result) {
	console.log(err, result);
});

smoke.api.getAccounts(['dan'], function(err, result) {
	console.log(err, result);
	var reputation = smoke.formatter.reputation(result[0].reputation);
	console.log(reputation);
});

smoke.api.getState('trending/smokeit', function(err, result) {
	console.log(err, result);
});

smoke.api.getFollowing('ned', 0, 'blog', 10, function(err, result) {
	console.log(err, result);
});

smoke.api.getFollowers('dan', 0, 'blog', 10, function(err, result) {
	console.log(err, result);
});

smoke.api.streamOperations(function(err, result) {
	console.log(err, result);
});

smoke.api.getDiscussionsByActive({
  limit: 10,
  start_author: 'thecastle',
  start_permlink: 'this-week-in-level-design-1-22-2017'
}, function(err, result) {
	console.log(err, result);
});
