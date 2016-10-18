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

  this.options = options;
  this.path = options.path;
  this.vid = options.vid;
  this.pid = options.pid;
  this.device = options.path ? new hid.HID(options.path) : new hid.HID(options.vid, options.pid);

  this.close = function close() {
    if (this.device) {
      this.device.close();
    }
    this.emit('close');
  };

  stream.Stream.call(this);

  const parser = hidParsers.raw;
  this.device.on('data', (data) => {
    const parsed = parser(data);
    this.emit('data', parsed);
  });

  this.device.on('error', (error) => {
    this.emit('error', error);
  });

  this.device.on('end', (end) => {
    this.emit('end', end);
  });
}
util.inherits(hidDevice, stream.Stream);


function devices(vendorId, productId) {
  return hid.devices(vendorId, productId);
}

module.exports = hidDevice;
