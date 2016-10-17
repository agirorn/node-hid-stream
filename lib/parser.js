'use strict';

const raw = require('./parsers/raw');
const keyboard = require('./parsers/keyboard');
const newline = require('./parsers/new-line');

const parsers = {
  raw,
  keyboard,
  newline: newline(),
};

module.exports = parsers;
