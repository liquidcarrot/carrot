Array.min = function (array) {
  return Math.min.apply(Math, array);
};

function Window(size) {
  this.v = [];
  this.size = typeof (size) === 'undefined' ? 100 : size;
  this.sum = 0;
}

Window.prototype = {
  add: function(elem) {
    this.v.push(elem);
    if (!isNaN(elem)) {
      this.sum += elem;
      if (this.v.length > this.size) {
        this.sum -= this.v.shift();
      }
    }
    if (this.v.length > this.size) {
      this.v.shift();
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
