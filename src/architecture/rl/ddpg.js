const architect = require('../architect');
const Network = require('../network');
const ReplayBuffer = require('./replay-buffer');
const Experience = require('./experience');
const Utils = require('../../util/utils');

/**
 *
 * @param {int} numStates
 * @param {int} hiddenSize
 * @param {int} numActions
 * @param {int} maxExperienceSize
 * @constructor
 */
function DDPG(numStates, hiddenSize, numActions, maxExperienceSize) {
  this.actor = new architect.Perceptron(numStates, hiddenSize, numActions);
  this.critic = new architect.Perceptron(numStates + numActions, hiddenSize, numActions);

  this.actorTarget = Network.fromJSON(this.actor.toJSON());
  this.criticTarget = Network.fromJSON(this.critic.toJSON());

  this.replayBuffer = new ReplayBuffer(maxExperienceSize);

  this.learningStepsPerEpisode = 20;
  this.gamma = 0.3;
  this.tau = 0.01;
  this.isTraining = true;

  this.action = 0;
  this.nextState = null;
  this.state = null;
  this.loss = 0;
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
   */
  act: function(state) {
    //TODO replacing with OUNoise -> Continuous Action Space
    let action;
    action = this.epsilon > Math.random()
      ? Math.floor(Math.random() * this.numActions)
      : Utils.getMaxValueIndex(this.actor.activate(state));

    this.action = action;
    this.state = this.nextState;
    this.nextState = state;
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
    if (!this.isTraining) {
      return 1;
    }
    let experience = new Experience(this.state, this.action, reward, this.nextState, isFinalState);
    this.replayBuffer.add(experience);

    this.loss = this.study(experience);

    let miniBatch = this.replayBuffer.getMiniBatchWithPER(this.learningStepsPerEpisode);
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
    this.critic.propagate(this.learningRate, 0, true, criticGradients);

    let actorLoss = -Utils.mean(this.critic.activate(experience.state.concat(this.actor.activate(experience.state))));
    let gradients = this.actor.activate(experience.state);
    gradients[experience.action] += actorLoss;
    this.actor.propagate(this.learningRate, 0, true, gradients);

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
    this.actorTarget.propagate(this.learningRate, 0, true, actorTargetParameters);
    this.criticTarget.propagate(this.learningRate, 0, true, criticTargetParameters);

    return actorLoss;
  },
};

module.exports = DDPG;
