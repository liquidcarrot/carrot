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
    if (experience.state === undefined) {
      return;
    }
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
   *       And remove the while loop at the end
   */
  getMiniBatchWithPER(size) {
    //Size can't be bigger than this.buffer.length
    if (size >= this.buffer.length) {
      return this.buffer;
    }

    let miniBatch = [];
    let bufferSorted = ReplayBuffer.sortByAbsLoss(this.buffer.slice(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < bufferSorted.length; j++) {
        //For bufferSorted.length is equal to infinity
        if (Math.random() <= 1 / Math.pow(2, j + 1)) { // 1/2, 1/4, 1/8, 1/16, ...
          miniBatch.push(bufferSorted.splice(j, 1));
          break;
        }
      }
    }
    while (miniBatch.length < size) {
      //Appending elements from the front of the buffer until the MiniBatch is full
      miniBatch.push(bufferSorted.slice(0, 1)); //This should be removed
    }
    return miniBatch;
  },
};

/**
 * Sorts the buffer descending by the absolute loss values.
 *
 * @param {Experience[]} buffer unsorted input buffer
 * @returns {Experience[]} descending sorted buffer
 */
ReplayBuffer.sortByAbsLoss = function(buffer) {
  return buffer.sort((a, b) => Math.abs(b.loss) - Math.abs(a.loss));
};

module.exports = ReplayBuffer;
