;(function() {
	
	var 
		stream = require('stream')
		, util = require('util')
		, scheck = require('./stream-check')
		, input = ''
	;

	/**
	* HID packet object
	*/
	var hidPacket = function hidPacket() {

		return {

			modKeys : []
			, keyCodes : []
			, charCodes : []
			, errorStatus : false // keyboard rollover
		};
	};

	var parseData = function parseData(data) {

		if(!scheck.bind(this)) { return null; }

		var parsed = new hidPacket();

		parseModifiers(parsed, data.shift()); // parse modifiers (bit field)

		data.shift(); // the next element is always 0 (I think...)
		parseKeyCodes(parsed, data); // parse keycodes from the rest
		parseCharCodes(parsed, data); // parse charcodes from keycodes
		parseErrorState(parsed, data); // detect rollover error

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

		var push = function(key) { 

			if(key > 3) { arr.keyCodes.push(key); } 
		};

		keys.forEach(push);

		return true;
	};

	var parseCharCodes = function parseCharCodes(arr, keys) {

		if(typeof keys != "object") { return false; }

		var 
			push = function(dat) { arr.charCodes.push(dat); }
			, range = function(lower, upper) { 

				return this > lower && this < upper; 
			}
			, character = function(num) { return String.fromCharCode(num); }
			, parse = function(key) { 

				// range check key shorthand
				var r = range.bind(key); 
				if(r(3, 30)) { // alpha

					push(character(key + 93));
				} 
				else if(r(29, 40)) { // numeric

					// tacky hack to fix 0 because it's not in order
					push(character(key + (key == 39 ? 9 : 19)));
				}
				else if(key == 40) { // enter

					push("\n");
				}
				else if(key == 57) { // capslock

				}
				else if(r(40, 45)) { // controls

				}
				else if(r(44, 50)) { // symbols

				}
				else if(r(49, 57)) { // punctuation

				}
				else if(r(57, 70)) { // F keys

				}
				else if(r(69, 83)) { // control

				}
				else if(r(82, 104)) { // keypad

				}
			}
		;

		keys.forEach(parse);
		return true;

	}; 

	/**
	* Detect keyboard rollover error
	* This occurs when the user has pressed too many keys for the
	* particular device to handle
	*/
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
			arr.charCodes = [];
		}
	};

	var parser = {

		raw : function raw(err, data) {

			if(err) { return err; }
			var parsed = parseData.call(this, data);

			this.emit("data", parsed);
			this.device.read(this.parser);
		}
		, newline : function newline(err, data) {
		
			if(err) { return err; } 
			var 
				enter = function(key) { return key == "\n"; }
				, noop = function() {

					if(this.modKeys.length || this.keyCodes.length 
					|| this.charCodes.length) {

						return false;
					}

					return true;
				}
				, parsed = parseData.call(this, data)
				, emit = function() {

					this.emit("data", input);
					input = '';
				}
			;

			/**
			* no keys pressed
			*/
			if(noop.call(parsed)) {

				// we could do something with this!
			}

			/**
			* at least one key was pressed
			* ignore all but the first 
			* (scanners only emit one at a time (I think))
			*/
			else {

				var newChar = parsed.charCodes[0];
				if(enter(newChar)) {

					emit.call(this);
				}
				else {

					input += newChar;
				}
			}
			this.device.read(this.parser);
		}
	};

	module.exports = parser;
})();
