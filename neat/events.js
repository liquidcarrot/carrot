let testing = {
  cantor: false,
  utilities: false,
}

/**
* Cantor Pairing Function
*
* - https://en.wikipedia.org/wiki/Pairing_function#Cantor_pairing_function
* - http://szudzik.com/ElegantPairing.pdf
* - https://www.cs.upc.edu/~alvarez/calculabilitat/enumerabilitat.pdf
*/
Math.cantor = function(a, b) {
  return (a + b) * (a + b + 1) / 2 + b;
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

/**
* Used to create default options in function definitions
*
* @returns Returns the value of `options[key]` iff it exists, otherwise returns `value`
*/
_.option = function(options, key, value) {
  if (_.nisNil(options) && _.nisNil(options[key])) return options[key];
  else return value;
}

_.contruct = function(options, key, contructor) {}

let random = function() {};
random.weight = function() { return Math.random() * 2 - 1; };

/**
* Connection - in deep learning (context #1)
* Dendrite/Axons - in neuroscience (context #2)
* Edge - in graph theory (context #3)
* Relationship - in sociology (context #4)
*/
function Connection(options={}) {
  // `id`, `from`, and `to` are the only 3 properties that are common/shared
  // across all 3 contexts.
  this.id = _.option(options, "id");
  this.from = _.option(options, "from");
  this.to = _.options(options, "to");
  
  // Interpretation #1 - Basic Deep Learning
  // Connections just store the weight (importance) of the connection 
  // (flow of information) between two nodes (neurons). These "weights"
  // are updated using various methods to create a "better" network
  // (analysis/flow of information). These types of networks can help 
  // each node (person/neuron) solve the problem of "what information 
  // to value more", but assumes and expect there to be a pre-existing
  // structure (network) and flow of information. These types of 
  // networks do not answer the questions of "how to process information",
  // "when to process information", and "what information to process".
  // These types of connections are the most common today and were the 
  // the first types of connections in the space.
  this.weight = _.option(options, "weight", random.weight());
}


  


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
