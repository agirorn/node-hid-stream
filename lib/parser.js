;(function() {
	
	var 
		stream = require('stream')
		, util = require('util')
		, scheck = require('./stream-check')
	;

	/**
	* HID packet object
	*/
	var hidPacket = function hidPacket() {

		return {

			modKeys : []
			, keyCodes : []
			, keyChars : []
			, errorStatus : false
		};
	};

	var parseData = function parseData(data) {

		if(!scheck.bind(this)) { return null; }

		var parsed = new hidPacket();

		parseModifiers(parsed, data.shift()); // parse modifiers

		data.shift(); // the next element is always 0 (I think...)
		parseKeyCodes(parsed, data); // rest of array is keycodes
		parseErrorState(parsed, data); // check for all 1's (too many keys)

		return parsed;
	};

	/**
	* Convert modifier key bits into
	* array of human-readable identifiers
	*/
	var parseModifiers = function parseModifiers(arr, bits) {

		var push = function(mod) { arr.modKeys.push(mod); };

		if(bits & 1) { push('ctrl'); }
		if(bits & 2) { push('shift'); }
		if(bits & 4) { push('alt'); }
		if(bits & 8) { push('meta'); }
		if(bits & 16) { push('r-ctrl'); }
		if(bits & 32) { push('r-shift'); }
		if(bits & 64) { push('r-alt'); }
		if(bits & 128) { push('r-meta'); }

	};

	/**
	* Slice HID keycodes into separate array
	*/
	var parseKeyCodes = function parseKeyCodes(arr, keys) {

		if(typeof keys != "object") { return false; }

		var push = function(key) { if(key > 0) { arr.keyCodes.push(key); } }

		keys.forEach(push);
		return true;
	};

	var parseErrorState = function parseErrorState(arr, state) {

		var 
			states = 0
			, check = function(s) { if(s == 1) { ++states; } }
		;

		state.forEach(check);
		if(states == 6) { 

			arr.errorStatus = true;
			arr.modKeys = [];
			arr.keyCodes = [];
			arr.keyChars = [];
		}
	};

	var parser = {

		raw : function raw(err, data) {

			if(err) { return err; }
			var parsed = parseData.call(this, data);

			this.emit("data", parsed);
			this.device.read(this.parser);
		}
		, newline : function newline(data) {

			if(err) { return err; } 
			var parsed = parseData.call(this, data);

			this.emit("data", parsed);
			this.device.read(this.parser);
		}
	};

	module.exports = parser;
})();
