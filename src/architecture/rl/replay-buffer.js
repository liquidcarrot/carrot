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

  /**
   * Get random mini batch.
   *
   * @param {number} size the size of the minibatch.
   *
   * @returns {Experience[]} a batch of Experiences to train from.
   */
  getRandomMiniBatch: function(size) {
    size = Math.min(size, this.buffer.length);
    if (size === this.buffer.length) {
      return this.buffer;
    }
    let bufferCopy = [...this.buffer];
    let batch = [];

    for (let i = 0; i < size; i++) {
      batch.push(...bufferCopy.splice(Math.floor(Math.random() * bufferCopy.length), 1));
    }
    return batch;
  },
};

module.exports = ReplayBuffer;
