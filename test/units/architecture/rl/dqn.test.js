const DQN = require('../../../../src/architecture/rl/dqn.js');
const {expect} = require('chai');

describe('DQN', function() {
  it('Object creation', function() {
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

      console.log((i + 1) + ' succeded!');
    }
  });
  it('test learning capabilities', function() {
    let actions = 2;
    let states = 1;
    let agent = new DQN(actions, states, {});

    const NUM_EPISODES = 1000;

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

      console.log('Episode: ' + (i + 1));
      console.log('Agent takes action ' + action + ' at state ' + lastState + ' the new state is ' + currentState + ' and received a reward of ' + reward);
      console.log('Loss: ' + currentLoss);

      lastState = currentState;
    }
    console.log(avgReward / NUM_EPISODES);
    expect(avgReward / NUM_EPISODES > 0.6).to.be.true;
  });
});
