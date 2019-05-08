let Network = require('./architecture/network.js')

/**
 * Generative Adverserial Network (GAN)
 *
 * @param {Array<{ inputs: Array<number>, outputs: Array<number> }>} dataset
 * @param {number} options.growth - Ratio of fake, i.e. "generated" data, to real data.
 */
let GAN = function(dataset, options) {
  this.generator;
  this.discriminator;
  this.raw_data;
}

GAN.prototype = {
  train: function(iterations) {
    
  },
  data: function(length) {
    
  },
}