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

  /**
   * This method creates a mini batch of buffered experiences.
   * Higher loss values --> higher probability
   *
   * @param size the size of the minibatch.
   * @returns {Experience[]} mini batch chosen with PER
   *
   * @todo Create unit test
   */
  getMiniBatchWithPER(size) {
    //Size can't be bigger than this.buffer.length
    size = Math.min(size, this.buffer.length);
    if (size === this.buffer.length) {
      return this.buffer;
    }

    let bufferCopy = [...this.buffer];
    let batch = [];

    bufferCopy = ReplayBuffer.sortByLoss(bufferCopy);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < bufferCopy.length; j++) {
        if (Math.random() < 1 / Math.pow(2, j + 1)) { // 1/2, 1/4, 1/8, 1/16, ...
          batch.push(bufferCopy.splice(j, 1));
          break;
        }
      }
    }
    return batch;
  },
};

/**
 * Sorts the buffer descending.
 *
 * @param {Experience[]} buffer input buffer (unsorted)
 * @returns {Experience[]} descending sorted buffer
 */
ReplayBuffer.sortByLoss = function(buffer) {
  return buffer.sort((a, b) => b.loss - a.loss);
};

module.exports = ReplayBuffer;
