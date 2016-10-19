'use strict';

const KeyboardCharacters = require('./keyboard-characters');
const split = require('split');
const KeyboardBase = require('./keyboard-base');

class KeyboardLines extends KeyboardBase {
  constructor(options) {
    super(KeyboardCharacters, options);

    this.device.pipe(split()).on('data', data => this.emit('data', data));
  }
}

module.exports = KeyboardLines;
