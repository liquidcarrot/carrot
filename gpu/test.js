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
  CONNECTION_WEIGHT: true,
  CONNECTION_CYCLICAL: false
}

if(TESTING.CONNECTION_WEIGHT) {
  console.log("Testing 'Weighted Sum' Connection GPU Kernel\n");

  // Fake Weights and Values
  const W = Array.from({ length: 1048576 }, () => Math.random() * 2 - 1);
  const X = Array.from({ length: 1048576 }, () => Math.random() * 20 - 10);

  // Logs Weights and Values
  console.log(W); console.log(X); console.log();

  // Log GPU Kernel
  // console.log(CONNECTION[0]);
  // console.log(`Kernel: ${CONNECTION[0].toString()}`);

  // Get Weighted Sum
  const results = CONNECTION[0](W, X);

  // Log Weighted Sum
  console.log(results);
}
