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
  it('randomInt', function() {
    this.timeout(1000);
    let testElements = 100;
    let arr = [];
    for (let i = 0; i <= testElements; i++) {
      arr.push(i);
    }
    while (arr.length > 0) {
      let index = arr.indexOf(Utils.randomInt(0, testElements));
      if (index >= 0) {
        arr.splice(index, 1);
      }
    }
    expect(arr.length).equal(0);
  });
});
