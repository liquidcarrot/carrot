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
    if (size >= this.buffer.length) {
      //If MiniBatch size is bigger than this.buffer, then we return the full buffer
      return this.buffer;
    }

    let bufferCopy = this.buffer.slice(0);
    let miniBatch = [];

    for (let i = 0; i < size; i++) {
      //Add an random experience to the batch and remove it from the bufferCopy
      miniBatch.push(bufferCopy.splice(Utils.randomInt(0, bufferCopy.length - 1), 1)[0]);
    }
    return miniBatch;
  },

  /**
   * This method creates a mini batch of buffered experiences.
   * Higher loss values --> higher probability
   *
   * @param {int} size the size of the minibatch.
   * @returns {Experience[]} mini batch chosen with PER
   *
   * @todo Create unit test
   */
  getMiniBatchWithPER(size) {
    if (size >= this.buffer.length) {
      //If MiniBatch size is bigger than this.buffer, then we return the full buffer
      return this.buffer;
    }

    let sumOfAbsLosses = 0;
    for (let i = 0; i < this.buffer.length; i++) {
      sumOfAbsLosses += Math.abs(this.buffer[i].loss);
    }

    let miniBatch = [];
    let bufferCopy = this.buffer.slice(0);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < bufferCopy.length; j++) {
        if (Math.random() <= Math.abs(bufferCopy[j].loss) / sumOfAbsLosses) {
          let exp = bufferCopy.splice(j, 1)[0];
          miniBatch.push(exp);
          sumOfAbsLosses -= Math.abs(exp.loss);
          break;
        }
      }
    }

    return miniBatch;
  },
};

module.exports = ReplayBuffer;
