const architect = require('../architect');
const Network = require('../network');
const ReplayBuffer = require('./replay-buffer');
const Experience = require('./experience');
const Utils = require('../../util/utils');
const Rate = require('../../methods/rate');

/**
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
 *   learningRateActorTarget: {number},
 *   learningRateActorTargetDecay: {number},
 *   learningRateActorTargetMin: {number},
 *   learningRateCriticTarget: {number},
 *   learningRateCriticTargetDecay: {number},
 *   learningRateCriticTargetMin: {number},
 *   explore: {number},
 *   exploreDecay: {number},
 *   exploreMin: {number},
 *   isTraining: {boolean},
 *   isUsingPER: {boolean},
 *   experienceSize: {int},
 *   learningStepsPerIteration: {int},
 *   timeStep: {int},
 *   gamma: {number}
 * }} options
 * @constructor
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
  this.replayBuffer = new ReplayBuffer(experienceSize);
  this.learningStepsPerEpisode = Utils.RL.getOption(options, 'learningStepsPerEpisode', 20);

  // Training specific variables
  this.gamma = Utils.RL.getOption(options, 'gamma', 0.7);
  this.tau = Utils.RL.getOption(options, 'tau', 0.01);
  this.isTraining = Utils.RL.getOption(options, 'isTraining', true);
  this.isUsingPER = Utils.RL.getOption(options, 'isUsingPER', true); // using prioritized experience replay

  this.learningRateActor = Utils.RL.getOption(options, 'learningRateActor', 0.1); // AKA alpha value function learning rate
  this.learningRateActorDecay = Utils.RL.getOption(options, 'learningRateActorDecay', 0.99); // AKA alpha value function learning rate
  this.learningRateActorMin = Utils.RL.getOption(options, 'learningRateActorMin', 0.01); // AKA alpha value function learning rate

  this.learningRateCritic = Utils.RL.getOption(options, 'learningRateCritic', this.learningRateActor); // AKA alpha value function learning rate
  this.learningRateCriticDecay = Utils.RL.getOption(options, 'learningRateCriticDecay', this.learningRateActorDecay); // AKA alpha value function learning rate
  this.learningRateCriticMin = Utils.RL.getOption(options, 'learningRateCriticMin', this.learningRateActorMin); // AKA alpha value function learning rate

  this.learningRateActorTarget = Utils.RL.getOption(options, 'learningRateActorTarget', this.learningRateActor); // AKA alpha value function learning rate
  this.learningRateActorTargetDecay = Utils.RL.getOption(options, 'learningRateActorTargetDecay', this.learningRateActorDecay); // AKA alpha value function learning rate
  this.learningRateActorTargetMin = Utils.RL.getOption(options, 'learningRateActorTargetMin', this.learningRateActorMin); // AKA alpha value function learning rate

  this.learningRateCriticTarget = Utils.RL.getOption(options, 'learningRateCriticTarget', this.learningRateCritic); // AKA alpha value function learning rate
  this.learningRateCriticTargetDecay = Utils.RL.getOption(options, 'learningRateCriticTargetDecay', this.learningRateCriticDecay); // AKA alpha value function learning rate
  this.learningRateCriticTargetMin = Utils.RL.getOption(options, 'learningRateCriticTargetMin', this.learningRateCriticMin); // AKA alpha value function learning rate

  // Exploration / Exploitation management
  this.explore = Utils.RL.getOption(options, 'explore', 0.3); // AKA epsilon for epsilon-greedy policy
  this.exploreDecay = Utils.RL.getOption(options, 'exploreDecay', 0.9999); // AKA epsilon for epsilon-greedy policy
  this.exploreMin = Utils.RL.getOption(options, 'exploreMin', 0.01); // AKA epsilon for epsilon-greedy policy

  this.timeStep = 0;
  this.loss = 0;
  this.action = 0;
  this.state = null;
  this.lastState = null;
}

DDPG.prototype = {
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
   *
   * @todo replacing explore with OUNoise -> Continuous Action Space
   */
  act: function(state) {
    let currentExploreRate = Math.max(this.exploreMin, Rate.EXP(this.explore, this.timeStep, {gamma: this.exploreDecay}));
    let action = currentExploreRate > Math.random()
      ? Math.floor(Math.random() * this.numActions)
      : Utils.getMaxValueIndex(this.actor.activate(state));

    this.action = action;
    this.lastState = this.state;
    this.state = state;
    return action;
  },

  /**
   * This method trains the Q-Network.
   *
   * @function learn
   * @memberof DDPG
   *
   * @param {number} reward the current reward, the agent receives from the environment; newReward ∈ [-1,1]
   * @param {boolean} isFinalState Does the game ends at this state?
   * @returns {number} the loss value; loss ∈ [-1,1]
   */
  learn: function(reward, isFinalState = false) {
    this.timeStep++;
    if (!this.isTraining) {
      return 1;
    }
    let experience = new Experience(this.lastState, this.action, reward, this.state, isFinalState);
    this.replayBuffer.add(experience);

    this.loss = this.study(experience);

    let miniBatch = this.isUsingPER
      ? this.replayBuffer.getMiniBatchWithPER(this.learningStepsPerEpisode)
      : this.replayBuffer.getRandomMiniBatch(this.learningStepsPerEpisode);

    for (let i = 0; i < miniBatch.length; i++) {
      this.study(miniBatch[i]);
    }
    return this.loss;
  },
  /**
   *
   * @param {Experience} experience
   * @return {number} loss
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
      criticGradients += Math.pow(qPrime[i] - qValues[i], 2);
    }

    //TODO Might be a bug
    let criticLearningRate = Math.max(this.learningRateCriticMin, Rate.EXP(this.learningRateCritic, this.timeStep, {gamma: this.learningRateCriticDecay}));
    this.critic.propagate(criticLearningRate, 0, true, criticGradients);

    let actorLoss = -Utils.mean(this.critic.activate(experience.state.concat(this.actor.activate(experience.state))));
    let gradients = this.actor.activate(experience.state);
    gradients[experience.action] += actorLoss;

    let actorLearningRate = Math.max(this.learningRateActorMin, Rate.EXP(this.learningRateActor, this.timeStep, {gamma: this.learningRateActorDecay}));
    this.actor.propagate(actorLearningRate, 0, true, gradients);

    // Learning the actorTarget and criticTarget networks
    let actorParameters = this.actor.activate(experience.state);
    let actorTargetParameters = this.actorTarget.activate(experience.state);
    let criticParameters = this.critic.activate(experience.state.concat(experience.action));
    let criticTargetParameters = this.criticTarget.activate(experience.state.concat(experience.action));
    for (let i = 0; i < actorParameters.length; i++) {
      actorTargetParameters[i] = this.tau * actorParameters[i] + (1 - this.tau) * actorTargetParameters;
    }
    for (let i = 0; i < criticParameters.length; i++) {
      criticTargetParameters[i] = this.tau * criticParameters[i] + (1 - this.tau) * criticTargetParameters;
    }

    let actorTargetLearningRate = Math.max(this.learningRateActorTargetMin, Rate.EXP(this.learningRateActorTarget, this.timeStep, {gamma: this.learningRateActorTargetDecay}));
    this.actorTarget.propagate(actorTargetLearningRate, 0, true, actorTargetParameters);

    let criticTargetLearningRate = Math.max(this.learningRateCriticTargetMin, Rate.EXP(this.learningRateCriticTarget, this.timeStep, {gamma: this.learningRateCriticTargetDecay}));
    this.criticTarget.propagate(criticTargetLearningRate, 0, true, criticTargetParameters);

    return actorLoss;
  },
};

module.exports = DDPG;
