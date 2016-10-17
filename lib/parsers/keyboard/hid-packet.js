/**
 * HID packet object
 */
function hidPacket() {
  const modifiers = {
    l_shift: false,
    l_control: false,
    l_alt: false,
    l_meta: false,
    r_control: false,
    r_shift: false,
    r_alt: false,
    r_meta: false,
  };

  return {
    modifiers,
    keyCodes: [],
    charCodes: [],
    errorStatus: false, // keyboard rollover

    empty: function empty() {
      return !this.mod() && this.keyCodes.length === 0;
    },
    control: function control() {
      return modifiers.l_control || modifiers.r_control;
    },
    shift: function shift() {
      return modifiers.l_shift || modifiers.r_shift;
    },
    meta: function meta() {
      return modifiers.l_meta || modifiers.r_meta;
    },
    alt: function alt() {
      return modifiers.l_alt || modifiers.r_alt;
    },
    mod: function mod() {
      return (
        modifiers.l_shift || modifiers.r_shift ||
        modifiers.l_control || modifiers.r_control ||
        modifiers.l_alt || modifiers.r_alt ||
        modifiers.l_meta || modifiers.r_meta
      );
    },
  };
}

module.exports = hidPacket;
