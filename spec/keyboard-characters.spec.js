const proxyquire = require('proxyquire');

function Keyboard() {
  this.pipe = function pipe() {};
  this.close = function close() {};
}

const KeyboardCharacters = proxyquire('../lib/keyboard-characters', {
  './keyboard': Keyboard,
});

describe('KeyboardCharacters', () => {
  it('shouldbe defined', () => {
    expect(KeyboardCharacters).toBeDefined();
  });

  it('close device', () => {
    const lines = new KeyboardCharacters();
    spyOn(lines.device, 'close');
    lines.close();
    expect(lines.device.close).toHaveBeenCalled();
  });
});
