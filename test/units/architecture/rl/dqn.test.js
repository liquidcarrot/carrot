const DQN = require('../../../../src/architecture/rl/dqn.js');
const Window = require('../../../../src/util/window');
const {expect} = require('chai');

describe('DQN', function () {
  it('Object creation', function () {
    this.timeout(2000);
    for (let i = 0; i < 100; i++) {
      let opt = {
        'hidden': [Math.floor(Math.random() * 30 + 1)],
      };
      let actions = Math.floor(Math.random() * 100 + 1);
      let states = Math.floor(Math.random() * 100 + 1);
      let agent = new DQN(actions, states, opt);

      expect(agent.network.input_size).to.equal(states);
      expect(agent.network.output_size).to.equal(actions);
      expect(agent.network.nodes.length).to.equal((actions + states + opt.hidden[0]));
    }
  });
  it('test learning capabilities', function () {
    this.timeout(10000);
    let agent = new DQN(2, 1, {gamma: 0.3, hidden: [4], epsilon: 0});

    let currentState = 0.5;
    let lastState = currentState;
    let currentLoss;
    let rewardWindow = new Window(100);
    let i = 0;
    while (i < 100 || rewardWindow.getAverage() < 0.6) {
      i++;

      let action = agent.act([currentState]);
      currentState = action === 1 ?
        Math.min(1, currentState + 0.5) :
        Math.max(0, currentState - 0.5);

      let reward = currentState === lastState ? -1 : 1;
      rewardWindow.add(reward);
      currentLoss = agent.learn(reward);
      lastState = currentState;
    }
    expect(rewardWindow.getAverage() >= 0.6).to.be.true;
  });
});
