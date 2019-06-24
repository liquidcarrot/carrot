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
       error: 0.0000005,
       elitism: 5,
       mutation_rate: 0.5,
       // cost: () => {
       //   console.warn('The custom error function is running!!!!');
       //   return 0;
       // }
       // cost: (targets, outputs) => {
       //   const error = outputs.reduce(function(total, value, index) {
       //     return total += Math.pow(targets[index] - outputs[index], 2);
       //   }, 0);
       //
       //   return error / outputs.length;
       // }
       cost: (targets, outputs) => {
         const error = outputs.reduce(function(total, value, index) {
           return total += Math.abs(value);
         }, 0);

         return error / outputs.length;
       }
   });

   // and it works!
   console.log(network.activate([0,0])); // 0.2413
   console.log(network.activate([0,1])); // 1.0000
   console.log(network.activate([1,0])); // 0.7663
   console.log(network.activate([1,1])); // 0.008
}

execute();
