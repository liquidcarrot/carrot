const CONNECTION = require('./kernels/connections');
const ACTIVATION = require('./kernels/activations');

// Createing and testing the following network.
//        O
//      /  \
//    /     O
//  /     /
// O -- O
//  \    \
//   \    0
//    \  /
//     O

const TESTING = {
  CONNECTION_WEIGHT: false,
  CONNECTION_CYCLICAL: true
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
  // console.log(CONNECTION[0]);
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
