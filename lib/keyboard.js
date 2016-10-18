'use strict';

const Hidstream = require('./hidstream');
const keyboardParser = require('./keyboard-parser');
const through = require('through');

function Keyboard(options) {
  const stream = through(function write(data) {
    this.queue(keyboardParser(data));
  });

  stream.device = new Hidstream(options);

  stream.device.pipe(stream);
  stream.close = () => {
    stream.device.close();
    stream.emit('end');
  };
  return stream;
}

module.exports = Keyboard;
