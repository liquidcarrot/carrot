const Experience = require('./experience');

/**
 * Creates a replay buffer with a maximum size of experience entries.
 *
 * @param maxSize maximum number of experiences
 * @constructor
 */
function ReplayBuffer(maxSize) {
  this.buffer = [];
  this.maxSize = maxSize;
}

ReplayBuffer.prototype = {
  /**
   * Adds an experience entry to the buffer.
   *
   * @param {Experience} experience the experience to add
   */
  add: function(experience) {
    if (this.buffer.length >= this.maxSize) {
      this.buffer.shift();
    }
    this.buffer.push(experience);
  },

  /**
   * Returns a random entry from the buffer. Used for learning without PER.
   *
   * @returns {Experience} the randome experience
   */
  pickRandom: function() {
    return this.buffer[Math.floor(Math.random() * this.buffer.length)];
  },
};

module.exports = ReplayBuffer;
