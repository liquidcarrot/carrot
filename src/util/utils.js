const util = {
  sample: arr => {
    const len = arr == null ? 0 : arr.length
    return len ? arr[Math.floor(Math.random() * len)] : undefined
  },

  isNil: value => (value == null),

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
  },

  /**
  * Checks for a value contained in a cantor reference object
  * using the key produced by the ids of two objects
  *
  * @expects All arguments defined
  * @expects Arguments in sequential "to" & "from" order
  *
  * @param {Object} from An object with an id value
  * @param {Object} to An object with an id value
  * @param {Object} reference An object with cantor numbers as lookup keys and (node / connections ids) as values
  *
  * @returns {CantorLookupResponse}
  */
  cantorLookup: function(from, to, reference) {
    const key = this.getCantorNumber(from.id, to.id);

    /**
     * @typedef {Object} CantorLookupResponse
     * @property {number} key - The cantor number key
     * @property {number} id - The id corresponsing
    */
    return {
      key,
      id: (reference.hasOwnProperty(key) ? reference[key] : undefined)
    }
  },

  /**
  * Gets a sequential id by checking a cantor reference object
  *
  * @expects All arguments defined
  * @expects Arguments in sequential "to" & "from" order
  * @expects cantorLookup to return undefined in negative case
  *
  * @param {Object} from An object with an id value
  * @param {Object} to An object with an id value
  * @param {Object} reference A mutable object with cantor numbers as lookup keys and (node / connections ids) as values
  * @param {number} lastId previous Id to increment in lieu of an existing id value
  *
  * @return {CantorIdResponse} The key and id value for the cantor refernce object
  */
  getCantorId: function(from, to, reference, lastId) {
    const response = this.cantorLookup(from, to, reference);

    /**
     * @typedef {Object} CantorIdResponse
     * @property {number} key - The cantor number key
     * @property {number} id - The id for the object
    */
    return {
      key: response.key,
      id: this.isNil(response.id) ? lastId + 1 : response.id
    }
  },
}

module.exports = util;
