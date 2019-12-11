/**
 * Creates an experience object
 *
 * @param {number[]} state the current state
 * @param {int|number[]} action the current action
 * @param {number} reward the reward for the current action in the current state
 * @param {number[]} nextState the state following by the current action in the current state
 * @param {int} nextAction the action taken in the next state
 * @param {boolean} isFinalState Does the game ends at this state?
 * @constructor
 */
function Experience(state, action, reward, nextState, nextAction, isFinalState) {
  this.state = state;
  this.action = action;
  this.reward = reward;
  this.nextState = nextState;
  this.nextAction = nextAction;
  this.isFinalState = isFinalState;
  this.loss = 0;
}

module.exports = Experience;
