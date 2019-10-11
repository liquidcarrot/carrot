// Creates a centralized kernel/interface to GPU
// Kernels are JavaScript functions that been serialized to run ona GPU
const { GPU }  = require("gpu.js");
const { ACTIVATIONS, DERIVATIVES } = require("./activations");

// Centralized GPU Kernel
const gpu = new GPU();

// Adds activation function and derivatives to kernels
for (let i = 0, total = ACTIVATIONS.length; i < total; i++) {
  gpu.addFunction(ACTIVATIONS[i]);
  gpu.addFunction(DERIVATIVES[i]);
}

module.exports = gpu;
