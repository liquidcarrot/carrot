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
 * @param {[]} arr input array
 * @returns {[]} shuffled array
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
 * @param {[]} arr input array
 * @returns {*} the randomly chosen element
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
module.exports.RL = RL;
