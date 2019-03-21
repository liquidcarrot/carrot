let _ = require('lodash')

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffleInplace(o) { //v1.0
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

let Trainer = function(network, {
  rate = 0.2,
  iterations = 100000,
  error = 0.005,
  cost = Trainer.cost.MSE,
  crossValidate,
  schedule
} = {}) {
  _.assignIn(this, { network, rate, iterations, error, cost, crossValidate, schedule });

  /*
  // trains any given set to a network
  // @param {Object[]} set
  // @param {Object} [options]
  // @param {Network} [options.network]
  // @param {number} [options.rate]
  // @param {number} [options.iterations]
  // @param {number} [options.error]
  // @param {CostFunction} [options.cost]
  // @param {Object} [options.schedule]
  // @param {number} [options.schedule.every]
  // @param {Object} [options.crossValidate]
  // @param {number} [options.crossValidate.testSize]
  // @param {number} [options.crossValidate.testError]
  this.train = function(set, options) {
    _.assignIn(this, options)
    
    let error = 1;
    let iterations = 0;
    let bucketSize = _.isArray(this.rate) ? Math.floor(this.iterations / this.rate.length) : 0;
    let abort = false;
    let currentRate = this.rate;
    let crossValidate = this.crossValidate ? true : false;
    let testSet;
    let trainSet;

    var start = Date.now();

    if(crossValidate) {
      var numTrain = Math.ceil((1 - this.crossValidate.testSize) * set.length);
      trainSet = set.slice(0, numTrain);
      testSet = set.slice(numTrain);
    }

    var lastError = 0;
    while ((!abort && iterations < this.iterations && error > this.error)) {
      if (crossValidate && error <= this.crossValidate.testError) {
        break;
      }

      var currentSetSize = set.length;
      error = 0;
      iterations++;

//       if (bucketSize > 0) {
//         var currentBucket = Math.floor(iterations / bucketSize);
//         currentRate = this.rate[currentBucket] || currentRate;
//       }

//       if (typeof this.rate === 'function') {
//         currentRate = this.rate(iterations, lastError);
//       }

//       if (crossValidate) {
//         this._trainSet(trainSet, currentRate, cost);
//         error += this.test(testSet).error;
//         currentSetSize = 1;
//       } else {
        error += this._trainSet(set, currentRate, cost);
        currentSetSize = set.length;
//       }

      // check error
//       error /= currentSetSize;
      error /= set.length;
//       lastError = error;

//       if (options) {
//         if (this.schedule && this.schedule.every && iterations %
//           this.schedule.every == 0)
//           abort = this.schedule.do({error: error, iterations: iterations, rate: currentRate});
//         else if (options.log && iterations % options.log == 0) {
//           console.log('iterations', iterations, 'error', error, 'rate', currentRate);
//         }
//         ;
//         if (options.shuffle)
//           shuffleInplace(set);
//       }
    }

    var results = {
      error: error,
      iterations: iterations,
      time: Date.now() - start
    };

    return results;
  }
  */
  
  /**
  * Trains a network on the given set
  *
  * @param {Object[]} set
  * @param {Object} [options]
  * @param {Network} [options.network]
  * @param {number} [options.rate]
  * @param {number} [options.iterations]
  * @param {number} [options.error]
  */
  this.train = function(set, options) {
    _.assignIn(this, options)
    
    let error = 1;
    let iterations = -1;
    let start = new Date();

    while (++iterations < this.iterations && error > this.error) {
      error = this._trainSet(set, this.rate, cost) / set.length;
    }

    return { error, iterations, time: Date.now() - start };
  }

  // trains any given set to a network, using a WebWorker (only for the browser). Returns a Promise of the results.
  this.trainAsync = function(set, options) {
    var train = this.workerTrain.bind(this);
    return new Promise(function (resolve, reject) {
      try {
        train(set, resolve, options, true)
      } catch (e) {
        reject(e)
      }
    })
  }

  /** 
  * Returns the error of one training epoch
  *
  * @param {Object[]} set
  * @param {number} currentRate
  * @param {CostFunction} costFunction
  */
  this._trainSet = function(set, rate, cost) {
    let self = this;
    let error = 0;
    
    _.each(set, function(target) {
      let output = self.network.activate(target.input);
      self.network.propagate(rate, target.output);
      
      error += cost(target.output, output);
    });
    
    return error;
  }

  // tests a set and returns the error and elapsed time
  this.test = function(set, options) {
    var error = 0;
    var input, output, target;
    var cost = options && options.cost || this.cost || Trainer.cost.MSE;

    var start = Date.now();

    for (var i = 0; i < set.length; i++) {
      input = set[i].input;
      target = set[i].output;
      output = this.network.activate(input);
      error += cost(target, output);
    }

    error /= set.length;

    var results = {
      error: error,
      time: Date.now() - start
    };

    return results;
  }

  // trains any given set to a network using a WebWorker [deprecated: use trainAsync instead]
  this.workerTrain = function(set, callback, options, suppressWarning) {
    if (!suppressWarning) {
      console.warn('Deprecated: do not use `workerTrain`, use `trainAsync` instead.')
    }
    var that = this;

    if (!this.network.optimized)
      this.network.optimize();

    // Create a new worker
    var worker = this.network.worker(this.network.optimized.memory, set, options);

    // train the worker
    worker.onmessage = function (e) {
      switch (e.data.action) {
        case 'done':
          var iterations = e.data.message.iterations;
          var error = e.data.message.error;
          var time = e.data.message.time;

          that.network.optimized.ownership(e.data.memoryBuffer);

          // Done callback
          callback({
            error: error,
            iterations: iterations,
            time: time
          });

          // Delete the worker and all its associated memory
          worker.terminate();
          break;

        case 'log':
          console.log(e.data.message);

        case 'schedule':
          if (options && options.schedule && typeof options.schedule.do === 'function') {
            var scheduled = options.schedule.do
            scheduled(e.data.message)
          }
          break;
      }
    };

    // Start the worker
    worker.postMessage({action: 'startTraining'});
  }

  /**
  * Trains an XOR network
  * 
  * @param {number} [iterations]
  * @param {boolean} [log]
  * @param {boolean} [shuffle]
  * @param {CostFunction} [cost]
  */
  this.XOR = function({
    iterations = 100000,
    log = false,
    shuffle = true,
    cost = Trainer.cost.MSE
  } = {}) {
    if(this.network.inputs() != 2 || this.network.outputs() != 1) throw new Error('Incompatible network (2 inputs, 1 output)');

    return this.train([{
      input: [0, 0],
      output: [0]
    }, {
      input: [1, 0],
      output: [1]
    }, {
      input: [0, 1],
      output: [1]
    }, {
      input: [1, 1],
      output: [0]
    }], { iterations, log, shuffle, cost });
  }

  // trains the network to pass a Distracted Sequence Recall test
  this.DSR = function({
    targets = [2, 4, 7, 8],
    distractors = [3, 5, 6, 9],
    prompts = [0, 1],
    length = 24,
    criterion = 0.95,
    iterations = 100000,
    rate = 0.1,
    log = 0,
    schedule = {},
    cost = this.cost || Trainer.cost.CROSS_ENTROPY,
  } = {}) {
    var trial, correct, i, j, success;
    trial = correct = i = j = success = 0;
    var error = 1,
      symbols = targets.length + distractors.length + prompts.length;

    var noRepeat = function (range, avoid) {
      var number = Math.random() * range | 0;
      var used = false;
      for (var i in avoid)
        if (number == avoid[i])
          used = true;
      return used ? noRepeat(range, avoid) : number;
    };

    var equal = function (prediction, output) {
      for (var i in prediction)
        if (Math.round(prediction[i]) != output[i])
          return false;
      return true;
    };

    var start = Date.now();

    while (trial < iterations && (success < criterion || trial % 1000 != 0)) {
      // generate sequence
      var sequence = [],
        sequenceLength = length - prompts.length;
      for (i = 0; i < sequenceLength; i++) {
        var any = Math.random() * distractors.length | 0;
        sequence.push(distractors[any]);
      }
      var indexes = [],
        positions = [];
      for (i = 0; i < prompts.length; i++) {
        indexes.push(Math.random() * targets.length | 0);
        positions.push(noRepeat(sequenceLength, positions));
      }
      positions = positions.sort();
      for (i = 0; i < prompts.length; i++) {
        sequence[positions[i]] = targets[indexes[i]];
        sequence.push(prompts[i]);
      }

      //train sequence
      var distractorsCorrect;
      var targetsCorrect = distractorsCorrect = 0;
      error = 0;
      for (i = 0; i < length; i++) {
        // generate input from sequence
        var input = [];
        for (j = 0; j < symbols; j++)
          input[j] = 0;
        input[sequence[i]] = 1;

        // generate target output
        var output = [];
        for (j = 0; j < targets.length; j++)
          output[j] = 0;

        if (i >= sequenceLength) {
          var index = i - sequenceLength;
          output[indexes[index]] = 1;
        }

        // check result
        var prediction = this.network.activate(input);

        if (equal(prediction, output))
          if (i < sequenceLength)
            distractorsCorrect++;
          else
            targetsCorrect++;
        else {
          this.network.propagate(rate, output);
        }

        error += cost(output, prediction);

        if (distractorsCorrect + targetsCorrect == length)
          correct++;
      }

      // calculate error
      if (trial % 1000 == 0)
        correct = 0;
      trial++;
      var divideError = trial % 1000;
      divideError = divideError == 0 ? 1000 : divideError;
      success = correct / divideError;
      error /= length;

      // log
      if (log && trial % log == 0)
        console.log('iterations:', trial, ' success:', success, ' correct:',
          correct, ' time:', Date.now() - start, ' error:', error);
      if (schedule.do && schedule.every && trial % schedule.every == 0)
        schedule.do({
          iterations: trial,
          success: success,
          error: error,
          time: Date.now() - start,
          correct: correct
        });
    }

    return {
      iterations: trial,
      success: success,
      error: error,
      time: Date.now() - start
    }
  }

  // train the network to learn an Embeded Reber Grammar
  this.ERG = function(options) {

    options = options || {};
    var iterations = options.iterations || 150000;
    var criterion = options.error || .05;
    var rate = options.rate || .1;
    var log = options.log || 500;
    var cost = options.cost || this.cost || Trainer.cost.CROSS_ENTROPY;

    // gramar node
    var Node = function () {
      this.paths = [];
    };
    Node.prototype = {
      connect: function (node, value) {
        this.paths.push({
          node: node,
          value: value
        });
        return this;
      },
      any: function () {
        if (this.paths.length == 0)
          return false;
        var index = Math.random() * this.paths.length | 0;
        return this.paths[index];
      },
      test: function (value) {
        for (var i in this.paths)
          if (this.paths[i].value == value)
            return this.paths[i];
        return false;
      }
    };

    var reberGrammar = function () {

      // build a reber grammar
      var output = new Node();
      var n1 = (new Node()).connect(output, 'E');
      var n2 = (new Node()).connect(n1, 'S');
      var n3 = (new Node()).connect(n1, 'V').connect(n2, 'P');
      var n4 = (new Node()).connect(n2, 'X');
      n4.connect(n4, 'S');
      var n5 = (new Node()).connect(n3, 'V');
      n5.connect(n5, 'T');
      n2.connect(n5, 'X');
      var n6 = (new Node()).connect(n4, 'T').connect(n5, 'P');
      var input = (new Node()).connect(n6, 'B');

      return {
        input: input,
        output: output
      }
    };

    // build an embeded reber grammar
    var embededReberGrammar = function () {
      var reber1 = reberGrammar();
      var reber2 = reberGrammar();

      var output = new Node();
      var n1 = (new Node).connect(output, 'E');
      reber1.output.connect(n1, 'T');
      reber2.output.connect(n1, 'P');
      var n2 = (new Node).connect(reber1.input, 'P').connect(reber2.input,
        'T');
      var input = (new Node).connect(n2, 'B');

      return {
        input: input,
        output: output
      }

    };

    // generate an ERG sequence
    var generate = function () {
      var node = embededReberGrammar().input;
      var next = node.any();
      var str = '';
      while (next) {
        str += next.value;
        next = next.node.any();
      }
      return str;
    };

    // test if a string matches an embeded reber grammar
    var test = function (str) {
      var node = embededReberGrammar().input;
      var i = 0;
      var ch = str.charAt(i);
      while (i < str.length) {
        var next = node.test(ch);
        if (!next)
          return false;
        node = next.node;
        ch = str.charAt(++i);
      }
      return true;
    };

    // helper to check if the output and the target vectors match
    var different = function (array1, array2) {
      var max1 = 0;
      var i1 = -1;
      var max2 = 0;
      var i2 = -1;
      for (var i in array1) {
        if (array1[i] > max1) {
          max1 = array1[i];
          i1 = i;
        }
        if (array2[i] > max2) {
          max2 = array2[i];
          i2 = i;
        }
      }

      return i1 != i2;
    };

    var iteration = 0;
    var error = 1;
    var table = {
      'B': 0,
      'P': 1,
      'T': 2,
      'X': 3,
      'S': 4,
      'E': 5
    };

    var start = Date.now();
    while (iteration < iterations && error > criterion) {
      var i = 0;
      error = 0;

      // ERG sequence to learn
      var sequence = generate();

      // input
      var read = sequence.charAt(i);
      // target
      var predict = sequence.charAt(i + 1);

      // train
      while (i < sequence.length - 1) {
        var input = [];
        var target = [];
        for (var j = 0; j < 6; j++) {
          input[j] = 0;
          target[j] = 0;
        }
        input[table[read]] = 1;
        target[table[predict]] = 1;

        var output = this.network.activate(input);

        if (different(output, target))
          this.network.propagate(rate, target);

        read = sequence.charAt(++i);
        predict = sequence.charAt(i + 1);

        error += cost(target, output);
      }
      error /= sequence.length;
      iteration++;
      if (iteration % log == 0) {
        console.log('iterations:', iteration, ' time:', Date.now() - start,
          ' error:', error);
      }
    }

    return {
      iterations: iteration,
      error: error,
      time: Date.now() - start,
      test: test,
      generate: generate
    }
  }

//   this.timingTask = function(options) {
  this.timingTask = function({
    iterations = 200,
    error = 0.005,
    rate = [0.03, 0.02],
    log = 10,
    cost = this.cost || Trainer.cost.MSE,
    trainingSamples = 7000,
    testSamples = 1000,
  } = {}) {

    if (this.network.inputs() != 2 || this.network.outputs() != 1)
      throw new Error('Invalid Network: must have 2 inputs and one output');

    // helper
    function getSamples(trainingSize, testSize) {

      // sample size
      var size = trainingSize + testSize;

      // generate samples
      var t = 0;
      var set = [];
      for (var i = 0; i < size; i++) {
        set.push({input: [0, 0], output: [0]});
      }
      while (t < size - 20) {
        var n = Math.round(Math.random() * 20);
        set[t].input[0] = 1;
        for (var j = t; j <= t + n; j++) {
          set[j].input[1] = n / 20;
          set[j].output[0] = 0.5;
        }
        t += n;
        n = Math.round(Math.random() * 20);
        for (var k = t + 1; k <= (t + n) && k < size; k++)
          set[k].input[1] = set[t].input[1];
        t += n;
      }

      // separate samples between train and test sets
      var trainingSet = [];
      var testSet = [];
      for (var l = 0; l < size; l++)
        (l < trainingSize ? trainingSet : testSet).push(set[l]);

      // return samples
      return {
        train: trainingSet,
        test: testSet
      }
    }

    // samples for training and testing
    var samples = getSamples(trainingSamples, testSamples);

    // train
    var result = this.train(samples.train, {
      rate: rate,
      log: log,
      iterations: iterations,
      error: error,
      cost: cost
    });

    return {
      train: result,
      test: this.test(samples.test)
    }
  }
}

// Built-in cost functions
Trainer.cost = {
  // Eq. 9
  CROSS_ENTROPY: function (target, output) {
    var crossentropy = 0;
    for (var i in output)
      crossentropy -= (target[i] * Math.log(output[i] + 1e-15)) + ((1 - target[i]) * Math.log((1 + 1e-15) - output[i])); // +1e-15 is a tiny push away to avoid Math.log(0)
    return crossentropy;
  },
  MSE: function (target, output) {
    var mse = 0;
    for (var i = 0; i < output.length; i++)
      mse += Math.pow(target[i] - output[i], 2);
    return mse / output.length;
  },
  BINARY: function (target, output) {
    var misses = 0;
    for (var i = 0; i < output.length; i++)
      misses += Math.round(target[i] * 2) != Math.round(output[i] * 2);
    return misses;
  }
};

module.exports = Trainer