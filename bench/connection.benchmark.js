// CHECK: https://benchmarkjs.com/

const Benchmark = require("benchmark");

let suite = new Benchmark.Suite;

suite.add("new Connection()", function() {
  // Code here...
}).run();