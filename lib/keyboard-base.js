'use strict';

const Stream = require('stream').Stream;

class KeyboardBase extends Stream {
  constructor(Device, options) {
    super();

    this.device = new Device(options);
    this.device.on('error', error => this.emit('error', error));
    this.device.on('end', end => this.emit('end', end));
    this.device.on('close', close => this.emit('close', close));
  }

  close() {
    this.device.close();
    this.emit('close');
  }
}


module.exports = KeyboardBase;
