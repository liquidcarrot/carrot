let _ = require("./_");
let EventEmitter = require('eventemitter3');

function Connection(options={}) {
  EventEmitter.call(this);
};

function Network(options={}) {
  EventEmitter.call(this);
};

function Population(options={}) {
  EventEmitter.call(this);
};

_.mixin([Connection, Network, Population], Object.create(EventEmitter.prototype), { prototype: true });
