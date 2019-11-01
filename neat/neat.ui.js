Math.cantor = function(a, b) {
  return (a + b) * (a + b + 1) / 2 + b;
}

function Connection(options={}) {
  this.id = options.id || Math.cantor(options.from, options.to);
  this.from = options.from;
  this.to = options.to;
  this.weight = options.weight || Connection.randomWeight();
}

// Random connection
Connection.createRandom = function(options) {}

// Random weight
Connection.randomWeight = function() {
  return Math.random() * 2 - 1; // -1 < x < 1
}

function Nodes(options={}) {
  this.id = options.id;
}

// @param {string|number} id
// @param {Connection[]|Object[]|number} connections
// @param {Node[]|Object[]|number} nodes
function Network(options={}) {
  // options.id
  this.id = options.id;

  // options.nodes
  this.nodes = [];
  if(options.nodes && typeof options.nodes === "number") {
    for(let node = 0; node < options.nodes; node++) this.nodes.push({
      id: node
      // add other node values here...
    });
  }
  else if(options.nodes && options.nodes instanceof Array) this.nodes = options.nodes.concat();

  // options.connections
  this.connections = [];
  if(options.connections && typeof options.connections === "number")
  else if(options.connections && options.connections instanceof Array) this.connections = options.connections.concat();
   // options.connections ? options.connections.concat() : [];
}

Network.NODES = 0;
Network.CONNECTIONS = 0;

Network.createRandom = function(options) {

}
