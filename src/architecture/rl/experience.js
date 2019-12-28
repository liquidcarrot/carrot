/**
 * Creates an experience object
 *
 * @param {number[]} state the current state
 * @param {int|number[]} action the current action
 * @param {number} reward the reward for the current action in the current state
 * @param {number[]} nextState the state following by the current action in the current state
 * @param {int|number[]} nextAction the action taken in the next state
 * @param {boolean} isFinalState Does the game ends at this state?
 * @constructor
 */
function Experience(state, action, reward, nextState, nextAction, isFinalState) {
  this.state = Array.isArray(state) ? state.slice(0) : state;
  this.action = Array.isArray(action) ? action.slice(0) : action;
  this.reward = reward;
  this.nextState = Array.isArray(nextState) ? nextState.slice(0) : nextState;
  this.nextAction = Array.isArray(nextAction) ? nextAction.slice(0) : nextAction;
  this.isFinalState = isFinalState;
  this.loss = 0;
}

module.exports = Experience;
