const {expect} = require('chai');
const Utils = require('../../../src/util/utils');

describe('Utils', function() {
  it('getMaxValueIndex', function() {
    for (let testIteration = 0; testIteration < 100; testIteration++) {
      let randomArray = [];
      for (let i = 0; i <= 100; i++) {
        randomArray[i] = i;
      }

      let randomArrayShuffled = Utils.shuffle(randomArray);
      expect(randomArrayShuffled[Utils.getMaxValueIndex(randomArrayShuffled)]).equal(100);
    }
  });
});
