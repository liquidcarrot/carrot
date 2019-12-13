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

let hasReturnValue = false;
let returnValue = 0;
/**
 * This method generates a gaussian random number between 0 and 1
 *
 * @returns {number} gaussian random number
 */
let nextGaussian = function() {
  if (hasReturnValue) {
    hasReturnValue = false;
    return returnValue;
  }
  let u = 2 * Math.random() - 1;
  let v = 2 * Math.random() - 1;
  let r = u * u + v * v;
  if (r === 0 || r > 1) {
    return nextGaussian();
  }
  let c = Math.sqrt(-2 * Math.log(r) / r);
  returnValue = v * c;
  hasReturnValue = true;
  return u * c;
};

let sqrtOfTwoPi = Math.sqrt(2 * Math.PI);
/**
 * This method puts gaussian noise onto a value
 *
 * @param {number} value the value with the highest probability
 * @param {number} standardDeviation
 * @returns {number} noisy value
 */
let gaussianNoise = function(value = 0.5, standardDeviation = 1) {
  return Math.exp(-((nextGaussian() - value) ** 2) / (2 * standardDeviation * standardDeviation))
    / (standardDeviation * sqrtOfTwoPi);
};

/**
 * This method adds noise to a whole network.
 * So every node, connection and gate needs to be noised .
 *
 * @param {Network} network input network
 * @param {number} standardDeviation
 * @returns {Network} noisy network
 */
let addGaussianNoiseToNetwork = function(network, standardDeviation = 0.2) {
  let copy = Network.fromJSON(network.toJSON());
  for (let i = 0; i < copy.nodes.length; i++) {
    copy.nodes[i].weight = gaussianNoise(copy.nodes[i].weight, standardDeviation);
  }
  for (let i = 0; i < copy.gates.length; i++) {
    copy.gates[i].weight = gaussianNoise(copy.gates[i].weight, standardDeviation);
  }
  for (let i = 0; i < copy.connections.length; i++) {
    copy.connections[i].weight = gaussianNoise(copy.connections[i].weight, standardDeviation);
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
module.exports.flatten = flatten;
module.exports.gaussianNoise = gaussianNoise;
module.exports.addGaussianNoiseToNetwork = addGaussianNoiseToNetwork;
module.exports.RL = RL;
