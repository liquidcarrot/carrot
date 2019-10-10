function Network() {
  this.connections = []; // [0, [w], [a, b, c], ...]
  this.state = []; // f, f', e, e', o
  this.methods = []; // F, F', E, E', O
}

module.exports = Network;
