'use strict';

const KeyboardCharacters = require('./keyboard-characters');
const through = require('through');

function KeyboardLines(options) {
  const device = new KeyboardCharacters(options);

  let input = '';
  const stream = through(function write(data) {
    input += data;
    if (input.indexOf('\n') >= 0) {
      const line = head(input);
      input = tail(input);
      this.queue(line);
    }
  });

  device.pipe(stream);
  stream.close = () => {
    device.close();
    stream.emit('end');
  };
  return stream;
}

function head(string) {
  return string.slice(0, string.indexOf('\n'));
}

function tail(string) {
  return string.slice(string.indexOf('\n') + 1);
}

module.exports = KeyboardLines;
