const proxyquire = require('proxyquire');

function hidstream() {
  this.pipe = function pipe() {};
  this.close = function close() {};
}

const Keyboard = proxyquire('../lib/keyboard', {
  './hidstream': hidstream,
});

describe('keyboard', () => {
  it('shouldbe defined', () => {
    expect(Keyboard).toBeDefined();
  });

  it('close device', () => {
    const keyboard = new Keyboard();
    spyOn(keyboard.device, 'close');
    keyboard.close();
    expect(keyboard.device.close).toHaveBeenCalled();
  });
});
