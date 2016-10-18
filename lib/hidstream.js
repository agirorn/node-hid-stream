'use strict';

const hid = require('node-hid');
const Stream = require('stream').Stream;

class Hidstream extends Stream {
  constructor(opts) {
    super();

    const options = opts || {};

    if (!options.path && !(options.vid && options.pid)) {
      throw new Error('no HID path or vid/pid specified');
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

    this.device.on('data', data => this.emit('data', data));
    this.device.on('error', error => this.emit('error', error));
    this.device.on('end', end => this.emit('end', end));
  }
}

module.exports = Hidstream;
