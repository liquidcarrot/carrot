function Network(layers) {
  this.layers = []; // NxN
  this.connections = []; // NxN
  this.values = []; // N

  /**
  * @param {number} size - Neurons in layer
  * @param {number} index - Inserts layer at this index
  * @param {Object} options
  * @param {boolean} [options.front=false] - Adds layers to the beginning of the network i.e. reverse order
  * @param {boolean} [options.endpoints=false] - Allows layers to be added as the outputs or inputs of the neural networks.
  */
  this.addLayer = function(size, index, options) {
    for(let s = 0; s < size ; s++) {
      this.values.push(0);
    }

  }

  if(layers) {
    for(let l = 0; l < layers.length; l++) {
       // Adds a new layer to the network
      this.addLayer(layers[l], {
        endpoints: true // Puts the layer towards the end of the network
      });
    }
  }
}




// function Network(layers) {
//   this.connections = []; // [0, [w], [a, b, c], ...]
//   this.state = []; // f, f', e, e', o
//   this.methods = []; // F, F', E, E', O
//   this.flow = []
// }
//
//
//
// module.exports = Network;
