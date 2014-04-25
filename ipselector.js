var os = require('os'),
	fields = require('fields'),
	_ = require('underscore');

exports.selectOne = function(where,callback){
	if(!callback && _.isFunction(where)){
		callback = where;
		where = {};
	}
	var ifaces = os.networkInterfaces(),
		ip_addresses = [];
		
	_.each(ifaces,function(iface,dev_name){
		var results = _.where(iface,where);
		_.each(results,function(details){
			details.dev_name  = dev_name;
		});
		ip_addresses = ip_addresses.concat(results);
	});

	fields.set([
		fields.select({
			title : "Which ip address you want to use?",
			promptLabel: 'Select a ip_address by number', //or name
			relistOnError : true,
			complete : true,
			suggest : true,
			numbered : true,
			optionValue : 'address',
			autoSelectOne : true, // if have only one options, it will be autuselected.
			formatters : {
				option : function(opt, idx, num) {
					return num + opt.address.cyan + '  ' + opt.family + '(' +opt.dev_name.red +', '+ (opt.internal ? "internal" : "external")[opt.internal?'grey':'green'] + ')';
				}
			},
			options : ip_addresses
		})
	]).prompt(function(err, value) {
		if (err) {
			process.stdout.write('\n');
			process.exit(0);
		} else {
			return callback(value[0]);
		}
	});
}
