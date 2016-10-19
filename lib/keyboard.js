'use strict';

const Hidstream = require('./hidstream');
const keyboardParser = require('./keyboard-parser');
const Stream = require('stream').Stream;

class Keyboard extends Stream {
  constructor(options) {
    super();

    this.device = new Hidstream(options);
    this.device.on('data', data => this.emit('data', keyboardParser(data)));
    this.device.on('error', error => this.emit('error', error));
    this.device.on('end', end => this.emit('end', end));
    this.device.on('close', close => this.emit('close', close));
  }

  close() {
    this.device.close();
    this.emit('close');
  }
}


module.exports = Keyboard;
