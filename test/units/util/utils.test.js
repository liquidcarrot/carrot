const {expect} = require('chai');
const Utils = require('../../../src/util/utils');

describe('Utils', function() {
  it('getMaxValueIndex', function() {
    for (let testIteration = 0; testIteration < 100; testIteration++) {
      let arr = [];
      for (let i = 0; i <= 100; i++) {
        arr[i] = i;
      }

      let shuffled = Utils.shuffle(arr);
      expect(shuffled[Utils.getMaxValueIndex(shuffled)]).equal(100);
    }
  });
});
