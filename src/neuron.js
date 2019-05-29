const Connection = require("./connection");

function Neuron() {
  let self = this;
  
  self.connection = {
    incoming: [],
    outgoing: []
  }
  self.outputs = []
  
  self.connect = function(neuron, weight) {
    // Code here...
  }
  
  /**
   * SIGMOID: 1 / (1 + Math.exp(-x))
   */
  self.activate = function(input) {
    // Code here...
  }
}

module.exports = Neuron;