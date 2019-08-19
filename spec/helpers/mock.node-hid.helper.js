const mockery = require('mockery');
const { EventEmitter } = require('events');

mockery.enable({
  warnOnUnregistered: false,
});
function HID() {
  const device = new EventEmitter();
  device.close = function close() {};
  return device;
}

const nodeHid = {
  HID,
  devices() {},
};

mockery.registerMock('node-hid', nodeHid);
