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

  expect(agent.noiseStandardDeviation).equal(copy.noiseStandardDeviation);
  expect(agent.noiseStandardDeviationDecay).equal(copy.noiseStandardDeviationDecay);
  expect(agent.noiseStandardDeviationMin).equal(copy.noiseStandardDeviationMin);

  expect(agent.learningRateActor).equal(copy.learningRateActor);
  expect(agent.learningRateActorDecay).equal(copy.learningRateActorDecay);
  expect(agent.learningRateActorMin).equal(copy.learningRateActorMin);

  expect(agent.learningRateCritic).equal(copy.learningRateCritic);
  expect(agent.learningRateCriticDecay).equal(copy.learningRateCriticDecay);
  expect(agent.learningRateCriticMin).equal(copy.learningRateCriticMin);
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
    for (let i = 0; i < 10; i++) {
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
  it('test learning capabilities with PER', function() {
    this.timeout(10000);
    console.time('Learning: DDPG, PER');
    let agent = new DDPG(1, 2, {
      gamma: 0.3,
      explore: 0,
      isUsingPER: true,
      noiseStandardDeviation: Utils.randomInt(1, 10) / 10,
      noiseStandardDeviationDecay: Utils.randomInt(1, 10) / 10,
      noiseStandardDeviationMin: Utils.randomInt(1, 10) / 10,
    });
    expect(testLearning(agent) >= 0.9).to.be.true;
    console.timeEnd('Learning: DDPG, PER');
  });

  it('toJSON - fromJSON', function() {
    for (let i = 0; i < 10; i++) {
      let numStates = Math.floor(Math.random() * 50 + 1);
      let numActions = Math.floor(Math.random() * 50 + 1);

      let agent = new DDPG(numStates, numActions, {
        hiddenNeurons: [Utils.randomInt(1, 100), Utils.randomInt(1, 100)],
        gamma: Math.random(),
        theta: Math.random(),
        tdErrorClamp: 0.6,
        learningStepsPerIteration: Utils.randomInt(20, 50),
        noisyPER: Math.random(),
        experienceSize: Utils.randomInt(1000, 50000),
        isUsingPER: true,
        noiseStandardDeviation: Math.random() * 0.3 + 0.1,
        noiseStandardDeviationDecay: Math.random() * 0.7 + 0.1,
        noiseStandardDeviationMin: Math.random() * 0.1 + 0.1,
      });

      testAgentEquality(agent, DDPG.fromJSON(agent.toJSON()));
    }
  });
});
