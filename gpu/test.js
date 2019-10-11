// const CONNECTION = require('./kernels/connections');
// const ACTIVATION = require('./kernels/activations');
const GPU = require("./kernels");
const { CONNECTION, ACTIVATION } = GPU;

// Createing and testing the following network.
//        2
//      /  \
//    /     5
//  /     /
// 1 -- 3
//  \    \
//   \    6
//    \  /
//     4

const TESTING = {
  CONNECTION_WEIGHT: false,
  CONNECTION_CYCLICAL: false,
  NETWORK_FLAT: false,
  NETWORK_SMALL: true,
  NETWORK_MEDIUM: false,
  NETWORK_LARGE: false,
  NETWORK_MASSIVE: false,
}

// Connection: Weighted
if(TESTING.CONNECTION_WEIGHT) {
  console.log("Testing 'Weighted Sum' Connection GPU Kernel\n");

  // Size of kernel inputs
  const SIZE =1024; // 10^10

  // Fake Weights and Values
  const W = Array.from({ length: SIZE }, () => Math.random() * 2 - 1);
  const X = Array.from({ length: SIZE }, () => Math.random() * 20 - 10);

  // Logs Weights and Values
  // console.log(W); console.log(X); console.log();

  // Log GPU Kernel
  console.log(CONNECTION[0]);
  // console.log(`Kernel: ${CONNECTION[0].toString()}`);

  // Start Timer
  const start = new Date();

  // Get Weighted Sum
  const results = CONNECTION[0](W, X);

  // End Timer
  const end = new Date();

  // Calculate Elapsed Time
  const elapsed = (end - start) / 1000;

  // Log Weighted Sum
  // console.log(results);

  // Input Size
  console.log(`Input Size: ${SIZE}`);

  // Time Elapsed
  console.log(`Time Elapsed: ${elapsed} seconds`);

  // Floating Point Operations per Second (FLOPs)
  console.log(`Flops: ${((SIZE * 2) / elapsed / 1000000).toFixed(3)} Megaflops`);
}

// Connection: Cyclical
if(TESTING.CONNECTION_CYCLICAL) {
  console.log(CONNECTION._[1]);
}

// Network: Flat
if(TESTING.NETWORK_FLAT) {}

// Network: Small (WIP)
if(TESTING.NETWORK_SMALL) {
  const connections = [
    // N1 Connections
    [0, [0.1], [0.2], [0.3], 0, 0],
    // N2 Connections
    [0, 0, 0, 0, [0.4], 0],
    // N3 Connections
    [0, 0, 0, 0, [0.5], [0.6]],
    // N4 Connections
    [0, 0, 0, 0, 0, [0.7]],
    // N5 Connections
    [0, 0, 0, 0, 0, 0],
    // N6 Connections
    [0, 0, 0, 0, 0, 0]
  ];
  const values = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ];
  const methods = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  console.log(GPU.GPU);


  const kernel = GPU.createKernel(function(x) {
    return SIGMOID(x);
    // return this.ACTIVATIONS.ACTIVATIONS[0](x);
    // return 2;
  }).setOutput([3]);

  console.log(kernel);
  console.log(kernel([1,2,3]));
}

// Network: Medium
if(TESTING.NETWORK_MEDIUM) {}

// Network:Large
if(TESTING.NETWORK_LARGE) {}

// Network: Massive
if(TESTING.NETWORK_MASSIVE) {}
