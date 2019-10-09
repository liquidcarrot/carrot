// Different connection kernels
const GPU  = require("./gpu.js");

// By default attempts to run kernels accurately with low memory footprint
// and support for variable sized parameters and outputs
const SETTINGS = {
  tactic: "performance", // Forces GPU to perform accurate calculations
  optimizeFloatMemory: true, // Optimizes GPU memory usage for Floating Point operations
  dynamicArguments: true, // Allows kernels to take in variable sized and nested arrays of arguments/parameters
  dynamicOutput: true // Allows kernels to output variable sized arrays of numbers
}

// GPU Kernel: Weighted Sum Function
// Takes two Nx1 arrays
// Performs `sum([N, N, ...], [N, N, ...])`, where `N` is a natural number
const weighted = gpu.createKernel(function(W, X) {
  // w * x
  return W[this.thread.x] * X[this.thread.x];
}, SETTINGS;

// GPU Kernel: Cyclical Sum Function
// Take two Nx1 arrays
// Performs `sum(N * sin(N * N - N)`, where `N` is a natural number
const cyclical = gpu.createKernel(function(W, X) {
  // a * sin(b * x - c)
  return W[this.thread.x][0] * Math.sin(W[this.thread.x][1] * X[this.thread.x] - W[this.thread.x][2]);
}, SETTINGS);

// [weighted, cyclical]
module.exports = [weighted, cyclical];
