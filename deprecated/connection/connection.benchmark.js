const Connection = require("./connection");
const { Suite } = require("benchmark");

let benchmarks = new Suite();

benchmarks.add('new Connection', function() {
  new Connection();
}).on('cycle', function(event) {
  console.log(String(event.target))
}).on('complete', function() {}).run();
