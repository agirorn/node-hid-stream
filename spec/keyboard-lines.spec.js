'use strict';

const proxyquire = require('proxyquire');
const FakeStream = require('./helpers/fake-stream');

class KeyboardCharacters extends FakeStream {}

const KeyboardLines = proxyquire('../lib/keyboard-lines', {
  './keyboard-characters': KeyboardCharacters,
});

describe('KeyboardLines', () => {
  describe('.close', () => {
    it('closes the device', () => {
      const keyboard = new KeyboardLines();
      spyOn(keyboard.device, 'close');
      keyboard.close();
      expect(keyboard.device.close).toHaveBeenCalled();
    });

    it('emits close event', () => {
      const onClose = jasmine.createSpy('On Close');
      const keyboard = new KeyboardLines();
      keyboard.on('close', onClose);
      keyboard.close();
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('.on("error")', () => {
    it('forwards from device.on("error")', () => {
      const onError = jasmine.createSpy('On Error');
      const keyboard = new KeyboardLines();
      keyboard.on('error', onError);
      keyboard.device.emit('error', 'data');
      expect(onError).toHaveBeenCalledWith('data');
    });
  });

  describe('.on("end")', () => {
    it('forwards from device.on("end")', () => {
      const onEnd = jasmine.createSpy('On End');
      const keyboard = new KeyboardLines();
      keyboard.on('error', onEnd);
      keyboard.device.emit('error', 'data');
      expect(onEnd).toHaveBeenCalledWith('data');
    });
  });

  describe('.on("data")', () => {
    it('forwards from device.on("data")', () => {
      const onData = jasmine.createSpy('On Data');
      const keyboard = new KeyboardLines();
      keyboard.on('data', onData);
      keyboard.device.emit('data', 'data\ngarbage');
      expect(onData).toHaveBeenCalledWith('data');
    });
  });

  describe('.on("close")', () => {
    it('forwards from device.on("close")', () => {
      const onClose = jasmine.createSpy('On Close');
      const keyboard = new KeyboardLines();
      keyboard.on('close', onClose);
      keyboard.device.emit('close', 'data');
      expect(onClose).toHaveBeenCalledWith('data');
    });
  });
});
