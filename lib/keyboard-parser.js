'use strict';

const HidKeyboardPacket = require('./hid-keyboard-packet');

function keyboard(rawData) {
  const packet = new HidKeyboardPacket();
  const data = rawData.toJSON().data;
  parseModifiers(packet, data.shift()); // parse modifiers (bit field)

  data.shift(); // the next element is always 0 (I think...)
  parseKeyCodes(packet, data); // parse keycodes from the rest
  parseCharCodes(packet, data); // parse charcodes from keycodes
  parseErrorState(packet, data); // detect rollover error

  return packet;
}

/**
 * Convert modifier key bits into
 * array of human-readable identifiers
 */
function parseModifiers(packet, bits) {
  /* eslint-disable no-bitwise */
  /* eslint-disable no-param-reassign */
  packet.modifiers.l_control = ((bits & 1) !== 0);
  packet.modifiers.l_shift = ((bits & 2) !== 0);
  packet.modifiers.l_alt = ((bits & 4) !== 0);
  packet.modifiers.l_meta = ((bits & 8) !== 0);
  packet.modifiers.r_control = ((bits & 16) !== 0);
  packet.modifiers.r_shift = ((bits & 32) !== 0);
  packet.modifiers.r_alt = ((bits & 64) !== 0);
  packet.modifiers.r_meta = ((bits & 128) !== 0);
  /* eslint-enable no-bitwise */
  /* eslint-enable no-param-reassign */
}


/**
 * Slice HID keycodes into separate array
 */
function parseKeyCodes(arr, keys) {
  if (typeof keys !== 'object') { return false; }

  keys.forEach((key) => {
    if (key > 3) { arr.keyCodes.push(key); }
  });

  return true;
}


