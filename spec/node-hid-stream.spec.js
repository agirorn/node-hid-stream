const nodeHidSteam = require('../');

describe('node-hid-stream', () => {
  it('should have Hidstream', () => {
    expect(nodeHidSteam.Hidstream).toBeDefined();
  });

  it('should have Keyboard', () => {
    expect(nodeHidSteam.Keyboard).toBeDefined();
  });

  it('should have KeyboardCharacters', () => {
    expect(nodeHidSteam.Keyboard).toBeDefined();
  });

  it('should have KeyboardLines', () => {
    expect(nodeHidSteam.Keyboard).toBeDefined();
  });
});
