/**
 * This method returns the index of the element with the highest value
 *
 * @function getMaxValueIndex
 * @memberof DQN
 *
 * @param {number[]} arr the input array
 * @returns {number} the index which the highest value
 */
export function getMaxValueIndex(arr) {
  let index = 0;
  let maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
      index = i;
    }
  }
  return index;
}