function parseCharCodes(packet, keys) {
  if (typeof keys !== 'object') { return false; }
  const shift = packet.shift();
  function push(a, A) { packet.charCodes.push(shift ? A : a); }
  function parse(key) {
    switch (key) {
      // Note: codes are available here: http://www.usb.org/developers/hidpage/Hut1_12v2.pdf
      //       See page 53
      case 4: push('a', 'A'); break;
      case 5: push('b', 'B'); break;
      case 6: push('c', 'C'); break;
      case 7: push('d', 'D'); break;
      case 8: push('e', 'E'); break;
      case 9: push('f', 'F'); break;
      case 10: push('g', 'G'); break;
      case 11: push('h', 'H'); break;
      case 12: push('i', 'I'); break;
      case 13: push('j', 'J'); break;
      case 14: push('k', 'K'); break;
      case 15: push('l', 'L'); break;
      case 16: push('m', 'M'); break;
      case 17: push('n', 'N'); break;
      case 18: push('o', 'O'); break;
      case 19: push('p', 'P'); break;
      case 20: push('q', 'Q'); break;
      case 21: push('r', 'R'); break;
      case 22: push('s', 'S'); break;
      case 23: push('t', 'T'); break;
      case 24: push('u', 'U'); break;
      case 25: push('v', 'V'); break;
      case 26: push('w', 'W'); break;
      case 27: push('x', 'X'); break;
      case 28: push('y', 'Y'); break;
      case 29: push('z', 'Z'); break;

      case 30: push('1', '!'); break;
      case 31: push('2', '@'); break;
      case 32: push('3', '#'); break;
      case 33: push('4', '$'); break;
      case 34: push('5', '%'); break;
      case 35: push('6', '^'); break;
      case 36: push('7', '&'); break;
      case 37: push('8', '*'); break;
      case 38: push('9', '('); break;
      case 39: push('0', ')'); break;

      case 40: push('\n', '\n'); break;
      case 41: push('', ''); break; // escape
      case 42: push('', ''); break; // delete
      case 43: push('\t', '\t'); break;
      case 44: push(' ', ' '); break;
      case 45: push('-', '_'); break;
      case 46: push('=', '+'); break;
      case 47: push('[', '{'); break;
      case 48: push(']', '}'); break;
      case 49: push('\\', '|'); break;
      case 50: push('#', '~'); break;
      case 51: push(';', ':'); break;
      case 52: push('\'', '"'); break;
      case 53: push('`', '~'); break;
      case 54: push(',', '<'); break;
      case 55: push('.', '>'); break;
      case 56: push('/', '?'); break;

      case 57: push('', ''); break; // caps lock
      case 58: push('', ''); break; // F1
      case 59: push('', ''); break; // F2
      case 60: push('', ''); break; // F3
      case 61: push('', ''); break; // F4
      case 62: push('', ''); break; // F5
      case 63: push('', ''); break; // F6
      case 64: push('', ''); break; // F7
      case 65: push('', ''); break; // F8
      case 66: push('', ''); break; // F9
      case 67: push('', ''); break; // F10
      case 68: push('', ''); break; // F11
      case 69: push('', ''); break; // F12
      case 70: push('', ''); break; // Print screen
      case 71: push('', ''); break; // Scroll lock
      case 72: push('', ''); break; // Pause
      case 73: push('', ''); break; // Insert
      case 74: push('', ''); break; // Home
      case 75: push('', ''); break; // PageUp
      case 76: push('', ''); break; // Delete forward
      case 77: push('', ''); break; // End
      case 78: push('', ''); break; // PageDown
      case 79: push('', ''); break; // RightArrow
      case 80: push('', ''); break; // LeftArrow
      case 81: push('', ''); break; // DownArrow
      case 82: push('', ''); break; // UpArrow

      // Keypad
      case 83: push('', ''); break; // NumLock / clear
      case 84: push('/', '/'); break; //
      case 85: push('*', '*'); break; //
      case 86: push('-', '-'); break; //
      case 87: push('+', '+'); break; //
      case 88: push('\n', '\n'); break; //

      // Keypad numbers
      case 89: push('1', '1'); break; //
      case 90: push('2', '2'); break; //
      case 91: push('3', '3'); break; //
      case 92: push('4', '4'); break; //
      case 93: push('5', '5'); break; //
      case 94: push('6', '6'); break; //
      case 95: push('7', '7'); break; //
      case 96: push('8', '8'); break; //
      case 97: push('9', '9'); break; //
      case 98: push('0', '0'); break; //
      case 99: push('.', '.'); break; //
      case 100: push('\\', '|'); break; // Non-US
      case 101: push('', ''); break; // Application
      case 102: push('', ''); break; // Power
      case 103: push('=', '='); break; // Keypad =
      case 104: push('', ''); break; // F13
      case 105: push('', ''); break; // F14
      case 106: push('', ''); break; // F15
      case 107: push('', ''); break; // F16
      case 108: push('', ''); break; // F17
      case 109: push('', ''); break; // F18
      case 110: push('', ''); break; // F19
      case 111: push('', ''); break; // F20
      case 112: push('', ''); break; // F21
      case 113: push('', ''); break; // F22
      case 114: push('', ''); break; // F23
      case 115: push('', ''); break; // F24

      // Misc actions omitted below...

      case 133: push(',', ','); break; //
      case 134: push('=', '='); break; //

      case 158: push('\n', '\n'); break; //

      case 182: push('(', '('); break; //
      case 183: push(')', ')'); break; //
      case 184: push('{', '{'); break; //
      case 185: push('}', '}'); break; //
      case 186: push('\t', '\t'); break; //
      case 187: push('', ''); break; // Backspace
      case 188: push('A', 'A'); break; //
      case 189: push('B', 'B'); break; //
      case 190: push('C', 'C'); break; //
      case 191: push('D', 'D'); break; //
      case 192: push('E', 'E'); break; //
      case 193: push('F', 'F'); break; //

      case 195: push('^', '^'); break; //
      case 196: push('%', '%'); break; //
      case 197: push('<', '<'); break; //
      case 198: push('>', '>'); break; //
      case 199: push('&', '&'); break; //

      default:
        // There are many codes that are not currently handled here.
        push('', '');
        break;
    }
  }

  keys.forEach(parse);
  return true;
}

/**
 * Detect keyboard rollover error
 * This occurs when the user has pressed too many keys for the
 * particular device to handle
 */
function parseErrorState(packet, state) {
  let states = 0;

  state.forEach((s) => {
    if (s === 1) {
      states += 1;
    }
  });

  if (states >= 6) {
    packet.errorStatus = true; // eslint-disable-line no-param-reassign
  }
}

module.exports = keyboard;
