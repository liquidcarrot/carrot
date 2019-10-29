Array.min = function (array) {
  return Math.min.apply(Math, array);
};

function Window(size, removeLowestValues) {
  this.v = [];
  this.removeLowestValues = removeLowestValues;
  this.size = typeof (size) === 'undefined' ? 100 : size;
  this.sum = 0;
}

Window.prototype = {
  add: function (x) {
    this.v.push(x);
    this.sum += x;
    if (this.v.length > this.size) {
      if (this.removeLowestValues) {
        this.v.sort(function (a, b) {
          return Math.abs(a[a.length - 1]) - Math.abs(b[b.length - 1]);
        });
      }
      this.sum -= this.v.shift();
    }
  },
  getAverage: function () {
    return this.sum / this.v.length;
  },
  pickRandom: function () {
    let x = this.v[Math.floor(Math.random() * this.v.length)];
    return x === undefined ? this.v[0] : x;
  },
  reset: function () {
    this.v = [];
    this.sum = 0;
  }
};

module.exports = Window;
