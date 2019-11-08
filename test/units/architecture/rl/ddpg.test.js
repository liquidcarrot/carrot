const DDPG = require('../../../../src/architecture/rl/ddpg.js');
const Network = require('../../../../src/architecture/network');
const {expect} = require('chai');

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
    let agent = new DDPG(1, 2, {
      gamma: 0.3,
      explore: 0,
    });
    expect(testLearning(agent) >= 0.9).to.be.true;
  });

  it('Should accept a custom network as a constructor option', function() {
    const actorNet = new Network.architecture.LSTM(2, 10, 10, 2);
    const criticNet = new Network.architecture.LSTM(4, 10, 10, 2);
    const agent = new DDPG(2, 2, {actor: actorNet, critic: criticNet});

    expect(agent.actor).equal(actorNet);
    expect(agent.critic).equal(criticNet);
  });
});
