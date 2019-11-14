const architect = require('../architect');
const Network = require('../network');
const ReplayBuffer = require('./replay-buffer');
const Experience = require('./experience');
const Utils = require('../../util/utils');
const Rate = require('../../methods/rate');

/**
 *
 * Creates a DDPG-Agent
 *
 * Used to do reinforcement learning with an DDPG Agent
 *
 * @alpha
 *
 * @constructs DDPG
 *
 * @param {int} numStates
 * @param {int} numActions
 * @param {{
 *   hiddenNeuronsActor: {int[]},
 *   hiddenNeuronsCritic: {int[]},
 *   actor: {Network},
 *   critic: {Network},
 *   actorTarget: {Network},
 *   criticTarget: {Network},
 *   learningRateActor: {number},
 *   learningRateActorDecay: {number},
 *   learningRateActorMin: {number},
 *   learningRateCritic: {number},
 *   learningRateCriticDecay: {number},
 *   learningRateCriticMin: {number},
 *   explore: {number},
 *   exploreDecay: {number},
 *   exploreMin: {number},
 *   isTraining: {boolean},
 *   isUsingPER: {boolean},
 *   experienceSize: {int},
 *   learningStepsPerIteration: {int},
 *   gamma: {number},
 *   theta: {number}
 * }} options JSON object which contains all custom options
 *
 * @todo replace epsilon-greedy with OUNoise
 */
function DDPG(numStates, numActions, options) {
  // Network creation
  let hiddenNeuronsActor = Utils.RL.getOption(options, 'hiddenNeuronsActor', [10]);
  let hiddenNeuronsCritic = Utils.RL.getOption(options, 'hiddenNeuronsCritic', hiddenNeuronsActor);

  this.actor = Utils.RL.getOption(options, 'actor', new architect.Perceptron(numStates, hiddenNeuronsActor, numActions));
  this.critic = Utils.RL.getOption(options, 'critic', new architect.Perceptron(numStates + numActions, hiddenNeuronsCritic, numActions));
  this.actorTarget = Utils.RL.getOption(options, 'actorTarget', Network.fromJSON(this.actor.toJSON()));
  this.criticTarget = Utils.RL.getOption(options, 'criticTarget', Network.fromJSON(this.critic.toJSON()));

  // Experience ("Memory")
  let experienceSize = Utils.RL.getOption(options, 'experienceSize', 50000);
  let noisyPER = Utils.RL.getOption(options, 'noisyPER', null);
  this.replayBuffer = Utils.RL.getOption(options, 'replayBuffer', noisyPER === null
    ? new ReplayBuffer(experienceSize)
    : new ReplayBuffer(experienceSize, noisyPER));
  this.learningStepsPerIteration = Utils.RL.getOption(options, 'learningStepsPerIteration', 20);

  // Training specific variables
  this.gamma = Utils.RL.getOption(options, 'gamma', 0.7);
  this.theta = Utils.RL.getOption(options, 'theta', 0.01); // soft target update
  this.isTraining = Utils.RL.getOption(options, 'isTraining', true);
  this.isUsingPER = Utils.RL.getOption(options, 'isUsingPER', true); // using prioritized experience replay

  this.learningRateActor = Utils.RL.getOption(options, 'learningRateActor', 0.1); // AKA alpha value function learning rate
  this.learningRateActorDecay = Utils.RL.getOption(options, 'learningRateActorDecay', 0.99); // AKA alpha value function learning rate
  this.learningRateActorMin = Utils.RL.getOption(options, 'learningRateActorMin', 0.01); // AKA alpha value function learning rate

  this.learningRateCritic = Utils.RL.getOption(options, 'learningRateCritic', this.learningRateActor); // AKA alpha value function learning rate
  this.learningRateCriticDecay = Utils.RL.getOption(options, 'learningRateCriticDecay', this.learningRateActorDecay); // AKA alpha value function learning rate
  this.learningRateCriticMin = Utils.RL.getOption(options, 'learningRateCriticMin', this.learningRateActorMin); // AKA alpha value function learning rate

  // Exploration / Exploitation management
  this.explore = Utils.RL.getOption(options, 'explore', 0.3); // AKA epsilon for epsilon-greedy policy
  this.exploreDecay = Utils.RL.getOption(options, 'exploreDecay', 0.9999); // AKA epsilon for epsilon-greedy policy
  this.exploreMin = Utils.RL.getOption(options, 'exploreMin', 0.01); // AKA epsilon for epsilon-greedy policy

  this.timeStep = 0;
  this.actions = [];
  this.state = null;
  this.lastState = null;
}

