const Network = require('../architecture/network');

/**
 * Generates a random integer between min and max.
 *
 * @function randomInt
 *
 * @param {number} min lower bound
 * @param {number} max upper bound
 * @returns {int} random integer between min and max
 *
 * @todo Create unit test
 */
let randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

let return_v = false;
let v_val = 0.0;
let nextGaussian = function() {
  if (return_v) {
    return_v = false;
    return v_val;
  }
  let u = 2 * Math.random() - 1;
  let v = 2 * Math.random() - 1;
  let r = u * u + v * v;
  if (r === 0 || r > 1) {
    return nextGaussian();
  }
  let c = Math.sqrt(-2 * Math.log(r) / r);
  v_val = v * c;
  return_v = true;
  return u * c;
};

let sqrtOfTwoPi = Math.sqrt(2 * Math.PI);

let gaussianNoise = function(mean, standardDeviation) {
  return Math.exp(-((nextGaussian() - mean) ** 2) / (2 * standardDeviation * standardDeviation))
    / (standardDeviation * sqrtOfTwoPi);
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
 *
 * @todo Create unit test
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

/**
 * This method adds noise to a whole network.
 *
 * @param {Network} network input network
 *
 * @return {Network} noisy network
 */
let addNoiseToNetwork = function(network) {
  let copy = Network.fromJSON(network.toJSON());
  for (let i = 0; i < copy.nodes.length; i++) {
    copy.nodes[i].weight = gaussianNoise(copy.nodes[i].weight, 0.2);
  }
  for (let i = 0; i < copy.gates.length; i++) {
    copy.gates[i].weight = gaussianNoise(copy.gates[i].weight, 0.2);
  }
  for (let i = 0; i < copy.connections.length; i++) {
    copy.connections[i].weight = gaussianNoise(copy.connections[i].weight, 0.2);
  }
  return copy;
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
module.exports.addNoiseToNetwork = addNoiseToNetwork;
module.exports.RL = RL;
