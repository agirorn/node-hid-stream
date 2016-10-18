const proxyquire = require('proxyquire');

function KeyboardCharacters() {
  this.pipe = function pip() {};
  this.close = function close() {};
}

const KeyboardLines = proxyquire('../lib/keyboard-lines', {
  './keyboard-characters': KeyboardCharacters,
});

describe('KeyboardLines', () => {
  it('shouldbe defined', () => {
    expect(KeyboardLines).toBeDefined();
  });

  it('close device', () => {
    const lines = new KeyboardLines();
    spyOn(lines.device, 'close');
    lines.close();
    expect(lines.device.close).toHaveBeenCalled();
  });
});
