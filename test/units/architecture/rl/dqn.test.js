const DQN = require('../../../../src/architecture/rl/dqn.js');
const {expect} = require('chai');

describe('DQN', function () {
  it('Object creation', function () {
    this.timeout(500);
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
    let actions = 2;
    let states = 1;
    let agent = new DQN(actions, states, {});

    const NUM_EPISODES = 2000;

    let currentState = 0.5;
    let lastState = currentState;
    let currentLoss;
    let avgReward = 0;
    for (let i = 0; i < NUM_EPISODES; i++) {
      let action = agent.act([currentState]);
      if (action === 1) {
        currentState += 0.5;
        if (currentState > 1) {
          currentState = 0.5;
        }
      } else {
        currentState -= 0.5;
        if (currentState < 0) {
          currentState = 0;
        }
      }

      let reward = currentState === lastState ? -1 : 1;
      avgReward += reward;
      currentLoss = agent.learn(reward);
      lastState = currentState;
    }
    expect(avgReward / NUM_EPISODES > 0.5).to.be.true;
  });
});
