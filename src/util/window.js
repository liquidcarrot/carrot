function Window(size) {
  this.v = [];
  this.size = typeof (size) === 'undefined' ? 100 : size;
}

Window.prototype = {
  add: function(elem) {
    this.v.push(elem);
    if (this.v.length > this.size) {
      this.v.shift();
    }
  },
  pickRandom: function () {
    let x = this.v[Math.floor(Math.random() * this.v.length)];
    return x === undefined ? this.v[0] : x;
  },
  reset: function () {
    this.v = [];
  }
};

module.exports = Window;
