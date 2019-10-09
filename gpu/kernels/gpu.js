// Creates a centralized kernel/interface to GPU
// Kernels are JavaScript functions that been serialized to run ona GPU
const { GPU }  = require("gpu.js");

// Centralized GPU Kernel
const gpu = new GPU();

module.exports = gpu;
