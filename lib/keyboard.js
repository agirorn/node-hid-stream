'use strict';

const Hidstream = require('./hidstream');
const keyboardParser = require('./keyboard-parser');
const KeyboardBase = require('./keyboard-base');

class Keyboard extends KeyboardBase {
  constructor(options) {
    super(Hidstream, options);

    this.device.on('data', data => this.emit('data', keyboardParser(data)));
  }
}


module.exports = Keyboard;
