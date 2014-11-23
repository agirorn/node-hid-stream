# HIDSTREAM
__Streaming HID Events in Node.js__


Wraps [node-hid](https://github.com/node-hid/node-hid) with several parsers for common
HID devices, specifically, keyboard-like devices.

Data parsers are available for:

  * **raw**: passes the data as reported by `node-hid`.
  * **keyboard**: for keyboard-like devices.
  * **newline**: for keyboard-like devices where events are emitted on new-lines. (e.g. many barcode scanners, etc.)

----------

### Example:

```javascript
var hid = require('hidstream');
var dev = new hid.device('0001:001:00', { hid.parser.keyboard });

dev.on("data", function(dat) {
    console.log(dat); // easily consumed data format!
});
```

### Sample HID Data Events for the parser:

__The user has pressed Ctrl + Alt + Del__
```javascript
{
    modifiers = {
        l_shift:   false,
        l_control: true,
        l_alt:     true,
        l_meta:    false,
        r_ctrl:    false,
        r_shift:   false,
        r_alt:     false,
        r_meta:    false
    },
    keyCodes : [
        76
    ],
    keyChars : [],
    errorStatus : false
}
```

The data packet has additional convenience methods, `shift()`, `control()`, `alt()`, and `meta()` which return true if either the left or right key are down. The function `mod()` returns true if any of the modifier keys is pressed.

Additionally, `empty()` returns true if there is no modifier or key currently down.

__The user has pressed w, a, s & d (simultaneously (why? I don't know))__
```javascript
{
    modifiers = {
        l_shift:   false,
        l_control: true,
        l_alt:     true,
        l_meta:    false,
        r_ctrl:    false,
        r_shift:   false,
        r_alt:     false,
        r_meta:    false
    },
    keyCodes: [
        26, 4, 22, 7
    ],
    charCodes: [
        'w', 'a', 's', 'd'
    ],
    errorStatus: false
}
```

### Status

Right now, hidstream is only parsing keyboard events, and has no awareness of HID feature reports.

After keyboard events are being parsed properly (and fully), I will add support for feature reports and other devices such as mice.

