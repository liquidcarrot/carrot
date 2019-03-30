/**
* @module Carrot
*
* @private
*
*
* @borrows methods/methods as methods
* @borrows Connection as Connection
* @borrows architecture/architect as architect
* @borrows Network as Network
* @borrows config as config
* @borrows Layer as Group
* @borrows Layer as Layer
* @borrows Node as Node
* @borrows neat as Neat
* @borrows multi as multi
*
*/
var Carrot = {
  methods: require('./methods/methods'),
  Connection: require('./architecture/connection'),
  architect: require('./architecture/architect'),
  Network: require('./architecture/network'),
  config: require('./config'),
  Group: require('./architecture/group'),
  Layer: require('./architecture/layer'),
  Node: require('./architecture/node'),
  Neat: require('./neat'),
  multi: require('./multithreading/multi')
};

// CommonJS & AMD
if (typeof define !== 'undefined' && define.amd) {
  define([], function () { return Carrot; });
}

// Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Carrot;
}

// Browser
if (typeof window === 'object') {
  (function () {
    var old = window['carrot'];
    Carrot.ninja = function () {
      window['carrot'] = old;
      return Carrot;
    };
  })();

  window['carrot'] = Carrot;
}
