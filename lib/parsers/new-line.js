'use strict';

const keyboard = require('./keyboard');

module.exports = function newline() {
  let input = '';

  return function newLineParser(data) {
    const parsed = keyboard(data);

    /**
     * no keys pressed
     */
    if (parsed.empty()) {
        // we could do something with this!
    } else {
      /**
       * at least one key was pressed ignore all but the first
       * (scanners only emit one at a time (I think))
       */
      const newChar = parsed.charCodes[0];

      input += newChar;

      if (newChar === '\n') {
        const result = input;
        input = '';
        return result;
      }
    }

    return '';
  };
};
