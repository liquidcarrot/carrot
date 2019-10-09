const GPU  = require("./gpu.js");

// Sigmoidal GPU Kernel
{
  // 512 Weights
  const weights = Array.from({
    length: 2
  }, function() {
    return Math.random() * 2 - 1; // -1 < x < 1
  });
  // 512 Numbers
  const results = Array.from({
    length: 2
  }, function() {
    return Math.random() * 200 - 100; // -100 < x < 100
  });

  console.log(weights.length);
  console.log(results.length);

  console.log(weights);
  console.log(results);

  // GPU Kernel: Sigmoidal Function
  const sigmoid = gpu.createKernel(function(W, X) {
    return W[this.thread.x] * X[this.thread.x];
  }).setOutput([2]);

  const output = sigmoid(weights, results);

  console.log(output);
}

// Basic GPU Kernel
if(false) {
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
}
