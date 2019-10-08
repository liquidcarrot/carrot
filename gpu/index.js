const { GPU }  = require("gpu.js");

const gpu = new GPU();

const SIZE = 512;

const A = Array.from({
  length: 512
}, function() {
  return Array.from({
    length: 512
  }, function() {
    return Math.random() * 2 - 1;
  });
});

const B = Array.from({
  length: 512
}, function() {
  return Array.from({
    length: 512
  }, function() {
    return Math.random() * 2 - 1;
  });
});

console.log(A);
console.log(B);

const dotProduct = gpu.createKernel(function(a, b) {
  let sum = 0;
  for(let t = 0; t < 512; t++) {
    sum += a[this.thread.x][t] * b[t][this.thread.x];
  }
  return sum;
}).setOutput([512, 512]);

console.log(dotProduct);

const C = dotProduct(A, B);

console.log(C);












































// GPU Acceleration:
// - OpenGL
// - WebGL
// - OpenCL
// - DirectX
// - Vulkan (Doom)
// - Direct3D
// - Metal
// - SDL
//
// GPU JS Libraries:
// - GPU.js
// - gl
// - regl
// - node-webgl
// - node-gles (https://github.com/google/node-gles)
// - CL.js (https://github.com/graphistry/cljs) - Manage GPUs from Node.js or JavaScript
// - Node OpenCL (https://github.com/mikeseven/node-opencl) - Used by (https://github.com/jeffallen6767/chain)
// - Node GPU (https://github.com/kuebk/node-gpu) - GPU Support in Node.js & JavaScript (only AMD/ADL3/ATI - not NVIDIA)
//
// GPU JS Examples:
// - Chain (https://github.com/jeffallen6767/chain) - Blockchain Mining in JS
//
// CUDA Code Examples:
// - Multi GPU Programming Models (https://github.com/NVIDIA/multi-gpu-programming-models)
//
// GPU Hosting Providers:
// - Paperspace (https://www.paperspace.com/)
// - LeaderGPU (https://www.leadergpu.com/)
// - GPU Eater (https://www.gpueater.com/) - Hosted at Oak Ridge National Laboratory; Emily Costa is associated.
//
// Image Processing Resources:
// - (https://github.com/bigsnarfdude/tfjs-node-webgl-gpu-example) - Has an example code snippet of serializing .jpegs for NN consumption.
//
// Miscellaneous GPU Code:
// - Nodes Info (https://github.com/twuilliam/nodes-info) - Educational resources on creating/managing GPU clusters
// - Node.js2CUDA (https://github.com/packetlost/node-js2cuda) - Pure JavaScript for CUDA Compilation: Translates JS code to CUDA and launches compiled code on GPU
//
// JavaScript Code Parsing Utilities:
// - Esprima (https://esprima.org/) - ES Parsing Infrastructure for Analysis
// - Estraverse (https://github.com/estools/estraverse) - ES Traversal Function
// - ESQuery (https://github.com/estools/esquery) - Query Language for Esprima AST Output
// - AST Types (https://github.com/benjamn/ast-types) - Esprima Compatible AST Types
//
// Python GPU Examples:
// - DIGITS (https://github.com/NVIDIA/DIGITS) - A curation of different techniques for detecting hand-written digits.
// - Fast.ai (https://github.com/fastai/fastai) - A Python Deep Learning Framework
// - NeuralMT (https://github.com/zomux/neuralmt) -  Large-scale NN training on multiple node/GPUs
//
// Python GPU Tools:
// - GPU Stat (https://github.com/wookayin/gpustat) - GPU Query & Monitoring Tool
