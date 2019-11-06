const DQN = require('../../../../src/architecture/rl/dqn.js');
const Network = require('../../../../src/architecture/network');
const {expect} = require('chai');

describe('DQN', function () {
  it('Object creation', function () {
    this.timeout(2000);
    for (let i = 0; i < 10; i++) {
      let actions = Math.floor(Math.random() * 100 + 1);
      let states = Math.floor(Math.random() * 100 + 1);
      let agent = new DQN(actions, states, {});

      expect(agent.network.input_size).to.equal(states);
      expect(agent.network.output_size).to.equal(actions);
    }
  });
  it('test learning capabilities', function () {
    this.timeout(5000);
    let agent = new DQN(2, 1, {gamma: 0.3, hidden: [4], explore: 0});

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
      rewardWindow.push(reward);
      rewardSum += reward;
      if (rewardWindow.length > windowSize) {
        rewardSum -= rewardWindow.shift();
      }
      currentLoss = agent.learn(reward);
      lastState = currentState;
    }

    expect(rewardSum / windowSize >= 0.9).to.be.true;
  });

  it('Should accept a custom network as a constructor option', function () {
    const LSTM_NET = new Network.architecture.LSTM(2, 10, 10, 2);
    const agent = new DQN(2, 2, {network: LSTM_NET});

    expect(agent.network).equal(LSTM_NET)
  })
});