DDPG.prototype = {
  /**
   * Save function
   *
   * @function toJSON
   * @memberof DDPG
   *
   * @return {{
   *   actor: {
   *     input:{number},
   *     output:{number},
   *     dropout:{number},
   *     nodes:Array<object>,
   *     connections:Array<object>
   *   },
   *   critic: {
   *     input:{number},
   *     output:{number},
   *     dropout:{number},
   *     nodes:Array<object>,
   *     connections:Array<object>
   *   },
   *   actorTarget: {
   *     input:{number},
   *     output:{number},
   *     dropout:{number},
   *     nodes:Array<object>,
   *     connections:Array<object>
   *   },
   *   criticTarget: {
   *     input:{number},
   *     output:{number},
   *     dropout:{number},
   *     nodes:Array<object>,
   *     connections:Array<object>
   *   },
   *   gamma: {number},
   *   theta: {number},
   *   explore: {number},
   *   exploreDecay: {number},
   *   exploreMin: {number},
   *   learningRateActor: {number},
   *   learningRateActorDecay: {number},
   *   learningRateActorMin: {number},
   *   learningRateCritic: {number},
   *   learningRateCriticDecay: {number},
   *   learningRateCriticMin: {number},
   *   isTraining: {boolean},
   *   isUsingPER: {boolean},
   *   timeStep: {int},
   *   experience:{ReplayBuffer}
   * }} json JSON String JSON String which represents this DDPG agent
   *
   * @todo Create unit test
   */
  toJSON: function() {
    let json = {};
    json.actor = this.actor.toJSON();
    json.critic = this.critic.toJSON();
    json.actorTarget = this.actorTarget.toJSON();
    json.criticTarget = this.criticTarget.toJSON();

    json.gamma = this.gamma;
    json.theta = this.theta;

    json.explore = this.explore;
    json.exploreDecay = this.exploreDecay;
    json.exploreMin = this.exploreMin;

    json.learningRateActor = this.learningRateActor;
    json.learningRateActorDecay = this.learningRateActorDecay;
    json.learningRateActorMin = this.learningRateActorMin;

    json.learningRateCritic = this.learningRateCritic;
    json.learningRateCriticDecay = this.learningRateCriticDecay;
    json.learningRateCriticMin = this.learningRateCriticMin;

    json.isTraining = this.isTraining;
    json.isUsingPER = this.isUsingPER;
    json.timeStep = this.timeStep;
    json.learningStepsPerIteration = this.learningStepsPerIteration;
    json.replayBuffer = this.replayBuffer.toJSON();
    return json;
  },

  /**
   * This method decides which action should be taken.
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
   * @memberof DDPG
   *
   * @param {number[]} state current state (float arr with values from [0,1])
   * @return {int} The action which the DQN would take at this state; action ∈ [0, this.numActions-1]
   */
  act: function(state) {
    let action = this.addNoise(this.actor.activate(state));
    this.actions = action;
    this.lastState = this.state;
    this.state = state;

    return Utils.getMaxValueIndex(action);
  },

  /**
   * This method trains the Q-Network.
   *
   * @function learn
   * @memberof DDPG
   *
   * @param {number} newReward the current reward, the agent receives from the environment; newReward ∈ [-1,1]
   * @param {boolean} isFinalState Does the game ends at this state?
   * @returns {number} the loss value; loss ∈ [-1,1]
   */
  learn: function(newReward, isFinalState = false) {
    // Normalizing newReward:
    // newReward ∈ [-1,1] --> normalizedReward ∈ [0,1]
    const normalizedReward = (1 + newReward) / 2;

    this.timeStep++;
    if (this.timeStep === 1 || !this.isTraining) {
      return 1;
    }
    let experience = new Experience(this.lastState, this.actions, normalizedReward, this.state, 0, isFinalState);
    this.replayBuffer.add(experience);

    let loss = this.study(experience);

    let miniBatch = this.isUsingPER
      ? this.replayBuffer.getMiniBatchWithPER(this.learningStepsPerIteration)
      : this.replayBuffer.getRandomMiniBatch(this.learningStepsPerIteration);

    for (let i = 0; i < miniBatch.length; i++) {
      this.study(miniBatch[i]);
    }
    return loss;
  },

  /**
   * This method learns from an specified experience / action-state transition.
   *
   * @function study
   * @memberof DDPG
   *
   * @param {Experience} experience the experience to learn from
   * @returns {number} Actor loss value; loss ∈ [-1,1]
   *
   * @todo Add dynamic loss functions & clamps, including Huber Loss
   */
  study: function(experience) {
    let qValues = this.critic.activate(experience.state.concat(experience.action));
    let nextQ = this.criticTarget.activate(experience.nextState.concat(this.actorTarget.activate(experience.nextState)));
    let qPrime = [];
    for (let i = 0; i < nextQ.length; i++) {
      qPrime.push(experience.isFinalState
        ? experience.reward
        : experience.reward + this.gamma * nextQ[i]);
    }

    // Learning the actor and critic networks
    let criticGradients = this.critic.activate(experience.state.concat(experience.action));
    for (let i = 0; i < qValues.length; i++) {
      criticGradients[i] += (qPrime[i] - qValues[i]) ** 2;
    }

    let criticLearningRate = Math.max(this.learningRateCriticMin, Rate.EXP(this.learningRateCritic, this.timeStep, {gamma: this.learningRateCriticDecay}));
    this.critic.propagate(criticLearningRate, 0, true, criticGradients);

    let actorLoss = -Utils.mean(this.critic.activate(experience.state.concat(this.actor.activate(experience.state))));
    let gradients = this.actor.activate(experience.state);
    gradients[Utils.getMaxValueIndex(experience.action)] += actorLoss;

    let actorLearningRate = Math.max(this.learningRateActorMin, Rate.EXP(this.learningRateActor, this.timeStep, {gamma: this.learningRateActorDecay}));
    this.actor.propagate(actorLearningRate, 0, true, gradients);

    // Learning the actorTarget and criticTarget networks
    let actorParameters = this.actor.activate(experience.state);
    let actorTargetParameters = this.actorTarget.activate(experience.state);
    let criticParameters = this.critic.activate(experience.state.concat(experience.action));
    let criticTargetParameters = this.criticTarget.activate(experience.state.concat(experience.action));
    for (let i = 0; i < actorParameters.length; i++) {
      actorTargetParameters[i] *= this.theta * actorParameters[i] + (1 - this.theta);
    }
    for (let i = 0; i < criticParameters.length; i++) {
      criticTargetParameters[i] *= this.theta * criticParameters[i] + (1 - this.theta);
    }

    this.actorTarget.propagate(1, 0, true, actorTargetParameters);
    this.criticTarget.propagate(1, 0, true, criticTargetParameters);

    return actorLoss;
  },

  /**
   * This method adds noise to each param of an array.
   *
   * @param actions array from actor.activate()
   * @returns {number[]} noised actions array
   *
   * @todo replace with Gaussian or OUNoise
   */
  addNoise: function(actions) {
    let currentExploreRate = Math.max(this.exploreMin, Rate.EXP(this.explore, this.timeStep, {gamma: this.exploreDecay}));
    for (let i = 0; i < actions.length; i++) {
      actions[i] *= Math.random() <= currentExploreRate
        ? currentExploreRate + 1
        : 1 - currentExploreRate;
    }
    return actions;
  },
};

