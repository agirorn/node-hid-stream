'use strict';

const Stream = require('stream').Stream;

class FakeStream extends Stream {
  constructor() {
    super();
    this.close = () => {};
  }
}

module.exports = FakeStream;
