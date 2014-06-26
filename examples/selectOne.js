var ipselector = require('ipselector');
ipselector.selectOne({
	// family : 'IPv4',
	// networkInterface : 'en0',
	internal : false
}, function(ip) {
	console.log(ip);
});


// ipselector.selectOne(function(ip){
// 	console.log(ip);
// });
