const EventEmitter = require('events').EventEmiu;

function HID() {
  const device = new EventEmitter();
  device.close = function close() {};
  return device;
}

const nodeHid = {
  HID,
  devices() {},
};

module.exports = nodeHid;
