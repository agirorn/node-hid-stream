'use strict';

const proxyquire = require('proxyquire');
const FakeStream = require('./helpers/fake-stream');

class Keyboard extends FakeStream {}

const KeyboardCharacters = proxyquire('../lib/keyboard-characters', {
  './keyboard': Keyboard,
});

describe('KeyboardCharacters', () => {
  it('close device', () => {
    const lines = new KeyboardCharacters();
    spyOn(lines.device, 'close');
    lines.close();
    expect(lines.device.close).toHaveBeenCalled();
  });

  describe('.close', () => {
    it('closes the device', () => {
      const keyboard = new KeyboardCharacters();
      spyOn(keyboard.device, 'close');
      keyboard.close();
      expect(keyboard.device.close).toHaveBeenCalled();
    });

    it('emits close event', () => {
      const onClose = jasmine.createSpy('On Close');
      const keyboard = new KeyboardCharacters();
      keyboard.on('close', onClose);
      keyboard.close();
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('.on("error")', () => {
    it('forwards from device.on("error")', () => {
      const onError = jasmine.createSpy('On Error');
      const keyboard = new KeyboardCharacters();
      keyboard.on('error', onError);
      keyboard.device.emit('error', 'data');
      expect(onError).toHaveBeenCalledWith('data');
    });
  });

  describe('.on("end")', () => {
    it('forwards from device.on("end")', () => {
      const onEnd = jasmine.createSpy('On End');
      const keyboard = new KeyboardCharacters();
      keyboard.on('error', onEnd);
      keyboard.device.emit('error', 'data');
      expect(onEnd).toHaveBeenCalledWith('data');
    });
  });

  describe('.on("data")', () => {
    it('forwards from device.on("data")', () => {
      const onData = jasmine.createSpy('On Data');
      const keyboard = new KeyboardCharacters();
      keyboard.on('data', onData);
      keyboard.device.emit('data', { charCodes: ['d', 'a', 't', 'a'] });
      expect(onData).toHaveBeenCalledWith('data');
    });
  });

  describe('.on("close")', () => {
    it('forwards from device.on("close")', () => {
      const onClose = jasmine.createSpy('On Close');
      const keyboard = new KeyboardCharacters();
      keyboard.on('close', onClose);
      keyboard.device.emit('close', 'data');
      expect(onClose).toHaveBeenCalledWith('data');
    });
  });
});
