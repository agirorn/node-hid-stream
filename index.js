;(function() {
	
	var 
		hid = require('node-hid')
		, stream = require('stream')
		, util = require('util')
		, hidParsers = require('./lib/parser')
	;

	function hidDevice(path, opts) {

		if(!path) { return new Error("no HID path specified"); }
		if(!opts) { opts = {}; }
		if(!opts.parser) { opts.parser = hidParsers.raw; }
		else if(typeof opts.parser != "function") {

			return new Error("Invalid parser function specified");
		}

		this.opts = opts;
		this.path = path;
		this.device = new hid.HID(path);

		stream.Stream.call(this);

		this.parser = opts.parser.bind(this);
		this.device.read(this.parser);
		return this;
	};

	function getDevices() {

		return hid.devices();
	};

	util.inherits(hidDevice, stream.Stream);

	exports.device = hidDevice;
	exports.parser = hidParsers;
	exports.getDevices = getDevices;

})();
