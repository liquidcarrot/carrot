const util = {
  sample: arr => {
    const len = arr == null ? 0 : arr.length
    return len ? arr[Math.floor(Math.random() * len)] : undefined
  },

  isNil: function(value) {
    return value == null;
  },

  /**
  * Returns a unique ID from two numbers
  *
  * @see {@link https://en.wikipedia.org/wiki/Pairing_function (Cantor pairing function)|Pairing function (Cantor pairing function)}
  *
  * @param {number} a - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
  * @param {number} b - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
  *
  * @return {number} - An Integer that uniquely represents a pair of Integers
  */
  getCantorNumber: function cantor_pairing_function (a,b) {
    if (a == undefined || b == undefined) throw new ReferenceError('Missing required parameter \'a\' or \'b\'');
    return 1 / 2 * (a + b) * (a + b + 1) + b;
  }
}

module.exports = util;
