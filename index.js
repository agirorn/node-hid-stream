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

    var dev = this;

    this.opts   = opts;
    this.path   = opts.path;
    this.vid    = opts.vid;
    this.pid    = opts.pid;
    this.device = opts.path ? new hid.HID(opts.path) : new hid.HID(opts.vid, opts.pid);

    this.close = function close() {
        if (dev.device) {
            dev.device.close();
        }
        dev.emit("close");
    };

    stream.Stream.call(this);

    this.parser = opts.parser.bind(this);
    this.device.read(this.parser);

    return this;
};


var devices = function(vendorId, productId) {
    return hid.devices(vendorId, productId);
};


util.inherits(hidDevice, stream.Stream);

exports.device  = hidDevice;
exports.parser  = hidParsers;
exports.devices = devices;
