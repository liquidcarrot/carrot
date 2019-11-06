/**
 * Generates a random integer between min and max.
 *
 * @param {number} min lower bound
 * @param {number} max upper bound
 * @returns {number} random integer between min and max
 */
let randomInt = function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
};

/**
 * This method returns the index of the element with the highest value
 *
 * @function getMaxValueIndex
 *
 * @param {number[]} arr the input array
 * @returns {number} the index which the highest value
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
 * This method shuffles an array;
 *
 * @function shuffle
 *
 * @param {[]} arr input array
 * @returns {[]} shuffled array
 *
 * Source: https://stackoverflow.com/a/2450976
 */
let shuffle = function shuffle(arr) {
  let j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

module.exports.getMaxValueIndex = getMaxValueIndex;
module.exports.shuffle = shuffle;
module.exports.randomInt = randomInt;
