const DQN = require('../../../../src/architecture/rl/dqn.js');
const Network = require('../../../../src/architecture/network');
const {expect} = require('chai');

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
  it('test learning capabilities', function () {
    let agent = new DQN(1, 2, {gamma: 0.3, hidden: [4], explore: 0});

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

    expect(rewardSum / windowSize >= 0.9).to.be.true;
  });

  it('Should accept a custom network as a constructor option', function () {
    const LSTM_NET = new Network.architecture.LSTM(2, 10, 10, 2);
    const agent = new DQN(2, 2, {network: LSTM_NET});

    expect(agent.network).equal(LSTM_NET)
  });

  // it('getMaxValueIndex', function() {
  //   for (let testIteration = 0; testIteration < 100; testIteration++) {
  //     let randomArray = [];
  //     for (let i = 0; i <= 100; i++) {
  //       randomArray[i] = i;
  //     }
  //
  //     function shuffle(a) {
  //       let j, x, i;
  //       for (i = a.length - 1; i > 0; i--) {
  //         j = Math.floor(Math.random() * (i + 1));
  //         x = a[i];
  //         a[i] = a[j];
  //         a[j] = x;
  //       }
  //       return a;
  //     }
  //
  //     let randomArrayShuffled = shuffle(randomArray);
  //
  //     expect(randomArrayShuffled[DQN.getMaxValueIndex(randomArrayShuffled)]).equal(100);
  //   }
  // });
});
