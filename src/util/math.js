const _ = require("lodash");

let squeeze = (n,m=Number.MAX_VALUE) => Math.abs(n) > Math.abs(m) ? (Math.sign(n) * m) : n;

module.exports.multiply = function(numbers) {
  let total = numbers.reduce((t, n) => t * n, 1);
  
  // REAL MATH
  if(Number.isFinite(total)) return total;
  // FAKE MATH
  else return numbers.reduce(function(total, number) {
    return total * squeeze(number, Math.pow(Number.MAX_VALUE, 1 / numbers.length));
  }, 1);
};

module.exports.sum = function(numbers) {
  let total = numbers.reduce((t, n) => t + n, 0);
  
  // REAL MATH
  if(Number.isFinite(total)) return total;
  //FAKE MATH
  else return numbers.reduce(function(total, number) {
    return total * squeeze(number, Number.MAX_VALUE / numbers.length)
  }, 0)
};