const architect = require('../architect');
const Network = require('../network');
const ReplayBuffer = require('./replay-buffer');
const Experience = require('./experience');
const Utils = require('../../util/utils');
const Rate = require("../../methods/rate");

/**
 * Creates a DQN network
 *
 * Used to do reinforcement learning with an DQN Agent
 *
 * @beta
 *
 * @constructs DQN
 *
 * @param {int} numActions Maximum number of actions the agent can do,
 * @param {int} numStates Length of the state array
 * @param {{
 *   hiddenNeurons: {int[]},
 *   hiddenNeuronsB: {int[]},
 *   network: {Network},
 *   networkB: {Network},
 *   learningRate: {number},
 *   learningRateDecay: {number},
 *   learningRateMin: {number},
 *   learningRateB: {number},
 *   learningRateDecayB: {number},
 *   learningRateMinB: {number},
 *   explore: {number},
 *   exploreDecay: {number},
 *   exploreMin: {number},
 *   tdErrorClamp: {number},
 *   isTraining: {boolean},
 *   isDoubleDQN: {boolean},
 *   isUsingPER: {boolean},
 *   experienceSize: {int},
 *   learningStepsPerIteration: {int},
 *   gamma: {number}
 * }} options JSON object which contains all custom options
 *
 * @todo Allow underlying Network to have arbitrary layer structure
 * @todo Add test & custom network input / output size validation
 * @todo Maybe automatically suggest default values for the num of states and actions
 * @todo Allow Liquid networks trained with NEAT
 * @todo consider default value of isDoubleDQN to be true
*/
function DQN(numStates, numActions, options) {
  // Training specific variables
  this.tdErrorClamp = Utils.RL.getOption(options, 'tdErrorClamp', 1); // td error clamp for training stability
  this.isTraining = Utils.RL.getOption(options, 'isTraining', true); // set training mode on and off
  this.isDoubleDQN = Utils.RL.getOption(options, 'isDoubleDQN', false); // using Double-DQN
  this.isUsingPER = Utils.RL.getOption(options, 'isUsingPER', true); // using prioritized experience replay
  this.gamma = Utils.RL.getOption(options, 'gamma', 0.7); // future reward discount factor

  // Network creation
  this.numActions = numActions;
  this.hiddenNeurons = Utils.RL.getOption(options, 'hiddenNeurons', [10]);
  this.hiddenNeuronsB = Utils.RL.getOption(options, 'hiddenNeuronsB', this.hiddenNeurons);
  this.network = Utils.RL.getOption(options, 'network', new architect.Perceptron(numStates, ...this.hiddenNeurons, numActions));
  this.networkB = this.isDoubleDQN
    ? Utils.RL.getOption(options, 'networkB', new architect.Perceptron(numStates, ...this.hiddenNeuronsB, numActions))
    : null;

  // Learning rate
  this.learningRate = Utils.RL.getOption(options, 'learningRate', 0.1); // AKA alpha value function learning rate
  this.learningRateDecay = Utils.RL.getOption(options, 'learningRateDecay', 0.99); // AKA alpha value function learning rate
  this.learningRateMin = Utils.RL.getOption(options, 'learningRateMin', 0.01); // AKA alpha value function learning rate
  if (this.isDoubleDQN) {
    this.learningRateB = Utils.RL.getOption(options, 'learningRateB', this.learningRate); // AKA alpha value function learning rate
    this.learningRateDecayB = Utils.RL.getOption(options, 'learningRateDecayB', this.learningRateDecay); // AKA alpha value function learning rate
    this.learningRateMinB = Utils.RL.getOption(options, 'learningRateMinB', this.learningRateMin); // AKA alpha value function learning rate
  }

  // Experience ("Memory")
  let experienceSize = Utils.RL.getOption(options, 'experienceSize', 50000); // size of experience replay
  this.experience = new ReplayBuffer(experienceSize); // experience
  this.learningStepsPerIteration = Utils.RL.getOption(options, 'learningStepsPerIteration', 20); // number of time steps before we add another experience to replay memory

  // Exploration / Exploitation management
  this.explore = Utils.RL.getOption(options, 'explore', 0.3); // AKA epsilon for epsilon-greedy policy
  this.exploreDecay = Utils.RL.getOption(options, 'exploreDecay', 0.9999); // AKA epsilon for epsilon-greedy policy
  this.exploreMin = Utils.RL.getOption(options, 'exploreMin', 0.01); // AKA epsilon for epsilon-greedy policy

  // Set variables to null | 0
  this.loss = 0;
  this.timeStep = 0;
  this.reward = null;
  this.state = null;
  this.nextState = null;
  this.action = null;
}

