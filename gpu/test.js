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
  SPLIT_FOR: false, // Utility to split for loops into threads
  CONNECTION_WEIGHT: false,
  CONNECTION_CYCLICAL: false,
  NETWORK_FLAT: false,
  NETWORK_SMALL: true,
  NETWORK_MEDIUM: false,
  NETWORK_LARGE: false,
  NETWORK_MASSIVE: false,
}
const BENCHMARK = {
  ARRAY_SUM: false,
}

if(TESTING.SPLIT_FOR) {

}

// Benchmark: Array Sum
if(BENCHMARK.ARRAY_SUM) {
  const SIZE = 100000; // 100,000 = 10^5
  const numbers = Array.from({ length: SIZE }, () => Math.random() * 1000);

  // For Loop
  let sum = 0;

  let start = new Date();
  for(let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  let end = new Date();

  console.log(`"for" loop finished in ${(end - start) / 1000} seconds`);

  // Native Reduce
  start = new Date();
  numbers.reduce(function(total, number) {
    return total += number;
  }, 0);
  end = new Date();

  console.log(`"[].reduce" finished in ${(end - start) / 1000} seconds`);

  // Recursive Sum - typically breaks the stack trace (i.e. too many function calls)
  // const add = function(array) {
  //   if(array.length > 1) return array[0] + add(array.slice(1));
  //   else return array[0];
  // }
  //
  // start = new Date();
  // add(numbers);
  // end = new Date();
  //
  // console.log(`"[].reduce" finished in ${(end - start) / 1000} seconds`);
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
  const values = Array.from({ length: 7 }, (_, i) => i);
  const connections = [
    [0, 0, 0, 0, 0, 0, 0], // N1 -> N3; N1 -> N4; N1 -> N5;
    [0, 0, 0, 0, 0, 0, 0],  // N2 -> N3; N2 -> N4; N2 -> N5;
    [Math.random(), Math.random(), 0, 0, 0, 0, 0], // N3 -> N6; N3 -> N7;
    [Math.random(), Math.random(), 0, 0, 0, 0, 0], // N4 -> N6; N4 -> N7;
    [Math.random(), Math.random(), 0, 0, 0, 0, 0], // N5 -> N6; N5 -> N7;
    [0, 0, 0, 0, Math.random(), Math.random(), Math.random()], // N6
    [0, 0, 0, 0, Math.random(), Math.random(), Math.random()], // N7
  ];
  const layers = [
    [0,1], // Runs first
    [2, 3, 4], // Runs second
    [5, 6] // Runs third
  ];

  function activate(inputs) {
    const results = [inputs];

    for (let l = 1; l < layers.length; l++) {
      results.push([]);
      for (let n = 0; n < layers[l].length; n++) {
        console.log(values[layers[l][n]] + " " + connections[layers[l][n]]);
      }
    }

    console.log();
    console.log(results);
    console.log();
  }

  activate([3, 2]);

  const mult = GPU.createKernel(function(C, X, L) {
    return C[this.thread.y][this.thread.x];
    // let results = 0;
    // for (let l = 0; l < 3; l++) {
    //   results += C[this.thread.x][this.thread.y];
    // }
    // return results;
  }).setOutput([512]);

  const s = mult(connections, values, layers[1]);

  console.log(s);

  // function(layer, values, connections) {
  //   for (let neuron = 0; neuron < layer; neuron++) {
  //     connections
  //   }
  // }

  // console.log(connections);
  //
  // const addNeuron = GPU.createKernel(function(connections) {
  //   let c = [](connections.length + 1);
  //   return c;
  // }).setOutput([connections.length + 1, connections.length + 1]);
  //
  // const nconnections = addNeuron(connections);
  //
  // console.log(nconnections);

  // console.log(GPU.GPU);
  //
  // const kernel = GPU.createKernel(function(weights, values) {
  //   return weights[this.thread.y][this.thread.x] * values[this.thread.y];
  // }).setOutput([2, 2]);
  //
  // console.log(kernel(weights, values));

  // const flow = [[0], [1,2,3], [4, 5]];
  // const connections = [
  //   // N1 Connections
  //   [0, [0.1], [0.2], [0.3], 0, 0],
  //   // N2 Connections
  //   [0, 0, 0, 0, [0.4], 0],
  //   // N3 Connections
  //   [0, 0, 0, 0, [0.5], [0.6]],
  //   // N4 Connections
  //   [0, 0, 0, 0, 0, [0.7]],
  //   // N5 Connections
  //   [0, 0, 0, 0, 0, 0],
  //   // N6 Connections
  //   [0, 0, 0, 0, 0, 0]
  // ];
  // const values = [
  //   [0, 0],
  //   [0, 0],
  //   [0, 0],
  //   [0, 0],
  //   [0, 0],
  //   [0, 0]
  // ];
  // const methods = [
  //   [0, 0],
  //   [0, 0],
  //   [0, 0],
  //   [0, 0],
  //   [0, 0],
  //   [0, 0],
  // ];

  // const kernel = GPU.createKernel(function(x) {
  //   // return SIGMOID(x);
  //   // return this.ACTIVATIONS.ACTIVATIONS[0](x);
  //   // return 2;
  // }).setOutput([3]);

  // console.log(kernel);
  // console.log(kernel([1,2,3]));
}

// Network: Medium
if(TESTING.NETWORK_MEDIUM) {}

// Network:Large
if(TESTING.NETWORK_LARGE) {}

// Network: Massive
if(TESTING.NETWORK_MASSIVE) {}
