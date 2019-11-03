const Network = require("../network");
const architect = require("../architect");
const ReplayBuffer = require("./replay-buffer");

function DDPG(numStates, hiddenSize, numActions, maxExperienceSize) {
  this.actor = new architect.Perceptron(numStates, hiddenSize, numActions);
  this.critic = new architect.Perceptron(numStates + numActions, hiddenSize, numActions);

  this.actorTarget = Network.fromJSON(this.actor.toJSON());
  this.criticTarget = Network.fromJSON(this.critic.toJSON());

  //TODO create class ReplayBuffer
  this.replayBuffer = new ReplayBuffer(maxExperienceSize);

  this.learningStepsPerEpisode = 20;
  this.gamma = 0.3;
  this.tau = 0.01;

  this.action = 0;
  this.nextState = null;
  this.state = null;
}

DDPG.prototype = {
  init: function (initState) {
    this.nextState = initState;
  },

  act: function () {
    //TODO replacing with OUNoise -> Continuous Action Space
    let action;
    if (Math.random() < this.epsilon) {
      action = Math.floor(Math.random() * this.numActions);
    } else {
      action = this.getMaxValueIndex(this.actor.activate(this.nextState));
    }
    this.action = action;
    this.state = this.nextState;
    this.nextState = null;
    return action;
  },

  learn: function (reward, newState) {
    this.replayBuffer.add(this.state, this.action, reward, newState);

    this.sampleExperience(...this.replayBuffer.getLast());

    for (let i = 0; i < this.learningStepsPerEpisode; i++) {
      this.sampleExperience(...this.replayBuffer.pickRandom());
    }
  },

  sampleExperience: function (state, action, reward, nextState) {
    let qValues = this.critic.activate(...state, ...action);
    let criticInput = [...nextState, ...this.actorTarget.activate(nextState)];
    let nextQ = this.criticTarget.activate(criticInput);
    let qPrime = [];
    for (let i = 0; i < nextQ.length; i++) {
      qPrime.push(reward + this.gamma * nextQ[i]);
    }

    //Learning the actor and critic networks
    let criticGradients = this.critic.activate([...state, action]);
    for (let i = 0; i < qValues.length; i++) {
      criticGradients += Math.pow(qPrime[i] - qValues[i], 2);
    }
    //TODO Might be a mistake
    this.critic.propagate(this.learningRate, 0, true, criticGradients);

    let actorLoss = this.mean(-this.critic.activate([...state, ...this.actor.activate(state)]));
    let gradients = this.actor.activate(state);
    gradients[action] += actorLoss;
    this.actor.propagate(this.learningRate, 0, true, gradients);

    //Learning the actorTarget and criticTarget networks
    let actorParameters = this.actor.activate(state);
    let actorTargetParameters = this.actorTarget.activate(state);
    let criticParameters = this.critic.activate([...state, ...action]);
    let criticTargetParameters = this.criticTarget.activate([...state, ...action]);
    for (let i = 0; i < actorParameters.length; i++) {
      actorTargetParameters[i] = (this.tau * actorParameters[i] + (1 - this.tau) * actorTargetParameters);
    }
    for (let i = 0; i < criticParameters.length; i++) {
      criticTargetParameters[i] = (this.tau * criticParameters[i] + (1 - this.tau) * criticTargetParameters);
    }
    this.actorTarget.propagate(this.learningRate, 0, true, actorTargetParameters);
    this.criticTarget.propagate(this.learningRate, 0, true, criticTargetParameters);
  },

  /**
   * This method returns the index of the element with the highest value
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
   * This method returns the mean value from an array.
   * @param {number[]} arr input array
   * @returns {number} mean value
   */
  mean: function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum / arr.length;
  }
};

module.exports = DDPG;
