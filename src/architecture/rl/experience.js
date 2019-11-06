/**
 * Creates an experience object
 *
 * @param state the current state
 * @param action the current action
 * @param reward the reward for the current action in the current state
 * @param nextState the state following by the current action in the current state
 * @param isFinalState Does the game ends at this state?
 * @constructor
 */
function Experience(state, action, reward, nextState, isFinalState) {
  this.state = state;
  this.action = action;
  this.reward = reward;
  this.nextState = nextState;
  this.isFinalState = isFinalState;
  this.loss = 0;
}

module.exports = Experience;
