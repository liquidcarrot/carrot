# ABBest

**Problem**

Often when writing performant TDD code in JavaScript one has to test a bunch of different ideas and methods of implementation to get the best outcome. This can be very time consumingh to do, it's easy to forget which implementation was best and as compilers and interpreters change implementations can become stagnant/stale.

**Idea**
* Write tests
* Write A/B function options
* Write benchmarks
* Dynamically build/export the best A/B function

**Additional Idea**
* Dynamically export the contextually (i.e. browser, node, etc.) best performant A/B function

**API**

```javascript
best([name][, tests], functions[, benchmarks][, output_file]);
```

**Examples**

```javascript
best("square", "./test.js", "./functions.js", "./benchmark.js", "./index.js");
```

```javascript
best("square",
// TESTS
function(module) { // assumes "mocha" & "chai"
  it("should return a number");
  it("should return the square of a number");
},
// FUNCTIONS
[function (a) {
  return a * a;
}, function (a) {
  return a ** 2;
}, function (a) {
  return Math.pow(a, 2);
}],
// BENCHMARKS
{ // assumes benchmark.js"
  context: function(module) {
    // global variables
    let a, b, c;
  },
  before: function(module) {
    // global imports and setup
  },
  beforeEach: function(module) {
    // test setup
    a = Math.random();
  },
  benchmark: function(module) { // assumes "benchmark.js"
    module(a);
  },
  afterEach: function(module) {
    // test cleanup
    a = undefined;
  },
  after: function(module) {
    // logging and cleanup
  },
  done: function(module) {
    // logging and cleanup
  },
  error: function(module) {

  }
});
```
