const architect = require('../architect');
const Network = require('../network');
const Window = require("../../util/window");
const Rate = require("../../methods/rate");


/**
 * This function will get the value from the fieldName, if Present, otherwise returns the defaultValue
 * @param {Object} opt
 * @param {String} fieldName
 * @param {number | boolean | number[]} defaultValue
 * @return {Number | number[] | boolean} the value of the fileName if Present, otherwise the defaultValue
 */
function getOption(opt, fieldName, defaultValue) {
  if (typeof opt === 'undefined') {
    return defaultValue;
  }
  return (typeof opt[fieldName] !== 'undefined') ? opt[fieldName] : defaultValue;
}

/**
* Creates a DQN network
*
* Used to do reinforcement learning
*
* @alpha
*
* @constructs DQN
*
* @param {int} numActions Maximum number of actions the agent can do,
* @param {int} numStates Length of the state array
* @param {Object} options Options object
 *
* @todo Allow underlying Network to have arbitrary layer structure
* @todo Add test & custom network input / output size validation
*/
function DQN(numActions, numStates, options) {
  // Network Sizing
  this.numActions = numActions;
  this.hiddenNeurons = getOption(options, 'hiddenNeurons', [10]);
  this.network = getOption(options, 'network', new architect.Perceptron(numStates, ...this.hiddenNeurons, numActions));

  // Network & state memory
  this.reward = null;
  this.state = null;
  this.nextState = null;
  this.action = null;

  // Learning and update
  this.learningRate = getOption(options, 'learningRate', 0.1); // AKA alpha value function learning rate
  this.learningRateDecay = getOption(options, 'learningRateDecay', 0.99); // AKA alpha value function learning rate
  this.learningRateMin = getOption(options, 'learningRateMin', 0.01); // AKA alpha value function learning rate
  this.loss = 0;
  this.tderrorClamp = getOption(options, 'tderrorClamp', 1);
  this.isTraining = getOption(options, 'isTraining', true);

  // Experience Replay
  let experienceSize = getOption(options, 'experience_size', 50000); // size of experience replay
  this.experience = new Window(experienceSize); // experience
  this.learningStepsPerIteration = getOption(options, 'learning_steps_per_iteration', 20); // number of time steps before we add another experience to replay memory
  this.timeStep = 0;

  // Exploration / Exploitation management
  this.explore = getOption(options, 'explore', 0.05); // AKA epsilon for epsilon-greedy policy
  this.exploreDecay = getOption(options, 'exploreDecay', 0.99); // AKA epsilon for epsilon-greedy policy
  this.exploreMin = getOption(options, 'exploreMin', 0); // AKA epsilon for epsilon-greedy policy

  // Reward calculation
  this.gamma = getOption(options, 'gamma', 0.1); // future reward discount factor
}

DQN.prototype = {
  /**
   * Save function
   *
   * @function toJSON
   * @memberof DQN
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
   * @function act
   * @memberof DQN
   *
   * @param {number[]} state current state (float arr with values between 0 and 1)
   * @returns {number} The action which the DQN would take at this state (represented by an index)
   *
   * @todo Add ability to select strategies
   * @todo Add Thompson Sampling strategy
   */
  act: function (state) {
    // epsilon greedy strategy | explore > random = explore; else exploit
    const action = (Math.max(this.exploreMin, Rate.EXP(this.explore, this.timeStep, {gamma: this.exploreDecay})) > Math.random())
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
   * @function learn
   * @memberof DQN
   *
   * @param {number} newReward the current reward, the agent receives from the environment
   * @param {boolean} isFinalState Does the game ends at this state?
   * @returns {number} the loss value
   *
   * @todo Add prioritized experience replay
   * @todo Add hindsight experience replay
   */
  learn: function(newReward, isFinalState = false) {
    // Update Q function | temporal difference method currently hardcoded
    if (this.reward != null && this.isTraining) {
      // Learn from current estimated reward to understand how wrong agent is
      this.loss = this.study(this.state, this.action, this.reward, this.nextState, isFinalState);

      // Too random, should pick experiences by their loss value
      this.experience.add([this.state, this.action, this.reward, this.nextState, isFinalState, this.loss]);

      for (let i = 0; i < this.learningStepsPerIteration; i++) {
        this.study(...this.experience.pickRandom());
      }
    }
    this.timeStep++;
    this.reward = newReward;
    return this.loss;
  },

  /**
   * This method learns from an specified experience / action-state transition.
   *
   * @function study
   * @memberof DQN
   *
   * @param {number[]} state current state
   * @param {number} action action taken in current state
   * @param {number} reward reward received for the action in the current state
   * @param {number[]} nextState the state which follows the current state with the action taken
   * @param {boolean} isFinalState Does the game ends at this state?
   * @returns {number} TDError Roughly, an experiential measure of surprise / insight for the network at this state-action.
   *
   * @todo Add dynamic loss functions & clamps, including Huber Loss
   * @todo Add target network to increase reliability
   * @todo Consider not using a target network: https://www.ijcai.org/proceedings/2019/0379.pdf
   */
  study: function(state, action, reward, nextState, isFinalState) {
    // Compute target Q value, called without traces so it won't affect backprop
    const nextActions = this.network.activate(nextState, {no_trace: true});

    // Q(s,a) = r + gamma * max_a' Q(s',a')
    let normalizedReward = (1 + reward) / 2;
    let targetQValue;
    targetQValue = isFinalState
      ? normalizedReward
      : normalizedReward + this.gamma * nextActions[this.getMaxValueIndex(nextActions)];

    // Predicted current reward | called with traces for backprop later
    const predictedReward = this.network.activate(state);

    let tdError = predictedReward[action] - targetQValue;

    // Clamp error for robustness
    if (Math.abs(tdError) > this.tderrorClamp) {
      tdError = tdError > this.tderrorClamp ? this.tderrorClamp : -this.tderrorClamp;
    }

    // Backpropagation using temporal difference error
    predictedReward[action] = targetQValue;
    this.network.propagate(Math.max(this.learningRateMin, Rate.EXP(this.learningRate, this.timeStep, {gamma: this.learningRateDecay})), 0, true, predictedReward);
    return tdError;
  },

  /**
   * This method returns the index of the element with the highest value
   *
   * @function getMaxValueIndex
   * @memberof DQN
   *
   * @param {number[]} arr the input array
   * @returns {number} the index which the highest value
   *
   * @todo Create unit test
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
  }
};

/**
 * Loads function
 *
 * @function fromJSON
 * @memberof DQN
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
