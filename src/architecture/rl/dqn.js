const architect = require('../architect');
const Network = require('../network');
const Window = require("../../util/window");
const Rate = require("../../methods/rate");


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

/**
 *
 * @param {int} numActions maximum number of actions the agent can do
 * @param {int} numStates length of the state array
 * @param {Object} opt array, of user-specific options
 */
function DQN(numActions, numStates, opt) {
  this.numActions = numActions;
  this.gamma = getopt(opt, 'gamma', 0.1); // future reward discount factor
  this.explore = getopt(opt, 'explore', 0.05); // for epsilon-greedy policy
  this.exploreDecay = getopt(opt, 'exploreDecay', 0.99); // for epsilon-greedy policy
  this.exploreMin = getopt(opt, 'exploreMin', 0); // for epsilon-greedy policy
  this.learningRate = getopt(opt, 'learningRate', 0.1); // value function learning rate
  this.learningRateDecay = getopt(opt, 'learningRateDecay', 0.99); // value function learning rate
  this.learningRateMin = getopt(opt, 'learningRateMin', 0.01); // value function learning rate

  this.isTraining = getopt(opt, 'isTraining', true);

  // number of time steps before we add another experience to replay memory
  let experienceSize = getopt(opt, 'experience_size', 50000); // size of experience replay
  this.learningStepsPerIteration = getopt(opt, 'learning_steps_per_iteration', 20);
  this.tderrorClamp = getopt(opt, 'tderrorClamp', 1);
  this.hiddenNeurons = getopt(opt, 'hidden', [10]);

  this.network = new architect.Perceptron(numStates, ...this.hiddenNeurons, numActions);

  this.experience = new Window(experienceSize, true); // experience

  this.reward = null;
  this.state = null;
  this.nextState = null;
  this.action = null;
  this.nextAction = null;
  this.loss = 0;
  this.t = 0;
}

DQN.prototype = {
  /**
   * Save function
   *
   * @return {JSON} JSON String which represents the current DQN agent
   */
  toJSON: function () {
    let json = {};
    json.net = this.network.toJSON();
    json.gamma = this.gamma;
    json.explore = this.explore;
    json.exploreDecay = this.exploreDecay;
    json.exploreMin = this.exploreMin;
    json.learningRate = this.learningRate;
    json.learningRateDecay = this.learningRateDecay;
    json.learningRateMin = this.learningRateMin;
    json.isTraining = this.isTraining;
    json.experience = this.experience;
    return json;
  },

  /**
   * This method gets the current state as input, and decides which action should be taken.
   *
   * Decision based on exploration rate set by `.explore`.
   *
   * Infinite explore = Network always explores states randomly.
   * Zero explore = network always picks the action it thinks best from known states.
   *
   * Best: High explore at first then less explore as network is more experienced.
   *
   * @param {number[]} state current state (float arr with values between 0 and 1)
   * @returns {number} The action which the DQN would take at this state (represented by an index)
   */
  act: function (state) {
    // epsilon greedy strategy | explore > random = explore; else exploit
    const action = (Math.max(this.exploreMin, Rate.EXP(this.explore, this.t, {gamma: this.exploreDecay})) > Math.random())
      ? Math.floor(Math.random() * this.numActions) // random "explore" action
      : this.getMaxValueIndex(this.network.activate(state)); // deliberate "exploit" action

    // shift state memory
    this.state = this.nextState;
    this.action = this.nextAction;
    this.nextState = state;
    this.nextAction = action;

    return action;
  },

  /**
   * This method trains the Q-Network.
   *
   * @param {number} newReward the current reward, the agent receives from the environment
   * @returns {number} the loss value
   */
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

  /**
   * This method learns from an specified experience.
   *
   * @param {number[]} state current state
   * @param {number} action action taken in current state
   * @param {number} reward reward received for the action in the current state
   * @param {number[]} nextState the state which follows the current state with the action taken
   * @returns {number} TDError
   */
  learnQ: function (state, action, reward, nextState) {
    // Compute target Q value, called without traces so it won't affect backprop
    const nextActions = this.network.activate(nextState, {no_trace: true});

    // Q(s,a) = r + gamma * max_a' Q(s',a')
    const targetQValue = (1 + reward) / 2 + this.gamma * nextActions[this.getMaxValueIndex(nextActions)];

    // Predicted current reward | called with traces for backprop later
    const predictedReward = this.network.activate(state);

    let tdError = predictedReward[action] - targetQValue;

    // Clamp error for robustness | ToDo: huber loss
    if (Math.abs(tdError) > this.tderrorClamp) {
      tdError = tdError > this.tderrorClamp ? this.tderrorClamp : -this.tderrorClamp;
    }

    // Backpropagation using temporal difference error
    predictedReward[action] = targetQValue;
    this.network.propagate(Math.max(this.learningRateMin, Rate.EXP(this.learningRate, this.t, {gamma: this.learningRateDecay})), 0, true, predictedReward);
    return tdError;
  },

  /**
   * This method returns the index of the element with the highest value
   *
   * TODO create test method
   *
   * @param {number[]} arr the input array
   * @returns {number} the index which the highest value
   */
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

  /**
   * Setter for variable "isTraining"
   *
   * @param val new value
   */
  setTraining: function (val) {
    this.isTraining = val;
  }
};

/**
 * Loads function
 *
 * @param {JSON} json  JSON String
 * @return {DQN} Agent with the specs from the json
 */
DQN.fromJSON = function (json) {
  let network = Network.fromJSON(json);
  let agent = new DQN(network.input_size, network.output_size, {});

  agent.gamma = json.gamma;
  agent.explore = json.explore;
  agent.exploreDecay = json.exploreDecay;
  agent.exploreMin = json.exploreMin;
  agent.learningRate = json.learningRate;
  agent.learningRateDecay = json.learningRateDecay;
  agent.learningRateMin = json.learningRateMin;
  agent.isTraining = json.isTraining;
  agent.experience = json.experience;

  return agent;
};

module.exports = DQN;
