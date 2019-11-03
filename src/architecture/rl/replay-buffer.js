function ReplayBuffer(maxSize){
  this.states = [];
  this.actions =  [];
  this.rewards = [];
  this.nextStates = [];
  this.maxSize = maxSize;
}

ReplayBuffer.prototype = {
  add: function(state,action,reward,nextState){
    if(state.length >= this.maxSize){
      this.states.shift();
      this.actions.shift();
      this.rewards.shift();
      this.nextStates.shift();
    }
    this.states.push(state);
    this.actions.push(action);
    this.rewards.push(reward);
    this.nextStates.push(nextState);
  },
  pickRandom:function(){
    let randomIndex = Math.floor(Math.random() * this.states.length);
    return get(randomIndex);
  },
  get(index){
    return [this.states[index],this.actions[index],this.rewards[index],this.nextStates[index]];
  },
  getLast: function(){
    return get(this.states.length-1);
  }
};

module.exports = ReplayBuffer;