/**
 *   actor: {
 *     input:{number},
 *     output:{number},
 *     dropout:{number},
 *     nodes:Array<object>,
 *     connections:Array<object>
 *   },
 *   critic: {
 *     input:{number},
 *     output:{number},
 *     dropout:{number},
 *     nodes:Array<object>,
 *     connections:Array<object>
 *   },
 *   actorTarget: {
 *     input:{number},
 *     output:{number},
 *     dropout:{number},
 *     nodes:Array<object>,
 *     connections:Array<object>
 *   },
 *   criticTarget: {
 *     input:{number},
 *     output:{number},
 *     dropout:{number},
 *     nodes:Array<object>,
 *     connections:Array<object>
 *   },
 *   gamma: {number},
 *   theta: {number},
 *   explore: {number},
 *   exploreDecay: {number},
 *   exploreMin: {number},
 *   learningRateActor: {number},
 *   learningRateActorDecay: {number},
 *   learningRateActorMin: {number},
 *   learningRateCritic: {number},
 *   learningRateCriticDecay: {number},
 *   learningRateCriticMin: {number},
 *   isTraining: {boolean},
 *   isUsingPER: {boolean},
 *   timeStep: {int},
 *   replayBuffer: {
 *   ReplayBuffer|{
 *     buffer: {Experience[]},
 *     maxSize: {int},
 *     sumOfAbsLosses: {number},
 *     noiseRate: {number}
 *    }}
 * }} json JSON String JSON String which represents this DDPG agent
 *
 * @return {DDPG} the agent with specs from json
 *
 * @todo Create unit tests
 * @param json
 */
DDPG.fromJSON = function(json) {
  json.actor = json.actor instanceof Network
    ? json.actor
    : Network.fromJSON(json.actor);
  json.critic = json.critic instanceof Network
    ? json.critic
    : Network.fromJSON(json.critic);
  json.actorTarget = json.actorTarget instanceof Network
    ? json.actorTarget
    : Network.fromJSON(json.actorTarget);
  json.criticTarget = json.criticTarget instanceof Network
    ? json.criticTarget
    : Network.fromJSON(json.criticTarget);

  json.replayBuffer = json.replayBuffer instanceof ReplayBuffer
    ? json.replayBuffer
    : ReplayBuffer.fromJSON(json.replayBuffer);

  let agent = new DDPG(json.actor.input_size, json.actor.output_size, json);
  agent.timeStep = json.timeStep;
  return agent;
};

module.exports = DDPG;
