'use strict';

const proxyquire = require('proxyquire');
const EventEmitter = require('events').EventEmitter;

function HID() {
  const device = new EventEmitter();
  device.close = function close() {};
  return device;
}

const nodeHid = {
  HID,
  devices() {},
};
const hidstream = proxyquire('../', {
  'node-hid': nodeHid,
});
const Device = hidstream.device;

describe('hidstreeam', () => {
  it('is defined', () => {
    expect(hidstream).toBeDefined();
  });

  describe('hidstream.device', () => {
    it('is defined', () => {
      expect(Device).toBeDefined();
    });

    it('retruns error when path is provided', () => {
      const device = new Device();
      expect(device).toEqual(new Error('no HID path or vid/pid specified'));
    });

    it('returns error when vid is only provided', () => {
      const device = new Device({ vid: 3232 });
      expect(device).toEqual(new Error('no HID path or vid/pid specified'));
    });

    it('returns error when pid is only provided', () => {
      const device = new Device({ pid: 3232 });
      expect(device).toEqual(new Error('no HID path or vid/pid specified'));
    });

    it('returns error when paswer is not a function', () => {
      const device = new Device({ path: 3232, parser: 'parser' });
      expect(device).toEqual(new Error('Invalid parser function specified'));
    });

    it('has options', () => {
      const device = new Device({ path: 3232 });
      expect(device.options).toEqual({ path: 3232, parser: hidstream.parser.raw });
    });

    it('has path', () => {
      const device = new Device({ path: 3232 });
      expect(device.path).toEqual(3232);
    });

    it('has vid and pid', () => {
      const device = new Device({ vid: 3232, pid: 1212 });
      expect(device.vid).toEqual(3232);
      expect(device.pid).toEqual(1212);
    });

    it('has device', () => {
      const device = new Device({ vid: 3232, pid: 1212 });
      expect(device.device).toBeDefined();
    });

    describe('#close', () => {
      it('should call device.close', () => {
        const device = new Device({ vid: 3232, pid: 1212 });
        spyOn(device.device, 'close');
        device.close();
        expect(device.device.close).toHaveBeenCalled();
      });

      it('should emmit close', () => {
        const onClose = jasmine.createSpy('on close');
        const device = new Device({ vid: 3232, pid: 1212 });
        device.on('close', onClose);
        device.close();
        expect(onClose).toHaveBeenCalled();
      });
    });

    describe('on end', () => {
      it('should call device.close', () => {
        const onEnd = jasmine.createSpy('on end');
        const device = new Device({ vid: 3232, pid: 1212 });
        device.on('end', onEnd);
        device.device.emit('end');
        expect(onEnd).toHaveBeenCalled();
      });
    });

    describe('on error', () => {
      it('should call device.close', () => {
        const onError = jasmine.createSpy('on error');
        const device = new Device({ vid: 3232, pid: 1212 });
        device.on('error', onError);
        device.device.emit('error', 'Error Message');
        expect(onError).toHaveBeenCalledWith('Error Message');
      });
    });

    describe('on data', () => {
      it('should call device.close', () => {
        const onData = jasmine.createSpy('on data');
        const parser = data => `parsed:${data}`;
        const device = new Device({ vid: 3232, pid: 1212, parser });
        device.on('data', onData);
        device.device.emit('data', 'data');
        expect(onData).toHaveBeenCalledWith('parsed:data');
      });
    });
  });


  describe('hidstream.devices', () => {
    it('should be defined', () => {
      expect(hidstream.devices).toBeDefined();
    });

    it('calls node-hid.devises', () => {
      spyOn(nodeHid, 'devices');
      hidstream.devices('one', 'two');
      expect(nodeHid.devices).toHaveBeenCalledWith('one', 'two');
    });
  });
});
