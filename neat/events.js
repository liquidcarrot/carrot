let EventEmitter = require('eventemitter3');

let testing = {
  cantor: false,
  utilities: false,
  connection00: false,
}

/**
* Cantor Pairing Function
*
* - https://en.wikipedia.org/wiki/Pairing_function#Cantor_pairing_function
* - http://szudzik.com/ElegantPairing.pdf
* - https://www.cs.upc.edu/~alvarez/calculabilitat/enumerabilitat.pdf
*/
Math.cantor = function(a, b) {
  return (a + b) * (a + b + 1) / 2 + b || undefined;
}

/**
* Utilities
*/
let _ = function() {}

/**
* @returns Returns `true` if a value is `undefined || null`
*/
_.isNil = function(value) { return value == undefined; }

/**
* @returns Returns `true` if a value is not `undefined || null`
*/
_.nisNil = function(value) { return value != undefined; }

_.isError = function(value) { return value instanceof Error; }

_.nisError = function(value) { return !(value instanceof Error); }

/**
* Returns the first value that is not undefined or an error
*/
_.first = function(...values) {
  for (let value = 0; value < values.length; value++) {
    if (_.nisNil(values[value]) && _.nisError(values[value])) return values[value];
  }
  return undefined;
}

/**
* Used to create default options in function definitions
*
* @returns Returns the value of `options[key]` iff it exists, otherwise returns `value`
*/
_.option = function(options, key, ...values) {
  if (_.nisNil(options) && _.nisNil(options[key])) return options[key];
  else return _.first(...values);
}

_.construct = function(options, key, contructor) {}

let random = function() {};
random.weight = function() { return Math.random() * 2 - 1; };

/**
* Connection - in deep learning (context #1)
* Dendrite/Axons - in neuroscience (context #2)
* Edge - in graph theory (context #3)
* Relationship - in sociology (context #4)
*/

// Interpretation #0 & Implementation #0 - Basic Deep Learning & Simple Implementation
// Implementation/interpretation combination The `Connection` class just
// stores the weight (i.e. importance) of the connection (i.e. relationship)
// between two nodes (i.e. neurons). These "weights" are updated using various
// methods to create a "better" network (i.e. flow of information). Networks
// like these, which only store/update a `weight`, can help each node solve
// the problem of "what information to value more, given a flow of
// information", but assumes and expect there to be a pre-existing
// structure (network) and flow of information. These types of
// networks do not answer the questions of "how to process information",
// "when to process information", and "what information to process".
// These types of connections are the most common today and were the
// the first types of connections in the space. In this implementation,
// the `Connection` class serves as just a way to track this `weight`.
function Connection00(options={}) {
  // `id`, `from`, and `to` are the only 3 properties that are common/shared
  // across all 3 contexts.
  this.from = _.option(options, "from", {});
  this.to = _.option(options, "to", {});
  this.id = _.option(options, "id", Math.cantor(this.from.id, this.to.id));

  this.weight = _.option(options, "weight", random.weight());
}

// Interpretation #0 & Implementation #1 - Basic Deep Learning & Useful Implementation
// In this implementation we allow a person to have a stronger API, where
// they can subscribe to events, and use a callback, async/await, promise, or
// synchronous API consumption paradigm.
// @fires connection_created
// @fires connection_updated
// @fires connection_deleted
function Connection01(options={}) {
  EventEmitter.call(this);

  this.from = _.option(options, "from", {});
  this.to = _.options(options, "to", {});
  this.id = _.option(options, "id", Math.cantor(from.id, to.id)); // Assumes that `from` and `to` are objects that have an `id` key

  this.state = {};
  this.state.weight = _.option(options, "weight", random.weight());

  // @fires weight_set
  this.setState = function setState(options={}) {
    this.emit("connection_updated", this.state);
    return this.state
  }
}
Connection01.prototype = Object.create(EventEmitter.prototype);
Connection01.prototype.constructor = Connection01;

// Interpretation #1 & Implementation #0 - Advanced Graph & Network Theory meet Deep Learning
// In this scenario, any set of objects can be related to any other set of
// objects. In a directed graph (e.g. neural networks) a policy can be defined
// to map the source to the destination.

// TEST: Cantor Pairing
if (testing.cantor) {
  let pairs = []; // Store Cantor Pairs

  // Create Cantor Pairs for every (integer) point in a 10x10 coordinate plane
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      pairs.push(Math.cantor(x,y));
    }
  }

  // Logs Cantor Pairs
  console.log(pairs);
}

// TEST: Utilities
if (testing.utilities) {
  console.log(_.isNil());
  console.log(_.isNil(undefined));
  console.log(_.isNil(null));
  console.log(_.nisNil());
  console.log(_.nisNil(undefined));
  console.log(_.nisNil(null));
  console.log(_.option({ a: 1 }, "a", 34));
  console.log(_.option({ a: 1 }, "b", 34));
  console.log(_.option(undefined, "b", 34));
}

// TEST: Connection00
if (testing.connection00) {
  let connection0 = new Connection00();
  let connection1 = new Connection00({ id: 12, from: 3, to: 1 });
  let connection2 = new Connection00({ weight: 0.3 });

  console.log(connection0);
  console.log(connection1);
  console.log(connection2);
}

if (testing.connection01) {}
