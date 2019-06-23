let { Network, methods } = require('./src/carrot');

// this network learns the XOR gate (through neuro-evolution)
async function execute () {
  // no hidden layers...
   var network = new Network(2,1);

   // XOR dataset
   var trainingSet = [
       { input: [0,0], output: [0] },
       { input: [0,1], output: [1] },
       { input: [1,0], output: [1] },
       { input: [1,1], output: [0] }
   ];

   await network.evolve(trainingSet, {
       mutation: methods.mutation.FFW,
       equal: true,
       error: 0.0001,
       elitism: 5,
       mutation_rate: 0.5,
       cost: () => {
         return 0;
       }
   });

   // and it works!
   console.log(network.activate([0,0])); // 0.2413
   console.log(network.activate([0,1])); // 1.0000
   console.log(network.activate([1,0])); // 0.7663
   console.log(network.activate([1,1])); // 0.008
}

execute();
