const Network = require('../architecture/network');

/**
 * Generates a random integer between min and max.
 *
 * @function randomInt
 *
 * @param {number} min lower bound
 * @param {number} max upper bound
 * @returns {int} random integer between min and max
 */
let randomInt = function(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

let y2, useLast = false;

/**
 * This method puts gaussian noise onto a value
 *
 * @param {number} mean the value with the highest probability
 * @param {number} standardDeviation
 * @returns {number} noisy value
 */
let gaussianNoise = function(mean, standardDeviation) {
  let y1;
  if (useLast) {
    y1 = y2;
    useLast = false;
  } else {
    let x1, x2, w;
    do {
      x1 = 2.0 * Math.random() - 1.0;
      x2 = 2.0 * Math.random() - 1.0;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1.0);
    w = Math.sqrt((-2.0 * Math.log(w)) / w);
    y1 = x1 * w;
    y2 = x2 * w;
    useLast = true;
  }

  return mean + standardDeviation * y1;
};

/**
 * This method adds noise to a whole network.
 * So every node, connection and gate needs to be noised .
 *
 * @param {Network} network input network
 * @param {number} standardDeviation
 * @returns {Network} noisy network
 */
let addGaussianNoiseToNetwork = function(network, standardDeviation = 0.1) {
  let copy = Network.fromJSON(network.toJSON());
  for (let i = 0; i < copy.nodes.length; i++) {
    copy.nodes[i].bias = Math.min(1, Math.max(-1, gaussianNoise(copy.nodes[i].bias, standardDeviation)));
  }
  for (let i = 0; i < copy.gates.length; i++) {
    copy.gates[i].bias = Math.min(1, Math.max(-1, gaussianNoise(copy.gates[i].bias, standardDeviation)));
  }
  for (let i = 0; i < copy.connections.length; i++) {
    copy.connections[i].weight = Math.min(1, Math.max(-1, gaussianNoise(copy.connections[i].weight, standardDeviation)));
  }
  return copy;
};

/**
 * This method returns the index of the element with the highest value
 *
 * @function getMaxValueIndex
 *
 * @param {number[]} arr the input array
 * @returns {int} the index which the highest value
 */
let getMaxValueIndex = function(arr) {
  let index = 0;
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
      index = i;
    }
  }
  return index;
};

/**
 * This method shuffles an array.
 *
 * @function shuffle
 *
 * @param {T[]} arr input array
 * @returns {T[]} shuffled array
 *
 * Source: https://stackoverflow.com/a/2450976
 */
let shuffle = function(arr) {
  let j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

/**
 * This method picks a random element from an given array.
 *
 * @function pickRandom
 *
 * @param {T[]} arr input array
 * @returns {T} the randomly chosen element
 */
let pickRandom = function(arr) {
  return arr[randomInt(0, arr.length - 1)];
};


/**
 * This method returns the mean value from an array.
 *
 * @param {number[]} arr input array
 * @returns {number} mean value
 */
let mean = function(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

// Reinforcement learning specific functions
RL = {
  /**
   * This function will get the value from the fieldName, if present, otherwise returns the defaultValue
   *
   * @param {*} opt JSON object which contains all custom options
   * @param {String} fieldName
   * @param {*} defaultValue
   * @return {*} the value of the fieldName if present, otherwise the defaultValue
   */
  getOption: function(opt, fieldName, defaultValue) {
    return typeof opt === 'undefined' || typeof opt[fieldName] === 'undefined'
      ? defaultValue
      : opt[fieldName];
  },
};

module.exports.getMaxValueIndex = getMaxValueIndex;
module.exports.shuffle = shuffle;
module.exports.randomInt = randomInt;
module.exports.pickRandom = pickRandom;
module.exports.mean = mean;
module.exports.gaussianNoise = gaussianNoise;
module.exports.addGaussianNoiseToNetwork = addGaussianNoiseToNetwork;
module.exports.RL = RL;
