"use strict";

var hid        = require("node-hid"),
    hidParsers = require("./lib/parser"),
    stream     = require("stream"),
    util       = require("util");


var hidDevice = function(opts) {
    opts = opts || {};
    if (!opts.path && !(opts.vid && opts.pid))        { return new Error("no HID path or vid/pid specified"); }

    if (!opts.parser) {
        opts.parser = hidParsers.raw;
    } else if (typeof opts.parser !== "function") {
        return new Error("Invalid parser function specified");
    }

    var device = this;

    this.opts   = opts;
    this.path   = opts.path;
    this.vid    = opts.vid;
    this.pid    = opts.pid;
    this.device = opts.path ? new hid.HID(opts.path) : new hid.HID(opts.vid, opts.pid);

    this.close = function close() {
        if (device.device) {
            device.device.close();
        }
        device.emit("close");
    };

    stream.Stream.call(this);

    var parser = opts.parser;
    this.device.on('data', function(data) {
      var d = parser(data);
      device.emit('data', d);
    });

    this.device.on('error', function(error) {
      device.emit('error', error);
    });

    this.device.on('end', function(end) {
      device.emit('end', end);
    });

    return this;
};


var devices = function(vendorId, productId) {
    return hid.devices(vendorId, productId);
};


util.inherits(hidDevice, stream.Stream);

exports.device  = hidDevice;
exports.parser  = hidParsers;
exports.devices = devices;
