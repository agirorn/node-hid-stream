'use strict';

const { Stream } = require('stream');

class FakeStream extends Stream {
  constructor() {
    super();
    this.close = () => {};
  }
}

module.exports = FakeStream;
