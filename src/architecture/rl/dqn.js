const architect = require('../architect');
const Window = require("../../util/window");
const Rate = require("../../methods/rate");

/**
 *
 * @param {int} numActions maximum number of actions the agent can do
 * @param {int} numStates length of the state array
 * @param {Object} opt array, of user-specific options
 */
function DQN(numActions, numStates, opt) {
  this.numActions = numActions;
  this.gamma = getopt(opt, 'gamma', 0.1); // future reward discount factor
  this.epsilon = getopt(opt, 'epsilon', 0.05); // for epsilon-greedy policy
  this.epsilonDecay = getopt(opt, 'epsilonDecay', 0.99); // for epsilon-greedy policy
  this.epsilonMin = getopt(opt, 'epsilonMin', 0.01); // for epsilon-greedy policy
  this.learningRate = getopt(opt, 'learningRate', 0.05); // value function learning rate
  this.learningRateDecay = getopt(opt, 'learningRateDecay', 1); // value function learning rate
  this.learningRateMin = getopt(opt, 'learningRateMin', 0.01); // value function learning rate

  this.isTraining = getopt(opt, 'isTraining', true);

  // number of time steps before we add another experience to replay memory
  this.experienceSize = getopt(opt, 'experience_size', 5000); // size of experience replay
  this.learningStepsPerIteration = getopt(opt, 'learning_steps_per_iteration', 20);
  this.tderrorClamp = getopt(opt, 'tderrorClamp', 1);
  this.hiddenNeurons = getopt(opt, 'hidden', [200]);

  this.network = new architect.Perceptron(numStates, ...this.hiddenNeurons, numActions);

  this.experience = new Window(this.experienceSize, true); // experience

  this.reward = null;
  this.state = null;
  this.nextState = null;
  this.action = null;
  this.nextAction = null;
  this.loss = 0;
  this.t = 0;
}

DQN.prototype = {
  toJSON: function () {
    // save function
    return this.network.toJSON();
  },
  fromJSON: function (json) {
    // load function
    this.network = Network.fromJSON(json);
    this.numActions = this.network.output_size;
  },
  act: function (state) {
    // epsilon greedy strategy
    let action;
    if (Math.max(this.epsilonMin, Rate.EXP(this.epsilon, this.t, {gamma: this.epsilonDecay})) < Math.random()) {
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
  learn: function (newReward) {
    // Update Q function | temporal difference method currently hardcoded
    if (this.reward != null && this.isTraining) {
      // Learn from current estimated reward to understand how wrong agent is
      this.loss = this.learnQ(this.state, this.action, this.reward, this.nextState);

      // Too random, should pick experiences by their loss value
      this.experience.add([this.state, this.action, this.reward, this.nextState, this.loss]);

      for (let i = 0; i < this.learningStepsPerIteration; i++) {
        this.learnQ(...this.experience.pickRandom());
      }
    }
    this.t++;
    this.reward = newReward;
    return this.loss;
  },
  learnQ: function (state, action, reward, nextState) {
    // Compute target Q value, called without traces so it won't affect backprop
    const nextActions = this.network.activate(nextState, {no_trace: true});

    // Q(s,a) = r + gamma * max_a' Q(s',a')
    const targetReward = reward + this.gamma * nextActions[this.getMaxValueIndex(nextActions)];

    // Predicted current reward | called with traces for backprop later
    const predictedReward = this.network.activate(state);

    let tdError = predictedReward[action] - targetReward;

    // Clamp error for robustness | To-Do: huber loss
    if (Math.abs(tdError) > this.tderrorClamp) {
      tdError = tdError > this.tderrorClamp ? this.tderrorClamp : -this.tderrorClamp;
    }
    // Huber loss

    // TO-DO: Add target network to increase reliability
    // Backpropagation using temporal difference error
    const outputNodesAlpha = new Float64Array(this.numActions);
    outputNodesAlpha[action] = targetReward;
    this.network.propagate(Math.max(this.learningRateMin, Rate.EXP(this.learningRate, this.t, {gamma: this.learningRateDecay})), 0, true, outputNodesAlpha);
    return tdError;
  },
  getMaxValueIndex: function (arr) {
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
  setTraining: function (val) {
    this.isTraining = val;
  }
};


/**
 * This function will get the value from the fieldName, if Present, otherwise returns the defaultValue
 * @param {Object} opt
 * @param {String} fieldName
 * @param {number|boolean} defaultValue
 * @return {Number | number[]} the value of the fileName if Present, otherwise the defaultValue
 */
function getopt(opt, fieldName, defaultValue) {
  if (typeof opt === 'undefined') {
    return defaultValue;
  }
  return (typeof opt[fieldName] !== 'undefined') ? opt[fieldName] : defaultValue;
}

module.exports = DQN;
