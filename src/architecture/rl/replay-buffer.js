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
   * Get a random mini batch of given size.
   *
   * @param {number} size the size of the minibatch.
   *
   * @returns {Experience[]} a batch of Experiences to train from.
   */
  getRandomMiniBatch: function(size) {
    //Size can't be bigger than this.buffer.length
    size = Math.min(size, this.buffer.length);
    if (size === this.buffer.length) {
      return this.buffer;
    }

    let bufferCopy = [...this.buffer];
    let batch = [];

    for (let i = 0; i < size; i++) {
      //Add an random experience to the batch and remove it from the bufferCopy
      batch.push(bufferCopy.splice(Math.floor(Math.random() * bufferCopy.length), 1)[0]);
    }
    return batch;
  },
};

module.exports = ReplayBuffer;
