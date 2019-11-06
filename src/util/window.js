/**
 * A Window is just an array with an fixed max-size.
 * It deletes old entries, to create space for new ones.
 *
 * @param size maximum size
 *
 * TODO: Should be replaced with a replay buffer
 * @deprecated
 * @constructor
 */
function Window(size) {
  this.v = [];
  this.size = typeof (size) === 'undefined' ? 100 : size;
}

Window.prototype = {
  /**
   * Adds an element to the array, and if max-size is reached the first element will be deleted.
   * @param elem new element which gets added
   */
  add: function(elem) {
    this.v.push(elem);
    if (this.v.length > this.size) {
      this.v.shift();
    }
  },

  /**
   * This method returns a random entry from the array.
   *
   * @returns {*}
   */
  pickRandom: function () {
    let x = this.v[Math.floor(Math.random() * this.v.length)];
    return x === undefined ? this.v[0] : x;
  },

  /**
   * This method resets the array.
   */
  reset: function () {
    this.v = [];
  }
};

module.exports = Window;
