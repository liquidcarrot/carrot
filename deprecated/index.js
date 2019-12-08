let { Suite } = require("benchmark");
let fs = require("fs");

let suite = new Suite();

suite.add('POW - Mult', function() {
  let product = 1000000 * 1000000;
}).add('POW - Math', function() {
  let product = Math.pow(1000000,2);
}).add('POW - Operator', function() {
  let product = 1000000 ** 2;
}).on('cycle', function(event) {
  console.log(String(event.target));
}).on('complete', function() {
  // console.log(this);
  // console.log(this.length);

  let benchmarks = [];

  for(let i = 0; i < this.length; i++) {
    let { name, stats, times, count } = this[i];

    benchmarks.push({ name, stats, times, count });
  }

  console.log(JSON.stringify(benchmarks));

  fs.writeFileSync("./benchmarks.json", JSON.stringify(benchmarks, null, 2))
}).run({ 'async': true });
