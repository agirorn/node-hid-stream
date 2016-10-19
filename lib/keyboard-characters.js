'use strict';

const Keyboard = require('./keyboard');
const through = require('through');
const Stream = require('stream').Stream;

class KeyboardCharacters extends Stream {
  constructor(options) {
    super();

    this.device = new Keyboard(options);
    this.device.on('data', data => this.emit('data', data.charCodes.join('')));
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

module.exports = KeyboardCharacters;
