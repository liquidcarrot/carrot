const Experience = require('./experience');
const Utils = require('../../util/utils');

/**
 * Creates a replay buffer with a maximum size of experience entries.
 *
 * @param {int} maxSize maximum number of experiences
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
      this.buffer.shift(); // Buffer is full --> remove first entry
    }
    this.buffer.push(experience);
  },

  /**
   * Get a random mini batch of given size.
   *
   * @param {int} size the size of the minibatch.
   * @returns {Experience[]} a batch of Experiences to train from.
   */
  getRandomMiniBatch: function(size) {
    //Size can't be bigger than this.buffer.length
    if (size >= this.buffer.length) {
      return this.buffer;
    }

    let bufferCopy = this.buffer.slice(0);
    let batch = [];

    for (let i = 0; i < size; i++) {
      //Add an random experience to the batch and remove it from the bufferCopy
      batch.push(bufferCopy.splice(Utils.randomInt(0, bufferCopy.length - 1), 1)[0]);
    }
    return batch;
  },

  /**
   * This method creates a mini batch of buffered experiences.
   * Higher loss values --> higher probability
   *
   * @param {int} size the size of the minibatch.
   * @returns {Experience[]} mini batch chosen with PER
   *
   * @todo Create unit test
   * @todo consider using another series for probability distribution
   *       because sometimes the length of the MiniBatch is not equal to the size given as param.
   *       Look at: https://www.freecodecamp.org/news/improvements-in-deep-q-learning-dueling-double-dqn-prioritized-experience-replay-and-fixed-58b130cc5682/
   */
  getMiniBatchWithPER(size) {
    //Size can't be bigger than this.buffer.length
    if (size >= this.buffer.length) {
      return this.buffer;
    }

    let bufferCopy = this.buffer.slice(0);
    let batch = [];

    bufferCopy = ReplayBuffer.sortByLoss(bufferCopy);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < bufferCopy.length; j++) {
        if (Math.random() <= 1 / Math.pow(2, j + 1)) { // 1/2, 1/4, 1/8, 1/16, ...
          let experience = bufferCopy.splice(j, 1);
          if (experience.state !== undefined) {
            batch.push(experience);
          }
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
 * @param {Experience[]} buffer unsorted input buffer
 * @returns {Experience[]} descending sorted buffer
 */
ReplayBuffer.sortByLoss = function(buffer) {
  return buffer.sort((a, b) => b.loss - a.loss);
};

module.exports = ReplayBuffer;
