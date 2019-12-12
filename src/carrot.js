const Carrot = {
  activation: require('./methods/activation'),
  cost: require("./methods/cost"),
  methods: require('./methods/methods'),
  Connection: require('./architecture/connection'),
  architect: require('./architecture/architect'),
  Network: require('./architecture/network'),
  config: require('./config'),
  Group: require('./architecture/group'),
  Layer: require('./architecture/layer'),
  Node: require('./architecture/node'),
  Neat: require('./neat'),
  Population: require('./architecture/population'),
  GAN: require('./gan'),
  multi: require('./multithreading/multi'),
  DQN: require('./architecture/rl/dqn'),
  DDPG: require('./architecture/rl/ddpg'),
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
