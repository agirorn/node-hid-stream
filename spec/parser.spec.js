'use strict';

const parser = require('../lib/parser');

describe('parser', () => {
  it('is defined', () => {
    expect(parser).toBeDefined();
  });

  it('has raw parser', () => {
    expect(parser.raw).toBeDefined();
  });

  it('has keyboard parser', () => {
    expect(parser.keyboard).toBeDefined();
  });

  it('has newline parser', () => {
    expect(parser.newline).toBeDefined();
  });
});
