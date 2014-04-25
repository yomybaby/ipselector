var ipSelector = require('../ipselector');
ipSelector.selectOne({
	family : 'IPv4',
	internal : false
}, function(ip) {
	console.log(ip);
});
