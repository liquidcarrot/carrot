const Network = require('../network');
const ReplayBuffer = require('./replay-buffer');
const Experience = require('./experience');
const Utils = require('../../util/utils');
const Rate = require("../../methods/rate");
const Loss = require('../../methods/cost');

/**
 * Creates a DQN-Agent
 *
 * Used to do reinforcement learning with an DQN-Agent
 *
 * @constructs DQN
 *
 * @param {int} numActions Maximum number of actions the agent can do,
 * @param {int} numStates Length of the state array
 * @param {{
 *   hiddenNeurons: int[],
 *   hiddenNeuronsB: int[],
 *   network: Network,
 *   networkB: Network,
 *   learningRate: number,
 *   learningRateDecay: number,
 *   learningRateMin: number,
 *   learningRateB: number,
 *   learningRateBDecay: number,
 *   learningRateBMin: number,
 *   explore: number,
 *   exploreDecay: number,
 *   exploreMin: number,
 *   tdErrorClamp: number,
 *   isTraining: boolean,
 *   isDoubleDQN: boolean,
 *   isUsingPER: boolean,
 *   isUsingSARSA: boolean,
 *   experienceSize: int,
 *   learningStepsPerIteration: int,
 *   gamma: number
 * }|*} options JSON object which contains all custom options
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
  this.isUsingSARSA = Utils.RL.getOption(options, 'isUsingSARSA', false);
  this.gamma = Utils.RL.getOption(options, 'gamma', 0.7); // future reward discount factor
  this.loss = Utils.RL.getOption(options, 'loss', Loss.ABS);
  this.lossOptions = Utils.RL.getOption(options, 'lossOptions', {});
  this.startLearningThreshold = Utils.RL.getOption(options, 'startLearningThreshold', 10);
  // Network creation
  this.numActions = numActions;
  this.hiddenNeurons = Utils.RL.getOption(options, 'hiddenNeurons', [10]);
  this.hiddenNeuronsB = Utils.RL.getOption(options, 'hiddenNeuronsB', this.hiddenNeurons);
  this.network = Utils.RL.getOption(options, 'network', new Network.architecture.Perceptron(numStates, ...this.hiddenNeurons, numActions));
  this.networkB = this.isDoubleDQN
    ? Utils.RL.getOption(options, 'networkB', new Network.architecture.Perceptron(numStates, ...this.hiddenNeuronsB, numActions))
    : null;

  // Learning rate
  this.learningRate = Utils.RL.getOption(options, 'learningRate', 0.1); // AKA alpha value function learning rate
  this.learningRateDecay = Utils.RL.getOption(options, 'learningRateDecay', 0.999); // AKA alpha value function learning rate
  this.learningRateMin = Utils.RL.getOption(options, 'learningRateMin', 0.01); // AKA alpha value function learning rate
  if (this.isDoubleDQN) {
    this.learningRateB = Utils.RL.getOption(options, 'learningRateB', this.learningRate); // AKA alpha value function learning rate
    this.learningRateBDecay = Utils.RL.getOption(options, 'learningRateBDecay', this.learningRateDecay); // AKA alpha value function learning rate
    this.learningRateBMin = Utils.RL.getOption(options, 'learningRateBMin', this.learningRateMin); // AKA alpha value function learning rate
  }

  // Experience ("Memory")
  let experienceSize = Utils.RL.getOption(options, 'experienceSize', 10000); // size of experience replay
  let noisyPER = Utils.RL.getOption(options, 'noisyPER', null);
  this.replayBuffer = Utils.RL.getOption(options, 'experience', noisyPER === null
    ? new ReplayBuffer(experienceSize, 0)
    : new ReplayBuffer(experienceSize, noisyPER)); // experience
  this.learningStepsPerIteration = Utils.RL.getOption(options, 'learningStepsPerIteration', 10); // number of time steps before we add another experience to replay memory

  // Exploration / Exploitation management
  this.explore = Utils.RL.getOption(options, 'explore', 0.3); // AKA epsilon for epsilon-greedy policy
  this.exploreDecay = Utils.RL.getOption(options, 'exploreDecay', 0.9999); // AKA epsilon for epsilon-greedy policy
  this.exploreMin = Utils.RL.getOption(options, 'exploreMin', 0.01); // AKA epsilon for epsilon-greedy policy

  // Set variables to null | 0
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
   *   network:{
   *     input:number,
   *     output:number,
   *     dropout:number,
   *     nodes:Array<object>,
   *     connections:Array<object>
   *   },
   *   networkB:{
   *     input:number,
   *     output:number,
   *     dropout:number,
   *     nodes:Array<object>,
   *     connections:Array<object>
   *   },
   *   gamma:number,
   *   explore:number,
   *   exploreDecay:number,
   *   exploreMin:number,
   *   learningRate:number,
   *   learningRateDecay:number,
   *   learningRateMin:number,
   *   learningRateB:number,
   *   learningRateBDecay:number,
   *   learningRateBMin:number,
   *   learningStepsPerIteration: int,
   *   isTraining:boolean,
   *   isUsingPER:boolean,
   *   isUsingSARSA: boolean,
   *   isDoubleDQN:boolean,
   *   tdErrorClamp: number,
   *   timeStep: int,
   *   experience:ReplayBuffer
   * }} json JSON String JSON String which represents this DQN agent
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
    json.learningRateB = this.learningRateB;
    json.learningRateBDecay = this.learningRateBDecay;
    json.learningRateBMin = this.learningRateBMin;
    json.learningStepsPerIteration = this.learningStepsPerIteration;
    json.isTraining = this.isTraining;
    json.isUsingPER = this.isUsingPER;
    json.isUsingSARSA = this.isUsingSARSA;
    json.isDoubleDQN = this.isDoubleDQN;
    json.tdErrorClamp = this.tdErrorClamp;
    json.timeStep = this.timeStep;
    json.experience = this.replayBuffer;
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
   * @param {number[]} prohibitedActions
   * @return {int} The action which the DQN would take at this state; action ∈ [0, this.numActions-1]
   *
   * @todo Add ability to select strategies
   * @todo Add Thompson Sampling strategy
   */
  act: function(state, prohibitedActions) {
    if (!Array.isArray(prohibitedActions)) {
      prohibitedActions = [];
    }
    // epsilon greedy strategy | explore > random ? explore : exploit
    let currentExploreRate = Math.max(this.exploreMin, Rate.EXP(this.explore, this.timeStep, {gamma: this.exploreDecay}));
    let action;
    if (this.isTraining && (currentExploreRate > Math.random() || this.timeStep < this.startLearningThreshold)) {
      // Explore
      do {
        action = Utils.randomInt(0, this.numActions - 1);
      } while (prohibitedActions.indexOf(action) !== -1);
    } else if (this.isDoubleDQN) {
      // Exploit with Double-DQN
      // Take action which is maximum of both networks by summing them up
      let activation = this.network.activate(state, {trace: false});
      let activationB = this.networkB.activate(state, {trace: false});

      for (let i = 0; i < prohibitedActions.length; i++) {
        activation[prohibitedActions[i]] = -1;
        activationB[prohibitedActions[i]] = -1;
      }

      let sum = activation.map((elem, index) => elem + activationB[index]);
      action = Utils.getMaxValueIndex(sum);
    } else {
      // Exploit
      let actions = this.network.activate(state, {trace: false});
      for (let i = 0; i < prohibitedActions.length; i++) {
        actions[prohibitedActions[i]] = -1;
      }
      action = Utils.getMaxValueIndex(actions);
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
    let loss = 1;
    if (this.reward != null && this.isTraining) {
      let experience = new Experience(this.state, this.action, normalizedReward, this.nextState, this.nextAction, isFinalState);
      this.replayBuffer.add(experience);
      if (this.timeStep >= this.startLearningThreshold) {
        experience.loss = this.study(experience);
        loss = experience.loss;
        let miniBatch = this.isUsingPER
          ? this.replayBuffer.getMiniBatchWithPER(this.learningStepsPerIteration)
          : this.replayBuffer.getRandomMiniBatch(this.learningStepsPerIteration);

        // Sample the mini batch
        for (let i = 0; i < miniBatch.length; i++) {
          this.study(miniBatch[i]);
        }
      }
    }
    this.timeStep++;
    this.reward = newReward;
    return loss;
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
   * @todo Consider not using a target network: https:// www.ijcai.org/proceedings/2019/0379.pdf
   * @todo Consider renaming to sample(experience)
   */
  study: function(experience) {
    let chooseNetwork = !this.isDoubleDQN || Math.random() < 0.5 ? 'A' : 'B';

    // Compute target Q value, called without traces so it won't affect backpropagation later
    let nextActions = !this.isDoubleDQN || chooseNetwork === 'A'
      ? this.network.activate(experience.nextState, {trace: false})
      : this.networkB.activate(experience.nextState, {trace: false});
    let actionIndex = this.isUsingSARSA
      ? experience.nextAction
      : Utils.getMaxValueIndex(nextActions);

    let targetQValue;
    if (experience.isFinalState) {
      // For final state reward needs no discount factor
      targetQValue = experience.reward;
    } else if (this.isDoubleDQN) {
      // See here: https:// bit.ly/2rjp1gS
      targetQValue = experience.reward + this.gamma *
        (chooseNetwork === 'A'
          ? this.networkB.activate(experience.nextState, {trace: false})[actionIndex]
          : this.network.activate(experience.nextState, {trace: false})[actionIndex]) -
        (chooseNetwork === 'A'
          ? this.network.activate(experience.state, {trace: false})[experience.action]
          : this.networkB.activate(experience.state, {trace: false})[experience.action]);
    } else if (this.isUsingSARSA) {
      // SARSA
      targetQValue = experience.reward
        + this.gamma * nextActions[actionIndex]
        - this.network.activate(experience.state)[actionIndex];
    } else {
      // Q-LEARNING
      targetQValue = experience.reward
        + this.gamma * nextActions[actionIndex];
    }

    // Predicted current reward | called with traces for backpropagation later
    let predictedReward = !this.isDoubleDQN || chooseNetwork === 'A'
      ? this.network.activate(experience.state)
      : this.networkB.activate(experience.state);

    let temp = predictedReward;
    predictedReward[experience.action] = targetQValue;
    let tdError = this.loss(predictedReward, temp, this.lossOptions);

    // Clamp error for robustness
    if (Math.abs(tdError) > this.tdErrorClamp) {
      tdError = tdError > this.tdErrorClamp ? this.tdErrorClamp : -this.tdErrorClamp;
    }

    // Backpropagation using temporal difference error
    if (!this.isDoubleDQN || chooseNetwork === 'A') {
      let currentLearningRate = Math.max(this.learningRateMin, Rate.EXP(this.learningRate, this.timeStep, {gamma: this.learningRateDecay}));
      this.network.propagate(currentLearningRate, 0, true, predictedReward);
    } else {
      let currentLearningRate = Math.max(this.learningRateBMin, Rate.EXP(this.learningRateB, this.timeStep, {gamma: this.learningRateBDecay}));
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
 *     input:number,
 *     output:number,
 *     dropout:number,
 *     nodes:Array<object>,
 *     connections:Array<object>
 *   },
 *   networkB:{
 *     input:number,
 *     output:number,
 *     dropout:number,
 *     nodes:Array<object>,
 *     connections:Array<object>
 *   },
 *   gamma:number,
 *   explore:number,
 *   exploreDecay:number,
 *   exploreMin:number,
 *   learningRate:number,
 *   learningRateDecay:number,
 *   learningRateMin:number,
 *   learningRateB:number,
 *   learningRateBDecay:number,
 *   learningRateBMin:number,
 *   learningStepsPerIteration: int,
 *   isTraining:boolean,
 *   isUsingPER:boolean,
 *   isUsingSARSA:boolean,
 *   isDoubleDQN:boolean,
 *   timeStep: int,
 *   tdErrorClamp: number,
 *   experience:ReplayBuffer
 * }} json  JSON String
 * @return {DQN} Agent with the specs from the json
 */
DQN.fromJSON = function (json) {
  json.network = json.network instanceof Network ? json.network.toJSON() : Network.fromJSON(json.network);
  if (json.isDoubleDQN) {
    json.networkB = json.networkB instanceof Network ? json.networkB.toJSON() : Network.fromJSON(json.networkB);
  } else {
    json.networkB = undefined;
  }

  let agent = new DQN(json.network.input_size, json.network.output_size, json);
  agent.timeStep = json.timeStep;
  return agent;
};

module.exports = DQN;
