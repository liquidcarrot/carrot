/**
 * This method returns the index of the element with the highest value
 *
 * @function getMaxValueIndex
 * @memberof DQN
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
 * @param {[]} arr input array
 * @returns {[]} shuffled array
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
