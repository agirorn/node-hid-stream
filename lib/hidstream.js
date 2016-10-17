'use strict';

const hid = require('node-hid');
const hidParsers = require('./parser');
const stream = require('stream');
const util = require('util');

function hidDevice(opts) {
  const options = opts || {};
  if (!options.path && !(options.vid && options.pid)) {
    return new Error('no HID path or vid/pid specified');
  }

  if (!options.parser) {
    options.parser = hidParsers.raw;
  } else if (typeof options.parser !== 'function') {
    return new Error('Invalid parser function specified');
  }

  const device = this;

  this.options = options;
  this.path = options.path;
  this.vid = options.vid;
  this.pid = options.pid;
  this.device = options.path ? new hid.HID(options.path) : new hid.HID(options.vid, options.pid);

  this.close = function close() {
    if (device.device) {
      device.device.close();
    }
    device.emit('close');
  };

  stream.Stream.call(this);

  const parser = options.parser;
  this.device.on('data', (data) => {
    const parsed = parser(data);
    device.emit('data', parsed);
  });

  this.device.on('error', (error) => {
    device.emit('error', error);
  });

  this.device.on('end', (end) => {
    device.emit('end', end);
  });

  return this;
}
util.inherits(hidDevice, stream.Stream);


function devices(vendorId, productId) {
  return hid.devices(vendorId, productId);
}

exports.device = hidDevice;
exports.parser = hidParsers;
exports.devices = devices;
