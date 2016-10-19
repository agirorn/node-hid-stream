const _ = require('underscore');
const keyboard = require('../lib/keyboard-parser');

const NO_MODIFIERS = {
  l_shift: false,
  l_control: false,
  l_alt: false,
  l_meta: false,
  r_control: false,
  r_shift: false,
  r_alt: false,
  r_meta: false,
};

//
// All modifiers are false by default.
//
function modifiers(options) {
  return _.extend(_.extend({}, NO_MODIFIERS), options || {});
}

describe('keyboard parser', () => {
  it('parses 9', () => {
    const keys = keyboard(new Buffer([0, 0, 38, 0, 0, 0, 0, 0]));
    expect(keys.keyCodes).toEqual([38]);
    expect(keys.charCodes).toEqual(['9', '', '', '', '', '']);
    expect(keys.errorStatus).toBeFalsy();
    expect(keys.modifiers).toEqual(NO_MODIFIERS);
  });

  it('parses C', () => {
    const keys = keyboard(new Buffer([2, 0, 6, 0, 0, 0, 0, 0]));
    expect(keys.keyCodes).toEqual([6]);
    expect(keys.charCodes).toEqual(['C', '', '', '', '', '']);
    expect(keys.errorStatus).toBeFalsy();
    expect(keys.modifiers).toEqual(modifiers({ l_shift: true }));
  });

  it('ignores keys 3 ore less', () => {
    const keys = keyboard(new Buffer([0, 0, 1, 2, 3, 1, 2, 3]));
    expect(keys.keyCodes).toEqual([]);
    expect(keys.charCodes).toEqual(['', '', '', '', '', '']);
  });

  it('Detect keyboard rollover error', () => {
    const keys = keyboard(new Buffer([0, 0, 1, 1, 1, 1, 1, 1]));
    expect(keys.errorStatus).toBeTruthy();
  });

  describe('modifiers', () => {
    [
      { bit: 1, modifiers: modifiers({ l_control: true }) },
      { bit: 2, modifiers: modifiers({ l_shift: true }) },
      { bit: 3, modifiers: modifiers({ l_control: true, l_shift: true }) },
      { bit: 4, modifiers: modifiers({ l_alt: true }) },
      { bit: 5, modifiers: modifiers({ l_control: true, l_alt: true }) },
      { bit: 6, modifiers: modifiers({ l_shift: true, l_alt: true }) },
      { bit: 7, modifiers: modifiers({ l_control: true, l_shift: true, l_alt: true }) },
      { bit: 8, modifiers: modifiers({ l_meta: true }) },
      { bit: 16, modifiers: modifiers({ r_control: true }) },
      { bit: 32, modifiers: modifiers({ r_shift: true }) },
      { bit: 64, modifiers: modifiers({ r_alt: true }) },
      { bit: 128, modifiers: modifiers({ r_meta: true }) },
    ].forEach((current) => {
      it(`detects modifiers for bit ${current.bit}`, () => {
        const keys = keyboard(new Buffer([current.bit]));
        expect(keys.modifiers).toEqual(current.modifiers);
        expect(keys.mod()).toBeTruthy();
      });
    });

    it('detect no modifiers', () => {
      const keys = keyboard(new Buffer([0]));
      expect(keys.modifiers).toEqual(NO_MODIFIERS);
      expect(keys.mod()).toBeFalsy();
    });
  });


  describe('lower-case keys', () => {
    [
      { key: 4, charCode: 'a' },
      { key: 4, charCode: 'a' },
      { key: 5, charCode: 'b' },
      { key: 6, charCode: 'c' },
      { key: 7, charCode: 'd' },
      { key: 8, charCode: 'e' },
      { key: 9, charCode: 'f' },
      { key: 10, charCode: 'g' },
      { key: 11, charCode: 'h' },
      { key: 12, charCode: 'i' },
      { key: 13, charCode: 'j' },
      { key: 14, charCode: 'k' },
      { key: 15, charCode: 'l' },
      { key: 16, charCode: 'm' },
      { key: 17, charCode: 'n' },
      { key: 18, charCode: 'o' },
      { key: 19, charCode: 'p' },
      { key: 20, charCode: 'q' },
      { key: 21, charCode: 'r' },
      { key: 22, charCode: 's' },
      { key: 23, charCode: 't' },
      { key: 24, charCode: 'u' },
      { key: 25, charCode: 'v' },
      { key: 26, charCode: 'w' },
      { key: 27, charCode: 'x' },
      { key: 28, charCode: 'y' },
      { key: 29, charCode: 'z' },

      { key: 30, charCode: '1' },
      { key: 31, charCode: '2' },
      { key: 32, charCode: '3' },
      { key: 33, charCode: '4' },
      { key: 34, charCode: '5' },
      { key: 35, charCode: '6' },
      { key: 36, charCode: '7' },
      { key: 37, charCode: '8' },
      { key: 38, charCode: '9' },
      { key: 39, charCode: '0' },

      { key: 40, charCode: '\n' },
      { key: 41, charCode: '' },
      { key: 42, charCode: '' },
      { key: 43, charCode: '\t' },
      { key: 44, charCode: ' ' },
      { key: 45, charCode: '-' },
      { key: 46, charCode: '=' },
      { key: 47, charCode: '[' },
      { key: 48, charCode: ']' },
      { key: 49, charCode: '\\' },
      { key: 50, charCode: '#' },
      { key: 51, charCode: ';' },
      { key: 52, charCode: '\'' },
      { key: 53, charCode: '`' },
      { key: 54, charCode: ',' },
      { key: 55, charCode: '.' },
      { key: 56, charCode: '/' },

      { key: 57, charCode: '' },
      { key: 58, charCode: '' },
      { key: 59, charCode: '' },
      { key: 60, charCode: '' },
      { key: 61, charCode: '' },
      { key: 62, charCode: '' },
      { key: 63, charCode: '' },
      { key: 64, charCode: '' },
      { key: 65, charCode: '' },
      { key: 66, charCode: '' },
      { key: 67, charCode: '' },
      { key: 68, charCode: '' },
      { key: 69, charCode: '' },
      { key: 70, charCode: '' },
      { key: 71, charCode: '' },
      { key: 72, charCode: '' },
      { key: 73, charCode: '' },
      { key: 74, charCode: '' },
      { key: 75, charCode: '' },
      { key: 76, charCode: '' },
      { key: 77, charCode: '' },
      { key: 78, charCode: '' },
      { key: 79, charCode: '' },
      { key: 80, charCode: '' },
      { key: 81, charCode: '' },
      { key: 82, charCode: '' },

      // Keypad
      { key: 83, charCode: '' },
      { key: 84, charCode: '/' },
      { key: 85, charCode: '*' },
      { key: 86, charCode: '-' },
      { key: 87, charCode: '+' },
      { key: 88, charCode: '\n' },

      // Keypad numbers
      { key: 89, charCode: '1' },
      { key: 90, charCode: '2' },
      { key: 91, charCode: '3' },
      { key: 92, charCode: '4' },
      { key: 93, charCode: '5' },
      { key: 94, charCode: '6' },
      { key: 95, charCode: '7' },
      { key: 96, charCode: '8' },
      { key: 97, charCode: '9' },
      { key: 98, charCode: '0' },
      { key: 99, charCode: '.' },
      { key: 100, charCode: '\\' },
      { key: 101, charCode: '' },
      { key: 102, charCode: '' },
      { key: 103, charCode: '=' },
      { key: 104, charCode: '' },
      { key: 105, charCode: '' },
      { key: 106, charCode: '' },
      { key: 107, charCode: '' },
      { key: 108, charCode: '' },
      { key: 109, charCode: '' },
      { key: 110, charCode: '' },
      { key: 111, charCode: '' },
      { key: 112, charCode: '' },
      { key: 113, charCode: '' },
      { key: 114, charCode: '' },
      { key: 115, charCode: '' },

      // Misc actions omitted below...

      { key: 133, charCode: ',' },
      { key: 134, charCode: '=' },

      { key: 158, charCode: '\n' },

      { key: 182, charCode: '(' },
      { key: 183, charCode: ')' },
      { key: 184, charCode: '{' },
      { key: 185, charCode: '}' },
      { key: 186, charCode: '\t' },
      { key: 187, charCode: '' },
      { key: 188, charCode: 'A' },
      { key: 189, charCode: 'B' },
      { key: 190, charCode: 'C' },
      { key: 191, charCode: 'D' },
      { key: 192, charCode: 'E' },
      { key: 193, charCode: 'F' },

      { key: 195, charCode: '^' },
      { key: 196, charCode: '%' },
      { key: 197, charCode: '<' },
      { key: 198, charCode: '>' },
      { key: 199, charCode: '&' },
      { key: 200, charCode: '' },

    ].forEach((current) => {
      it(`detects lowercase charCode for key ${current.bit}`, () => {
        const keys = keyboard(new Buffer([0, 0, current.key, 0, 0, 0, 0, 0]));
        expect(keys.keyCodes).toEqual([current.key]);
        expect(keys.charCodes).toEqual([current.charCode, '', '', '', '', '']);
      });
    });
  });

  describe('upper-case case keys', () => {
    [
      2,  // left shift
      32, // right shift
    ].forEach((shiftBit) => {
      [
        { key: 4, charCode: 'A' },
        { key: 5, charCode: 'B' },
        { key: 6, charCode: 'C' },
        { key: 7, charCode: 'D' },
        { key: 8, charCode: 'E' },
        { key: 9, charCode: 'F' },
        { key: 10, charCode: 'G' },
        { key: 11, charCode: 'H' },
        { key: 12, charCode: 'I' },
        { key: 13, charCode: 'J' },
        { key: 14, charCode: 'K' },
        { key: 15, charCode: 'L' },
        { key: 16, charCode: 'M' },
        { key: 17, charCode: 'N' },
        { key: 18, charCode: 'O' },
        { key: 19, charCode: 'P' },
        { key: 20, charCode: 'Q' },
        { key: 21, charCode: 'R' },
        { key: 22, charCode: 'S' },
        { key: 23, charCode: 'T' },
        { key: 24, charCode: 'U' },
        { key: 25, charCode: 'V' },
        { key: 26, charCode: 'W' },
        { key: 27, charCode: 'X' },
        { key: 28, charCode: 'Y' },
        { key: 29, charCode: 'Z' },

        { key: 30, charCode: '!' },
        { key: 31, charCode: '@' },
        { key: 32, charCode: '#' },
        { key: 33, charCode: '$' },
        { key: 34, charCode: '%' },
        { key: 35, charCode: '^' },
        { key: 36, charCode: '&' },
        { key: 37, charCode: '*' },
        { key: 38, charCode: '(' },
        { key: 39, charCode: ')' },

        { key: 40, charCode: '\n' },
        { key: 41, charCode: '' },
        { key: 42, charCode: '' },
        { key: 43, charCode: '\t' },
        { key: 44, charCode: ' ' },
        { key: 45, charCode: '_' },
        { key: 46, charCode: '+' },
        { key: 47, charCode: '{' },
        { key: 48, charCode: '}' },
        { key: 49, charCode: '|' },
        { key: 50, charCode: '~' },
        { key: 51, charCode: ':' },
        { key: 52, charCode: '"' },
        { key: 53, charCode: '~' },
        { key: 54, charCode: '<' },
        { key: 55, charCode: '>' },
        { key: 56, charCode: '?' },

        { key: 57, charCode: '' },
        { key: 58, charCode: '' },
        { key: 59, charCode: '' },
        { key: 60, charCode: '' },
        { key: 61, charCode: '' },
        { key: 62, charCode: '' },
        { key: 63, charCode: '' },
        { key: 64, charCode: '' },
        { key: 65, charCode: '' },
        { key: 66, charCode: '' },
        { key: 67, charCode: '' },
        { key: 68, charCode: '' },
        { key: 69, charCode: '' },
        { key: 70, charCode: '' },
        { key: 71, charCode: '' },
        { key: 72, charCode: '' },
        { key: 73, charCode: '' },
        { key: 74, charCode: '' },
        { key: 75, charCode: '' },
        { key: 76, charCode: '' },
        { key: 77, charCode: '' },
        { key: 78, charCode: '' },
        { key: 79, charCode: '' },
        { key: 80, charCode: '' },
        { key: 81, charCode: '' },
        { key: 82, charCode: '' },

        // Keypad
        { key: 83, charCode: '' },
        { key: 84, charCode: '/' },
        { key: 85, charCode: '*' },
        { key: 86, charCode: '-' },
        { key: 87, charCode: '+' },
        { key: 88, charCode: '\n' },

        // Keypad numbers
        { key: 89, charCode: '1' },
        { key: 90, charCode: '2' },
        { key: 91, charCode: '3' },
        { key: 92, charCode: '4' },
        { key: 93, charCode: '5' },
        { key: 94, charCode: '6' },
        { key: 95, charCode: '7' },
        { key: 96, charCode: '8' },
        { key: 97, charCode: '9' },
        { key: 98, charCode: '0' },
        { key: 99, charCode: '.' },
        { key: 100, charCode: '|' },
        { key: 101, charCode: '' },
        { key: 102, charCode: '' },
        { key: 103, charCode: '=' },
        { key: 104, charCode: '' },
        { key: 105, charCode: '' },
        { key: 106, charCode: '' },
        { key: 107, charCode: '' },
        { key: 108, charCode: '' },
        { key: 109, charCode: '' },
        { key: 110, charCode: '' },
        { key: 111, charCode: '' },
        { key: 112, charCode: '' },
        { key: 113, charCode: '' },
        { key: 114, charCode: '' },
        { key: 115, charCode: '' },

        // Misc actions omitted below...
        { key: 133, charCode: ',' },
        { key: 134, charCode: '=' },

        { key: 158, charCode: '\n' },

        { key: 182, charCode: '(' },
        { key: 183, charCode: ')' },
        { key: 184, charCode: '{' },
        { key: 185, charCode: '}' },
        { key: 186, charCode: '\t' },
        { key: 187, charCode: '' },
        { key: 188, charCode: 'A' },
        { key: 189, charCode: 'B' },
        { key: 190, charCode: 'C' },
        { key: 191, charCode: 'D' },
        { key: 192, charCode: 'E' },
        { key: 193, charCode: 'F' },

        { key: 195, charCode: '^' },
        { key: 196, charCode: '%' },
        { key: 197, charCode: '<' },
        { key: 198, charCode: '>' },
        { key: 199, charCode: '&' },

      ].forEach((current) => {
        it(`detects lowercase charCode for key ${current.bit}`, () => {
          const data = new Buffer([shiftBit, 0, current.key, 0, 0, 0, 0, 0]);
          const keys = keyboard(data);
          expect(keys.keyCodes).toEqual([current.key]);
          expect(keys.charCodes).toEqual([current.charCode, '', '', '', '', '']);
        });
      });
    });
  });
});

