const {expect} = require('chai');
const Utils = require('../../../src/util/utils');

describe('Utils', function() {
  it('getMaxValueIndex', function() {
    for (let testIteration = 0; testIteration < 100; testIteration++) {
      let randomArray = [];
      for (let i = 0; i <= 100; i++) {
        randomArray[i] = i;
      }

      function shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
        }
        return a;
      }

      let randomArrayShuffled = shuffle(randomArray);

      expect(randomArrayShuffled[Utils.getMaxValueIndex(randomArrayShuffled)]).equal(100);
    }
  });
});
