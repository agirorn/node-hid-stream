# NODE HID STREAM
Stream data from HID device in Node.js


Wraps [node-hid](https://github.com/node-hid/node-hid) in a node.js Stream.

HID devices, specifically, keyboard-like devices.

Available Streams are:

  * **Hidstream**: Stream data from `node-hid`.
  * **Keyboard**: Stream for keyboard-like devices.
  * **KeyboardCharacters**: for keyboard-like devices that streams characters.
  * **KeyboardLines**: for keyboard-like devices stream lines split on ENTER. Can be used to read from  barcode scanners.

**keyboard-like = (keyboards or barcode scanners)**
----------
## Installation

```shell
npm install node-hid-stream
```

## Usage

### Hidstream

```javascript
var Hidstream = require('node-hid-stream').Hidstream;
var hidstream = new Hidstream({ vendorId: 3233, productId: 3233 });

hidstream.on("data", function(data) {
  console.log(data); // Raw buffer from HDI device.
});
```

### KeyboardLines
```javascript
var KeyboardLines = require('node-hid-stream').KeyboardLines;
var lines = new KeyboardLines({ vendorId: 3233, productId: 3233 });

lines.on("data", function(data) {
  // The user has pressed w, a, s & d, ENTER (simultaneously (why? I don't know))
  console.log(data); //  "wasd"
});
```

### KeyboardCharacters
```javascript
var KeyboardCharacters = require('node-hid-stream').KeyboardCharacters;
var characters = new KeyboardCharacters({ vendorId: 3233, productId: 3233 });

characters.on("data", function(data) {
  // The user has pressed w, a, s & d (simultaneously (why? I don't know))
  console.log(data); //  "wasd"
});
```

### Keyboard

```javascript
var Keyboard = require('node-hid-stream').Keyboard;
var keyboard = new Keyboard({ vendorId: 3233, productId: 3233 });

keyboard.on("data", function(data) {
  console.log(data); // easily consumed data format!
});
```

**Sample Data Event from Keyboard stream:**

The user has pressed Ctrl + Alt + Del
```javascript
{  // HidKeyboardPacket
  modifiers: {
    leftShift: false,
    leftControl: true,
    leftAlt: true,
    leftMeta: false,
    rightCtrl: false,
    rightShift: false,
    rightAlt: false,
    rightMeta: false
  },
  keyCodes: [ 76 ],
  keyChars: [],
  errorStatus: false
}
```

The user has pressed w, a, s & d (simultaneously (why? I don't know))
```javascript
{  // HidKeyboardPacket
  modifiers: {
    leftShift: false,
    leftControl: false,
    leftAlt: false,
    leftMeta: false,
    rightCtrl: false,
    rightShift: false,
    rightAlt: false,
    rightMeta: false
  },
  keyCodes: [ 26, 4, 22, 7 ],
  charCodes: [ 'w', 'a', 's', 'd' ],
  errorStatus: false
}
```

### HidKeyboardPacket

HidKeyboardPacket has additional convenience methods

* **shift()** returns `true` if left or right shift key is pressed.
* **control()** returns `true` if left or right control key is pressed.
* **alt()** returns `true` if left or right alt key is pressed.
* **meta()** returns `true` if left or right meta key is pressed.
* **mod()** returns `true` returns true if any of the modifier keys is pressed.
* **empty()** returns true if no key or modifier is pressed.

## Contributions

This is based on [hidstream](https://github.com/emilyrose/hidstream) from [Emily Rose](https://github.com/emilyrose)

Significant refactor contributed by [@kubat](http://github.com/kubat)
