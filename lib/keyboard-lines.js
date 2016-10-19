'use strict';

const KeyboardCharacters = require('./keyboard-characters');
const split = require('split');
const Stream = require('stream').Stream;

class KeyboardLines extends Stream {
  constructor(options) {
    super();

    this.device = new KeyboardCharacters(options);

    this.device.pipe(split()).on('data', data => this.emit('data', data));
    this.device.on('error', error => this.emit('error', error));
    this.device.on('end', end => this.emit('end', end));
    this.device.on('close', close => this.emit('close', close));

    this.close = () => {
      this.device.close();
      this.emit('close');
    };
  }

  close() {
    this.device.close();
    this.emit('end');
  }
}

module.exports = KeyboardLines;
