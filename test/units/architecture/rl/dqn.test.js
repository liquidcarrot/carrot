const DQN = require('../../../../src/architecture/rl/dqn.js');
const Network = require('../../../../src/architecture/network');
const Utils = require("../../../../src/util/utils");
const {expect,assert} = require('chai');

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


function testEquality (original, copied) {
  if(original === null && copied===null){
    return;
  }
  for (let  j = 0; j < 50; j++) {
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
      : 'Original and standalone networks are not the same!'
    );
  }
}

function testAgentEquality(agent, copy) {
  testEquality(agent.network,copy.network);
  testEquality(agent.networkB,copy.networkB);

  expect(agent.gamma).equal(copy.gamma);
  expect(agent.isUsingPER).equal(copy.isUsingPER);
  expect(agent.isTraining).equal(copy.isTraining);
  expect(agent.tdErrorClamp).equal(copy.tdErrorClamp);
  expect(agent.learningStepsPerIteration).equal(copy.learningStepsPerIteration);
  expect(agent.replayBuffer).equal(copy.replayBuffer);

  expect(agent.explore).equal(copy.explore);
  expect(agent.exploreDecay).equal(copy.exploreDecay);
  expect(agent.exploreMin).equal(copy.exploreMin);

  expect(agent.learningRate).equal(copy.learningRate);
  expect(agent.learningRateDecay).equal(copy.learningRateDecay);
  expect(agent.learningRateMin).equal(copy.learningRateMin);
  expect(agent.learningRateB).equal(copy.learningRateB);
  expect(agent.learningRateBDecay).equal(copy.learningRateBDecay);
  expect(agent.learningRateBMin).equal(copy.learningRateBMin);
}

describe('DQN', function () {
  it('Object creation', function () {
    for (let i = 0; i < 100; i++) {
      let numStates = Math.floor(Math.random() * 100 + 1);
      let numActions = Math.floor(Math.random() * 100 + 1);
      let agent = new DQN(numStates, numActions, {});

      expect(agent.network.input_size).to.equal(numStates);
      expect(agent.network.output_size).to.equal(numActions);
    }
  });
  it('test learning capabilities with normal DQN with PER', function() {
    let agent = new DQN(1, 2, {
      gamma: 0.3,
      hidden: [4],
      explore: 0,
      isDoubleDQN: false,
    });
    expect(testLearning(agent) >= 0.9).to.be.true;
  });

  it('test learning capabilities with Double-DQN with PER', function() {
    let agent = new DQN(1, 2, {
      gamma: 0.3,
      hidden: [4],
      explore: 0,
      isDoubleDQN: true,
    });
    expect(testLearning(agent) >= 0.9).to.be.true;
  });

  it('test learning capabilities with normal DQN without PER', function() {
    let agent = new DQN(1, 2, {
      gamma: 0.3,
      hidden: [4],
      explore: 0,
      isDoubleDQN: false,
      isUsingPER: false,
    });
    expect(testLearning(agent) >= 0.9).to.be.true;
  });

  it('test learning capabilities with Double-DQN without PER', function() {
    let agent = new DQN(1, 2, {
      gamma: 0.3,
      hidden: [4],
      explore: 0,
      isDoubleDQN: true,
      isUsingPER: false,
    });
    expect(testLearning(agent) >= 0.9).to.be.true;
  });

  it('toJSON - fromJSON', function() {
    this.timeout(10000);
    for(let i = 0; i < 5;i++){
      let numStates = Math.floor(Math.random() * 50 + 1);
      let numActions = Math.floor(Math.random() * 50 + 1);
      let hiddenNeurons = [Utils.randomInt(1,100),Utils.randomInt(1,100)];

      let agent = new DQN(numStates, numActions, {
        hiddenNeurons: hiddenNeurons,
        gamma: Math.random(),
        tdErrorClamp: 0.6,
        learningStepsPerIteration: Utils.randomInt(20,50),
        noisyPER: Math.random(),
        experienceSize: Utils.randomInt(1000,50000),
        isUsingPER: true,
        isDoubleDQN: true,
        explore: Math.random(),
        exploreDecay: Math.random(),
        exploreMin: Math.random()/10,
        learningRate: Math.random(),
        learningRateDecay: Math.random(),
        learningRateMin: Math.random()/10,
        learningRateB: Math.random(),
        learningRateBDecay: Math.random(),
        learningRateBMin: Math.random() /10,
      });

      testAgentEquality(agent, DQN.fromJSON(agent.toJSON()));
    }
  });
});
