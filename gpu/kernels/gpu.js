// Creates a centralized kernel/interface to GPU
const { GPU }  = require("gpu.js");

// Centralized GPU Kernel
const gpu = new GPU();

module.exports = gpu;
