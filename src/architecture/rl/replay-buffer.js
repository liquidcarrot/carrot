const Experience = require('./experience');
const Utils = require('../../util/utils');

/**
 * Creates a replay buffer with a maximum size of experience entries.
 *
 * @param {int} maxSize maximum number of experiences
 * @param {number} noiseRate this variable will add a noise to the PER, so there is more randomness
 * @constructor
 */
function ReplayBuffer(maxSize, noiseRate) {
  this.buffer = [];
  this.maxSize = maxSize;
  this.sumOfAbsLosses = 0; //used for PER
  this.noiseRate = noiseRate || 0;
}

ReplayBuffer.prototype = {
  /**
   * Save function
   * @return {{
   *   buffer: Experience[],
   *   maxSize: int,
   *   sumOfAbsLosses: number,
   *   noiseRate: number
   * }}
   */
  toJSON: function() {
    let json = {};
    json.buffer = this.buffer;
    json.maxSize = this.maxSize;
    json.sumOfAbsLosses = this.sumOfAbsLosses;
    json.noiseRate = this.noiseRate;
    return json;
  },

  /**
   * Adds an experience entry to the buffer.
   *
   * @param {Experience} experience the experience to add
   */
  add: function(experience) {
    if (this.buffer.length >= this.maxSize) {
      this.sumOfAbsLosses -= this.buffer.shift().loss; // Buffer is full --> remove first entry
    }
    this.buffer.push(experience);
    this.sumOfAbsLosses += Math.abs(experience.loss);
  },

  /**
   * Get a random mini batch of given size.
   *
   * @param {int} size the size of the MiniBatch.
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
   * @param {int} batchSize the size of the MiniBatch.
   * @returns {Experience[]} mini batch chosen with PER
   *
   * @todo Create unit test
   * @todo there is a bug in minibatch creation
   */
  getMiniBatchWithPER(batchSize) {
    if (batchSize >= this.buffer.length) {
      //If MiniBatch batchSize is bigger than this.buffer, then we return the full buffer
      return this.buffer;
    }

    let miniBatch = [];
    let bufferCopy = this.buffer.slice(0);
    let sumOfAbsLossesCopy = this.sumOfAbsLosses;

    for (let i = 0; miniBatch.length < batchSize; i++) {
      for (let j = 0; j < bufferCopy.length; j++) {
        if (Math.random() * (1 + this.noiseRate) - this.noiseRate / 2 <= Math.abs(bufferCopy[j].loss) / sumOfAbsLossesCopy) {
          let exp = bufferCopy.splice(j, 1)[0];
          miniBatch.push(exp);
          sumOfAbsLossesCopy -= Math.abs(exp.loss);
          break;
        }
      }
    }

    return miniBatch;
  },
};

/**
 * Load function
 *
 * @param {{
 *   buffer: Experience[],
 *   maxSize: int,
 *   sumOfAbsLosses: number,
 *   noiseRate: number
 * }} json
 */
ReplayBuffer.fromJSON = function(json) {
  let replayBuffer = new ReplayBuffer(json.maxSize, json.noiseRate);
  replayBuffer.buffer = json.buffer;
  replayBuffer.sumOfAbsLosses = json.sumOfAbsLosses;
  return replayBuffer;
};

module.exports = ReplayBuffer;