DQN.prototype = {
  /**
   * Save function
   *
   * @function toJSON
   * @memberof DQN
   *
   * @return {{
   *   network: {
   *     input:{number},
   *     output:{number},
   *     dropout:{number},
   *     nodes:Array<object>,
   *     connections:Array<object>
   *   },
   *   networkB: {
   *     input:{number},
   *     output:{number},
   *     dropout:{number},
   *     nodes:Array<object>,
   *     connections:Array<object>
   *   },
   *   gamma:{number},
   *   explore:{number},
   *   exploreDecay:{number},
   *   exploreMin:{number},
   *   learningRate:{number},
   *   learningRateDecay:{number},
   *   learningRateMin:{number},
   *   isTraining:{boolean},
   *   isDoubleDQN:{boolean},
   *   experience:{ReplayBuffer}
   * }} json JSON String JSON String which represents this DQN agent
   *
   * @todo Create unit test
   */
  toJSON: function () {
    let json = {};
    json.network = this.network.toJSON();
    json.networkB = this.isDoubleDQN ? this.networkB.toJSON() : null;
    json.gamma = this.gamma;
    json.explore = this.explore;
    json.exploreDecay = this.exploreDecay;
    json.exploreMin = this.exploreMin;
    json.learningRate = this.learningRate;
    json.learningRateDecay = this.learningRateDecay;
    json.learningRateMin = this.learningRateMin;
    json.isTraining = this.isTraining;
    json.isDoubleDQN = this.isDoubleDQN;
    json.experience = this.experience;
    return json;
  },

  /**
   * This method gets the current state as input, and decides which action should be taken.
   *
   * Decision based on exploration rate set by `.explore`.
   *
   * explore ∈ [0,1]
   * explore == 1 --> Network always explores states randomly.
   * explore == 0 --> Network always picks the action it thinks best from known states.
   *
   * Best strategy: High explore at first then less explore as network is more experienced.
   *
   * @function act
   * @memberof DQN
   *
   * @param {number[]} state current state (float arr with values from [0,1])
   * @return {int} The action which the DQN would take at this state; action ∈ [0, this.numActions-1]
   *
   * @todo Add ability to select strategies
   * @todo Add Thompson Sampling strategy
   */
  act: function (state) {
    // epsilon greedy strategy | explore > random ? explore : exploit
    let currentExploreRate = Math.max(this.exploreMin, Rate.EXP(this.explore, this.timeStep, {gamma: this.exploreDecay}));
    let action;
    if (currentExploreRate > Math.random()) {
      //Explore
      action = Utils.randomInt(0, this.numActions - 1);
    } else if (this.isDoubleDQN) {
      // Exploit with Double-DQN
      // Take action which is maximum of both networks by summing them up
      let activation = this.network.activate(state, {no_trace: true});
      let activationB = this.networkB.activate(state, {no_trace: true});
      let sum = activation.map((elem, index) => elem + activationB[index]);
      action = Utils.getMaxValueIndex(sum);
    } else {
      // Exploit
      action = Utils.getMaxValueIndex(this.network.activate(state, {no_trace: true}));
    }

    // keep this in memory for learning
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
   * @param {number} newReward the current reward, the agent receives from the environment; newReward ∈ [-1,1]
   * @param {boolean} isFinalState Does the game ends at this state?
   * @returns {number} the loss value; loss ∈ [-1,1]
   *
   * @todo Add hindsight experience replay
   */
  learn: function(newReward, isFinalState = false) {
    // Normalizing reward:
    // newReward ∈ [-1,1] --> normalizedReward ∈ [0,1]
    const normalizedReward = (1 + newReward) / 2;

    // Update Q function | temporal difference method currently hardcoded
    if (this.reward != null && this.isTraining) {
      let experience = new Experience(this.state, this.action, normalizedReward, this.nextState, isFinalState);
      // Learn from current estimated reward to understand how wrong agent is
      experience.loss = this.study(experience);
      this.loss = experience.loss;

      this.experience.add(experience);

      let miniBatch = this.isUsingPER
        ? this.experience.getMiniBatchWithPER(this.learningStepsPerIteration)
        : this.experience.getRandomMiniBatch(this.learningStepsPerIteration);

      //Sample the mini batch
      for (let i = 0; i < miniBatch.length; i++) {
        this.study(miniBatch[i]);
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
   * @param {Experience} experience the experience to learn from
   * @returns {number} TDError Roughly, an experiential measure of surprise / insight for the network at this state-action; tdError ∈ [-1,1]
   *
   * @todo Add dynamic loss functions & clamps, including Huber Loss
   * @todo Add target network to increase reliability
   * @todo Consider not using a target network: https://www.ijcai.org/proceedings/2019/0379.pdf
   * @todo Consider renaming to sample(experience)
   */
  study: function(experience) {
    let chooseNetwork = !this.isDoubleDQN || Math.random() < 0.5 ? 'A' : 'B';

    // Compute target Q value, called without traces so it won't affect backpropagation later
    let nextActions = !this.isDoubleDQN || chooseNetwork === 'A'
      ? this.network.activate(experience.nextState, {no_trace: true})
      : this.networkB.activate(experience.nextState, {no_trace: true});
    let maxValueIndexNextActions = Utils.getMaxValueIndex(nextActions);

    let targetQValue;
    if (experience.isFinalState) {
      targetQValue = experience.reward;
    } else if (this.isDoubleDQN) {
      //See here: https://bit.ly/2rjp1gS
      targetQValue = experience.reward + this.gamma *
        (chooseNetwork === 'A'
          ? this.networkB.activate(experience.nextState, {no_trace: true})[maxValueIndexNextActions]
          : this.network.activate(experience.nextState, {no_trace: true})[maxValueIndexNextActions]) -
        (chooseNetwork === 'A'
          ? this.network.activate(experience.state, {no_trace: true})[experience.action]
          : this.networkB.activate(experience.state, {no_trace: true})[experience.action]);
    } else {
      // Q(s,a) = r + gamma * max_a' Q(s',a')
      targetQValue = experience.reward + this.gamma * nextActions[maxValueIndexNextActions];
    }

    // Predicted current reward | called with traces for backpropagation later
    let predictedReward;
    predictedReward = !this.isDoubleDQN || chooseNetwork === 'A'
      ? this.network.activate(experience.state)
      : this.networkB.activate(experience.state);

    let tdError = predictedReward[experience.action] - targetQValue;

    // Clamp error for robustness
    if (Math.abs(tdError) > this.tdErrorClamp) {
      tdError = tdError > this.tdErrorClamp ? this.tdErrorClamp : -this.tdErrorClamp;
    }

    // Backpropagation using temporal difference error
    predictedReward[experience.action] = targetQValue;
    if (!this.isDoubleDQN || chooseNetwork === 'A') {
      let currentLearningRate = Math.max(this.learningRateMin, Rate.EXP(this.learningRate, this.timeStep, {gamma: this.learningRateDecay}));
      this.network.propagate(currentLearningRate, 0, true, predictedReward);
    } else {
      let currentLearningRate = Math.max(this.learningRateMinB, Rate.EXP(this.learningRateB, this.timeStep, {gamma: this.learningRateDecayB}));
      this.networkB.propagate(currentLearningRate, 0, true, predictedReward);
    }
    return tdError;
  },
};

/**
 * Load function
 *
 * @function fromJSON
 * @memberof DQN
 *
 * @param {{
 *   network:{
 *     input:{number},
 *     output:{number},
 *     dropout:{number},
 *     nodes:Array<object>,
 *     connections:Array<object>
 *   },
 *   networkB:{
 *     input:{number},
 *     output:{number},
 *     dropout:{number},
 *     nodes:Array<object>,
 *     connections:Array<object>
 *   },
 *   gamma:{number},
 *   explore:{number},
 *   exploreDecay:{number},
 *   exploreMin:{number},
 *   learningRate:{number},
 *   learningRateDecay:{number},
 *   learningRateMin:{number},
 *   isTraining:{boolean},
 *   isDoubleDQN:{boolean},
 *   experience:{ReplayBuffer}
 * }} json  JSON String
 * @return {DQN} Agent with the specs from the json
 *
 * @todo Create unit test
 */
DQN.fromJSON = function (json) {
  json.network = json.network instanceof Network ? json.network : Network.fromJSON(json.network);
  json.networkB = json.networkB instanceof Network ? json.networkB : Network.fromJSON(json.networkB);

  return new DQN(json.network.input_size, json.network.output_size, json);
};

module.exports = DQN;
