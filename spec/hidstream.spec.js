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
const Hidstream = proxyquire('../lib/hidstream', {
  'node-hid': nodeHid,
});

describe('hidstreeam', () => {
  describe('hidstream.device', () => {
    it('throws error when no path, vendorId or productId is provided', () => {
      expect(() => {
        new Hidstream(); // eslint-disable-line no-new
      }).toThrowError('no HID path or vendorId/productId specified');
    });

    it('throws error when only vendorId is only provided', () => {
      expect(() => {
        new Hidstream({ vendorId: 3232 }); // eslint-disable-line no-new
      }).toThrowError('no HID productId specified');
    });

    it('throws error when only productId is provided', () => {
      expect(() => {
        new Hidstream({ productId: 3232 }); // eslint-disable-line no-new
      }).toThrowError('no HID vendorId specified');
    });

    it('has options', () => {
      const device = new Hidstream({ path: 3232 });
      expect(device.options).toEqual({ path: 3232 });
    });

    it('has path', () => {
      const device = new Hidstream({ path: 3232 });
      expect(device.path).toEqual(3232);
    });

    it('has vendorId and productId', () => {
      const device = new Hidstream({ vendorId: 3232, productId: 1212 });
      expect(device.vendorId).toEqual(3232);
      expect(device.productId).toEqual(1212);
    });

    it('has device', () => {
      const device = new Hidstream({ vendorId: 3232, productId: 1212 });
      expect(device.device).toBeDefined();
    });

    describe('#close', () => {
      it('should call device.close', () => {
        const device = new Hidstream({ vendorId: 3232, productId: 1212 });
        spyOn(device.device, 'close');
        device.close();
        expect(device.device.close).toHaveBeenCalled();
      });

      it('should emmit close', () => {
        const onClose = jasmine.createSpy('on close');
        const device = new Hidstream({ vendorId: 3232, productId: 1212 });
        device.on('close', onClose);
        device.close();
        expect(onClose).toHaveBeenCalled();
      });
    });

    describe('on end', () => {
      it('should call device.close', () => {
        const onEnd = jasmine.createSpy('on end');
        const device = new Hidstream({ vendorId: 3232, productId: 1212 });
        device.on('end', onEnd);
        device.device.emit('end');
        expect(onEnd).toHaveBeenCalled();
      });
    });

    describe('on error', () => {
      it('should call device.close', () => {
        const onError = jasmine.createSpy('on error');
        const device = new Hidstream({ vendorId: 3232, productId: 1212 });
        device.on('error', onError);
        device.device.emit('error', 'Error Message');
        expect(onError).toHaveBeenCalledWith('Error Message');
      });
    });

    describe('on data', () => {
      it('should call device.close', () => {
        const onData = jasmine.createSpy('on data');
        const device = new Hidstream({ vendorId: 3232, productId: 1212 });
        device.on('data', onData);
        device.device.emit('data', 'data');
        expect(onData).toHaveBeenCalledWith('data');
      });
    });
  });
});
