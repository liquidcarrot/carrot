const architect = require('../architect');

/**
 *
 * @param {int} numActions maximum number of actions the agent can do
 * @param {int} numStates length of the state array
 * @param {Object} opt array, of user-specific options
 */
function DQN(numActions, numStates, opt) {
  this.numActions = numActions;
  this.gamma = getopt(opt, 'gamma', 0.3); // future reward discount factor
  this.epsilon = getopt(opt, 'epsilon', 0.1); // for epsilon-greedy policy
  this.learningRate = getopt(opt, 'learningRate', 0.01); // value function learning rate

  // number of time steps before we add another experience to replay memory
  this.experienceAddEvery = getopt(opt, 'experience_add_every', 5);
  this.experienceSize = getopt(opt, 'experience_size', 5000); // size of experience replay
  this.learningStepsPerIteration = getopt(opt, 'learning_steps_per_iteration', 50);
  this.tderror_clamp = getopt(opt, 'tderror_clamp', 1.0);
  this.hiddenNeurons = getopt(opt, 'hidden', [10]);

  this.network = new architect.Perceptron(numStates, this.hiddenNeurons, numActions);

  this.experience = []; // experience
  this.experienceIndex = 0; // where to insert

  this.reward = null;
  this.state = null;
  this.nextState = null;
  this.action = null;
  this.nextAction = null;
  this.loss = 0;
}

DQN.prototype = {
  toJSON: function() {
    // save function
    return this.network.toJSON();
  },
  fromJSON: function(json) {
    // load function
    this.network = Network.fromJSON(json);
    this.numActions = this.network.output_size;
  },
  act: function(state) {
    // epsilon greedy strategy
    let action;
    if (this.epsilon < Math.random()) {
      action = Math.floor(Math.random() * this.numActions);
    } else {
      action = this.getMaxValueIndex(this.network.activate(state));
    }

    // shift state memory
    this.state = this.nextState;
    this.action = this.nextAction;
    this.nextState = state;
    this.nextAction = action;

    return action;
  },
  learn: function(newReward) {
    // Update Q function | temporal difference method currently hardcoded
    if (this.reward != null && this.learningRate > 0) {
      // Learn from current estimated reward to understand how wrong agent is
      this.loss = this.learnQ(this.state, this.action, this.reward, this.nextState);

      // Too random, should pick experiences by their loss value
      if (this.experienceIndex % this.experienceAddEvery === 0) {
        this.experience[this.experienceIndex] = [this.state, this.action, this.reward, this.nextState, this.loss];
        this.experienceIndex++;

        // roll over when we reach the experience_limit
        this.experienceIndex = (this.experienceIndex > this.experienceSize) ? 0 : this.experienceIndex;
      }
      this.experienceIndex++;

      this.learnFromExperience();
    }

    this.reward = newReward; // store for next update
    return this.loss;
  },
  learnFromExperience: function() {
    // Much improvement required
    // TODO PER
    for (let i = 0; i < this.learningStepsPerIteration; i++) {
      for (let j = 0; j < this.experienceSize; j++) {
        const exp = this.experience[Math.floor(Math.random() * this.experienceSize)];
        if (exp !== undefined) {
          this.learnQ(...exp);
        }
      }
    }
  },
  learnQ: function(state, action, reward, nextState) {
    // Compute target Q value, called without traces so it won't affect backprop
    const nextActions = this.network.activate(nextState, {no_trace: true});

    // Q(s,a) = r + gamma * max_a' Q(s',a')
    const targetReward = reward + this.gamma * nextActions[this.getMaxValueIndex(nextActions)];

    // Predicted current reward | called with traces for backprop later
    const predictedReward = this.network.activate(state);

    const tdError = predictedReward[action] - targetReward;

    // Clamp error for robustness | To-Do: huber loss
    // tdError = (Math.abs(tdError) <= clamp) ? tdError : (tdError > clamp) ? clamp : -clamp
    // Huber loss

    // TO-DO: Add target network to increase reliability

    // Backpropagation using temporal difference error
    const outputNodesAlpha = new Float64Array(this.numActions);
    outputNodesAlpha[action] = targetReward;
    this.network.propagate(this.learningRate, 0, true, outputNodesAlpha);

    return tdError;
  },
  getMaxValueIndex: function(arr) {
    let index = 0;
    let maxValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
        index = i;
      }
    }
    return index;
  },
};

/**
 * This function will get the value from the fieldName, if Present, otherwise returns the defaultValue
 * @param {Array} opt
 * @param {String} fieldName
 * @param {number} defaultValue
 * @return {Number | number[]} the value of the fileName if Present, otherwise the defaultValue
 */
function getopt(opt, fieldName, defaultValue) {
  if (typeof opt === 'undefined') {
    return defaultValue;
  }
  return (typeof opt[fieldName] !== 'undefined') ? opt[fieldName] : defaultValue;
}

module.exports = DQN;
