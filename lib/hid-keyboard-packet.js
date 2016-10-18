'use strict';

/**
 * HID Keyboard Packet object
 */
class HidKeyboardPacket {
  constructor() {
    this.modifiers = {
      l_shift: false,
      l_control: false,
      l_alt: false,
      l_meta: false,
      r_control: false,
      r_shift: false,
      r_alt: false,
      r_meta: false,
    };

    this.keyCodes = [];
    this.charCodes = [];
    this.errorStatus = false; // keyboard rollover
  }

  empty() {
    return !this.mod() && this.keyCodes.length === 0;
  }

  control() {
    return this.modifiers.l_control || this.modifiers.r_control;
  }

  shift() {
    return this.modifiers.l_shift || this.modifiers.r_shift;
  }

  meta() {
    return this.modifiers.l_meta || this.modifiers.r_meta;
  }

  alt() {
    return this.modifiers.l_alt || this.modifiers.r_alt;
  }

  mod() {
    const modifiers = this.modifiers;
    return (
      modifiers.l_shift || modifiers.r_shift ||
      modifiers.l_control || modifiers.r_control ||
      modifiers.l_alt || modifiers.r_alt ||
      modifiers.l_meta || modifiers.r_meta
    );
  }
}

module.exports = HidKeyboardPacket;
