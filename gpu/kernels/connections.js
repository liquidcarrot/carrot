// Different connection kernels
const GPU  = require("./gpu");

// By default attempts to run kernels accurately with low memory footprint
// and support for variable sized parameters and outputs
// ***NOTE*** THIS DOES NOT WORK!!!
// ***NOTE*** THE DOCUMENTATION IS AHEAD OF THE CODE AND THIS IS NOT YET SUPPORTED
// ***NOTE*** DO NOT USE A SETTINGS OBJECT!
// ***NOTE*** THIS IS HERE FOR TESTING PURPOSES !!!ONLY!!!
const SETTINGS = {
  tactic: "performance", // Forces GPU to perform accurate calculations
  optimizeFloatMemory: true, // Optimizes GPU memory usage for Floating Point operations
  dynamicArguments: true, // Allows kernels to take in variable sized and nested arrays of arguments/parameters
  dynamicOutput: true, // Allows kernels to output variable sized arrays of numbers
  output: [512] // Default output size
}

// GPU Kernel: Weighted Sum Function
// Takes two Nx1 arrays
// Performs `sum([N, N, ...], [N, N, ...])`, where `N` is a natural number
// Returns a raw GPU Memory Buffer
// GPU Memory Buffers repeat output until the output size if filled - it's
// important to track the desired output array shape (i.e. sizes, dimensions, etc.)
// so it can be sliced.
const _weighted = GPU.createKernel(function(C, X) {
  // C * x
  return C[this.thread.x] * X[this.thread.x];
});
// .setOutput([512]).setDynamicOutput(true);
// }, SETTINGS);

const weighted = function(C, X) {
  const size = X.length;
  // "speed" = lowp = "low precision"
  // "balanced" = midp = "balanced precision"
  // "performance" = highp = "high precision"
  const kernel = _weighted.setOutput([size]).setTactic("speed").setOptimizeFloatMemory(true);

  return kernel(C, X);
};

// GPU Kernel: Cyclical Sum Function
// Take two Nx1 arrays
// Performs `sum(N * sin(N * N - N)`, where `N` is a natural number
const _cyclical = GPU.createKernel(function(C, X) {
  // a * sin(b * x - c)
  return C[this.thread.x][0] * Math.sin(C[this.thread.x][1] * X[this.thread.x] - C[this.thread.x][2]);
});
// .setOutput([512]);
// }, SETTINGS);

const cyclical = function(C, X) {
  const size = X.length;
  const kernel =_cyclical.setOutput([size]).setTactic("speed").setOptimizeFloatMemory(true);

  return kernel(C, X);
};


// [weighted, cyclical]
module.exports = [weighted, cyclical];
module.exports._ = [_weighted, _cyclical]; 
