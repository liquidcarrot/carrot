/**
* Creates a random class
*
* @constructs Random
*
* @param {number} something - Random number
*
* @prop {string} thing - A String
*/
function Random(something) {
  this.thing = "Str"
}

/**
* @namespace
*/
Random.prototype = {
  /**
  * Returns a number.
  *
  * @todo Do more stuff
  *
  * @param {object} arg1 - An argument
  *
  * @returns {number} Returns a random number
  */
  verb: function(arg1) {
    return Math.random()
  }
}

/**
* Creamy creamy queso for your tacos.
*
* @param {string} arg2 - Description thingy
*
* @returns {string} Returns queso string.
*/
Random.do = function(arg2) {
  return "Cool Queso"
}

module.exports = Random;