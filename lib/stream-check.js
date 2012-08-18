;(function() {

	var stream = require('stream');

	module.exports = function streamCheck() {

		if(!this instanceof stream.Stream) {

			var err = new Error("Streaming from non-stream object.")
			process.stderr.write(err.toString());
			process.stderr.write(err.stack)
			return false;
		}

		return true;
	}

})();