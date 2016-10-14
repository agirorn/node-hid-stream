#!/usr/bin/env node

const hid = require('../');

const Device = hid.device;
const keyboard = hid.parser.keyboard;
const HONEYWELL = 3118;
const VOYAGER_1450G = 3233;

const scanner = new Device({
  vid: HONEYWELL,
  pid: VOYAGER_1450G,
  parser: keyboard,
});

function closeScanner() {
  scanner.close();
}

// Close scanner when script is exiting is stopped.
process.on('exit', closeScanner);

// Close scanner on ctrl+c event
process.on('SIGINT', closeScanner);

scanner.on('data', (data) => {
  console.log(data); // easily consumed data format!
});
