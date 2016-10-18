'use strict';

const Hidstream = require('./keyboard');
const through = require('through');

function KeyboardCharacters(options) {
  const device = new Hidstream(options);

  const stream = through(function write(data) {
    this.queue(data.charCodes.join(''));
  });

  device.pipe(stream);
  stream.close = () => {
    device.close();
    stream.emit('end');
  };
  return stream;
}

module.exports = KeyboardCharacters;
