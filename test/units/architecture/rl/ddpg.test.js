const DDPG = require('../../../../src/architecture/rl/ddpg.js');
const Network = require('../../../../src/architecture/network');
const {expect, assert} = require('chai');
const Utils = require('../../../../src/util/utils');


function testEquality(original, copied) {
  if (original === null && copied === null) {
    return;
  }
  for (let j = 0; j < 50; j++) {
    let input = [];
    for (let a = 0; a < original.input_size; a++) {
      input.push(Math.random());
    }

    let ORout = original.activate(input);
    let COout = copied instanceof Network ? copied.activate(input) : copied(input);

    for (let a = 0; a < original.output; a++) {
      ORout[a] = ORout[a].toFixed(9);
      COout[a] = COout[a].toFixed(9);
    }
    assert.deepEqual(ORout, COout, copied instanceof Network
      ? 'Original and JSON copied networks are not the same!'
      : 'Original and standalone networks are not the same!',
    );
  }
}

function testAgentEquality(agent, copy) {
  testEquality(agent.actor, copy.actor);
  testEquality(agent.critic, copy.critic);
  testEquality(agent.actorTarget, copy.actorTarget);
  testEquality(agent.criticTarget, copy.criticTarget);

  expect(agent.gamma).equal(copy.gamma);
  expect(agent.theta).equal(copy.theta);
  expect(agent.isUsingPER).equal(copy.isUsingPER);
  expect(agent.isTraining).equal(copy.isTraining);
  expect(agent.learningStepsPerIteration).equal(copy.learningStepsPerIteration);

  expect(agent.replayBuffer.buffer).equal(copy.replayBuffer.buffer);
  expect(agent.replayBuffer.maxSize).equal(copy.replayBuffer.maxSize);
  expect(agent.replayBuffer.noiseRate).equal(copy.replayBuffer.noiseRate);
  expect(agent.replayBuffer.sumOfAbsLosses).equal(copy.replayBuffer.sumOfAbsLosses);

  expect(agent.explore).equal(copy.explore);
  expect(agent.exploreDecay).equal(copy.exploreDecay);
  expect(agent.exploreMin).equal(copy.exploreMin);

  expect(agent.learningRateActor).equal(copy.learningRateActor);
  expect(agent.learningRateActorDecay).equal(copy.learningRateActorDecay);
  expect(agent.learningRateActorMin).equal(copy.learningRateActorMin);

  expect(agent.learningRateCritic).equal(copy.learningRateCritic);
  expect(agent.learningRateCriticDecay).equal(copy.learningRateCriticDecay);
  expect(agent.learningRateCriticMin).equal(copy.learningRateCriticMin);

  expect(agent.learningRateActorTarget).equal(copy.learningRateActorTarget);
  expect(agent.learningRateActorTargetDecay).equal(copy.learningRateActorTargetDecay);
  expect(agent.learningRateActorTargetMin).equal(copy.learningRateActorTargetMin);

  expect(agent.learningRateCriticTarget).equal(copy.learningRateCriticTarget);
  expect(agent.learningRateCriticTargetDecay).equal(copy.learningRateCriticTargetDecay);
  expect(agent.learningRateCriticTargetMin).equal(copy.learningRateCriticTargetMin);
}

function testLearning(agent) {
  let currentState = 0.5;
  let lastState = currentState;
  let currentLoss;
  let windowSize = 100;
  let rewardWindow = [];
  let rewardSum = 0;

  for (let i = 0; i < windowSize || rewardSum / windowSize < 0.9; i++) {
    let action = agent.act([currentState]);
    currentState = action === 1 ?
      Math.min(1, currentState + 0.5) :
      Math.max(0, currentState - 0.5);

    let reward = currentState === lastState ? -1 : 1;
    currentLoss = agent.learn(reward);

    rewardWindow.push(reward);
    rewardSum += reward;
    if (rewardWindow.length > windowSize) {
      rewardSum -= rewardWindow.shift();
    }

    lastState = currentState;
  }

  return rewardSum / windowSize;
}

describe('DDPG', function() {
  it('Object creation', function() {
    this.timeout(10000);
    for (let i = 0; i < 100; i++) {
      let numStates = Math.floor(Math.random() * 100 + 1);
      let numActions = Math.floor(Math.random() * 100 + 1);
      let agent = new DDPG(numStates, numActions, {});

      expect(agent.actor.input_size).to.equal(numStates);
      expect(agent.actor.output_size).to.equal(numActions);

      expect(agent.critic.input_size).to.equal(numStates + numActions);
      expect(agent.critic.output_size).to.equal(numActions);

      expect(agent.actorTarget.input_size).to.equal(numStates);
      expect(agent.actorTarget.output_size).to.equal(numActions);

      expect(agent.criticTarget.input_size).to.equal(numStates + numActions);
      expect(agent.criticTarget.output_size).to.equal(numActions);
    }
  });
  it('test learning capabilities', function() {
    this.timeout(2000);
    let agent = new DDPG(1, 2, {
      gamma: 0.3,
      explore: 0,
    });
    expect(testLearning(agent) >= 0.9).to.be.true;
  });

  it('toJSON - fromJSON', function() {
    this.timeout(10000);
    for (let i = 0; i < 10; i++) {
      let numStates = Math.floor(Math.random() * 50 + 1);
      let numActions = Math.floor(Math.random() * 50 + 1);
      let hiddenNeurons = [Utils.randomInt(1, 100), Utils.randomInt(1, 100)];

      let agent = new DDPG(numStates, numActions, {
        hiddenNeurons: hiddenNeurons,
        gamma: Math.random(),
        theta: Math.random(),
        tdErrorClamp: 0.6,
        learningStepsPerIteration: Utils.randomInt(20, 50),
        noisyPER: Math.random(),
        experienceSize: Utils.randomInt(1000, 50000),
        isUsingPER: true,
        explore: Math.random(),
        exploreDecay: Math.random(),
        exploreMin: Math.random() / 10,
      });

      testAgentEquality(agent, DDPG.fromJSON(agent.toJSON()));
    }
  });
});
