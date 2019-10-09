// Different connection kernels
const GPU  = require("./gpu.js");

// GPU Kernel: Weighted Sum Function
// Takes two Nx1 arrays
// Performs `sum([N, N, ...], [N, N, ...])`, where `N` is a natural number
const weighted = gpu.createKernel(function(W, X) {
  // w * x
  return W[this.thread.x] * X[this.thread.x];
}).setOutput([512]);

// GPU Kernel: Cyclical Sum Function
// Take two Nx1 arrays
// Performs `sum(N * sin(N * N - N)`, where `N` is a natural number
const cyclical = gpu.createKernel(function(W, X) {
  // a * sin(b * x - c)
  return W[this.thread.x][0] * Math.sin(W[this.thread.x][1] * X[this.thread.x] - W[this.thread.x][2]);
}.setOutput([512]);

// [weighted, cyclical]
module.exports = [weighted, cyclical];
