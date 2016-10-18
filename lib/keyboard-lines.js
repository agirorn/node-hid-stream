'use strict';

const KeyboardCharacters = require('./keyboard-characters');
const split = require('split');

function KeyboardLines(options) {
  const stream = split();
  stream.device = new KeyboardCharacters(options);
  stream.device.pipe(stream);
  stream.close = () => {
    stream.device.close();
    stream.emit('end');
  };
  return stream;
}

module.exports = KeyboardLines;
