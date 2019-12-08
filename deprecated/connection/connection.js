/**
* @param {number|string|Function} [options.id]
* @param {number|number[]|string|string[]|Object|Object[]} [options.from]
* @param {number|number[]|string|string[]|Object|Object[]} [options.to]
*/
function Connection(options={}) {
  this.id = options.id;
  this.from = options.from;
  this.to = options.to;

  this.forward = [];  // payload stream `from --> to`
  this.backward = []; // payload stream `to --> from`

  /**
  * @param {Object} payload
  * @param {boolean} [options.forward=true]
  * @param {boolean} [options.front=false] - Iff `true`, will add payload to the the front/begining of `this.forward` or `this.backward`
  *
  * @fires prepush
  * @fires push
  * @fires postpush
  */
  this.push = function(payload, options={}) {}
  /**
  * @param {boolean} [options.forward=true]
  * @param {boolean} [options.front=true]
  *
  * @fires prepull
  * @fires pull
  * @fires postpull
  */
  this.pull = function(options={}) {}
}

module.exports = Connection;
