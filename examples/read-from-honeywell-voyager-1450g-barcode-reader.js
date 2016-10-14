#!/usr/bin/env node
var hid = require('../');
var HONEYWELL = 3118;
var VOYAGER_1450G = 3233;

var scanner = new hid.device({
  vid: HONEYWELL,
  pid: VOYAGER_1450G,
  parser : hid.parser.keyboard
});

function closeScanner() {
  scanner.close();
}

// Close scanner when script is exiting is stopped.
process.on('exit', closeScanner);

// Close scanner on ctrl+c event
process.on('SIGINT', closeScanner);

scanner.on("data", function(dat) {
  console.log(dat); // easily consumed data format!
});
