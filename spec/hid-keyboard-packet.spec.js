'use strict';

const HidKeyboardPacket = require('../lib/hid-keyboard-packet');

describe('HidKeyboardPacket', () => {
  let packet;

  beforeEach(() => {
    packet = new HidKeyboardPacket();
  });

  describe('defaults', () => {
    it('should set modifiers.l_shift to false', () => {
      expect(packet.modifiers.l_shift).toBe(false);
    });

    it('should set modifiers.l_control to false', () => {
      expect(packet.modifiers.l_control).toBe(false);
    });

    it('should set modifiers.l_alt to false', () => {
      expect(packet.modifiers.l_alt).toBe(false);
    });

    it('should set modifiers.l_meta to false', () => {
      expect(packet.modifiers.l_meta).toBe(false);
    });

    it('should set modifiers.r_shift to false', () => {
      expect(packet.modifiers.r_shift).toBe(false);
    });

    it('should set modifiers.r_control to false', () => {
      expect(packet.modifiers.r_control).toBe(false);
    });

    it('should set modifiers.r_alt to false', () => {
      expect(packet.modifiers.r_alt).toBe(false);
    });

    it('should set modifiers.r_meta to false', () => {
      expect(packet.modifiers.r_meta).toBe(false);
    });

    it('should set keyCodes to an empty Array', () => {
      expect(packet.keyCodes.length).toEqual(0);
    });

    it('should set charCodes to an empty Array', () => {
      expect(packet.charCodes.length).toEqual(0);
    });

    it('should set errorStatus to false', () => {
      expect(packet.errorStatus).toBe(false);
    });
  });

  describe('#mod()', () => {
    const MODIFIERS = [
      'l_shift',
      'l_control',
      'l_alt',
      'l_meta',
      'r_control',
      'r_shift',
      'r_alt',
      'r_meta',
    ];

    it('is false by default', () => {
      expect(packet.mod()).toBe(false);
    });

    MODIFIERS.forEach((modifier) => {
      it(`should be true when modifiers.${modifier} is true`, () => {
        packet.modifiers[modifier] = true;
        expect(packet.mod()).toBe(true);
      });
    });
  });

  describe('#shift()', () => {
    const SHIFTS = [
      'l_shift',
      'r_shift',
    ];

    it('is false by default', () => {
      expect(packet.mod()).toBe(false);
    });

    SHIFTS.forEach((modifier) => {
      it(`should be true when modifiers.${modifier} is true`, () => {
        packet.modifiers[modifier] = true;
        expect(packet.shift()).toBe(true);
      });
    });
  });

  describe('#control()', () => {
    const SHIFTS = [
      'l_control',
      'r_control',
    ];

    it('is false by default', () => {
      expect(packet.control()).toBe(false);
    });

    SHIFTS.forEach((modifier) => {
      it(`should be true when modifiers.${modifier} is true`, () => {
        packet.modifiers[modifier] = true;
        expect(packet.control()).toBe(true);
      });
    });
  });

  describe('#meta()', () => {
    const ALTS = [
      'l_meta',
      'r_meta',
    ];

    it('is false by default', () => {
      expect(packet.mod()).toBe(false);
    });

    ALTS.forEach((modifier) => {
      it(`should be true when modifiers.${modifier} is true`, () => {
        packet.modifiers[modifier] = true;
        expect(packet.meta()).toBe(true);
      });
    });
  });

  describe('#alt()', () => {
    const ALTS = [
      'l_alt',
      'r_alt',
    ];

    it('is false by default', () => {
      expect(packet.mod()).toBe(false);
    });

    ALTS.forEach((modifier) => {
      it(`should be true when modifiers.${modifier} is true`, () => {
        packet.modifiers[modifier] = true;
        expect(packet.alt()).toBe(true);
      });
    });
  });

  describe('#empty()', () => {
    const MODIFIERS = [
      'l_shift',
      'l_control',
      'l_alt',
      'l_meta',
      'r_control',
      'r_shift',
      'r_alt',
      'r_meta',
    ];

    it('is true by default', () => {
      expect(packet.empty()).toBe(true);
    });

    MODIFIERS.forEach((modifier) => {
      it(`should be false when modifiers.${modifier} is true`, () => {
        packet.modifiers[modifier] = true;
        expect(packet.empty()).toBe(false);
      });
    });

    it('should be false when keyCodes is not empty', () => {
      packet.keyCodes.push('K');
      expect(packet.empty()).toBe(false);
    });
  });
});
