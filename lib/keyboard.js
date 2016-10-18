'use strict';

const Hidstream = require('./hidstream');
const keyboardParser = require('./keyboard-parser');
const through = require('through');

function Keyboard(options) {
  const device = new Hidstream(options);

  const stream = through(function write(data) {
    this.queue(keyboardParser(data));
  });

  device.pipe(stream);
  stream.close = () => {
    device.close();
    stream.emit('end');
  };
  return stream;
}

module.exports = Keyboard;
