'use strict';

const Keyboard = require('./keyboard');
const through = require('through');

function KeyboardCharacters(options) {
  const stream = through(function write(data) {
    this.queue(data.charCodes.join(''));
  });

  stream.device = new Keyboard(options);
  stream.device.pipe(stream);
  stream.close = () => {
    stream.device.close();
    stream.emit('end');
  };
  return stream;
}

module.exports = KeyboardCharacters;
