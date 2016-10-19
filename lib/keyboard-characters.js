'use strict';

const Keyboard = require('./keyboard');
const KeyboardBase = require('./keyboard-base');

class KeyboardCharacters extends KeyboardBase {
  constructor(options) {
    super(Keyboard, options);

    this.device.on('data', data => this.emit('data', data.charCodes.join('')));
  }
}

module.exports = KeyboardCharacters;
