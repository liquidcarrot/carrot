const { assert, expect } = require('chai');
const should = require('chai').should();
const chalk = require('chalk');

const { Group, Layer, Connection, Node, methods } = require('../../../src/carrot');

describe("Node", function() {
  const is = {
    node: function(node) {
      expect(node).to.be.an.instanceOf(Node);
      expect(node.bias).to.be.finite;
      expect(node.squash).to.be.a("function");
      expect(node.activation).to.be.finite;
      expect(node.state).to.be.finite;
      expect(node.old).to.be.finite;
      expect(node.mask).to.be.finite;
      expect(node.delta_bias_previous).to.be.finite;
      expect(node.delta_bias_total).to.be.finite;
      expect(node.delta_bias).to.be.an("array");
      expect(node.connections_gated).to.be.an("array");
      expect(node.connections_self).to.be.an.instanceOf(Connection);
      expect(node.connections_incoming).to.be.an("array");
      expect(node.connections_outgoing).to.be.an("array");
      expect(node.error_responsibility).to.be.finite;
      expect(node.error_projected).to.be.finite;
      expect(node.error_gated).to.be.finite;
    }
  }
  
  describe("new Node()", function() {
    const other_node = new Node();
    const json = {
      bias: Math.random() * 2 - 1,
      squash: methods.activation.TANH
    }
    const options = {
      bias: Math.random() * 2 - 1,
      squash: methods.activation.TANH
    }
    const types = ["input", "hidden", "output", "orphan"]; // (DEPRECATED)
    
    it("new Node() => {Node}", function() {
      const node = new Node();
      
      is.node(node);
    })
    it("new Node(json) => {Node}", function() {
      const node = new Node(json);
      
      is.node(node);
      
      Object.keys(json).forEach(function(key) {
        expect(node[key]).to.equal(json[key]);
        expect(node[key]).to.eql(json[key]);
      })
    })
    it("new Node(node) => {Node}", function() {
      const node = new Node(other_node);
      
      is.node(node);
      
      expect(node.bias).to.equal(other_node.bias);
      expect(node.bias).to.eql(other_node.bias);
      expect(node.squash).to.equal(other_node.squash);
      expect(node.squash).to.eql(other_node.squash);
    })
  })
  describe("node.connect()", function() {
    it("node.connect() => {ReferenceError}", function() {
      const node = new Node();
      
      expect(() => node.connect()).to.throw(ReferenceError);
    })
    it("node.connect(self) => {Connection}", function() {
      const node = new Node();
      
      expect(node.connect(node)).to.be.an.instanceOf(Connection);
      expect(node.connections_self.weight).to.equal(1);
    })
    it("node.connect(node) => {Connection}", function() {
      const node = new Node();
      const other = new Node();
      
      expect(node.connect(other)).to.be.an.instanceOf(Connection);
    })
    it("node.connect(nodes) => {Connection[]}", function() {
      const node = new Node();
      const size = Math.floor(Math.random() * 10) + 1;
      const layer = new Layer.Dense(size);
      
      const connections = node.connect(layer.nodes);
      
      expect(connections).to.be.an("array");
      expect(connections.length).to.equal(size);
      
      for (let i = 0; i < connections.length; i++) {
        expect(connections[i]).to.be.an.instanceOf(Connection);
      }
    })
    it("node.connect(node, options={ twosided: true }) => {Connection}", function() {
      const node = new Node();
      const other = new Node();
      const options = {
        twosided: true
      }
      
      expect(node.connect(other, options)).to.be.an.instanceOf(Connection);
      expect(node.connections_incoming).to.have.lengthOf(1);
      expect(node.connections_outgoing).to.have.lengthOf(1);
    })
    it("node.connect(nodes, options={ twosided: true }) => {Connection[]}", function() {
      const node = new Node();
      const size = Math.floor(Math.random() * 10) + 1;
      const layer = new Layer.Dense(size);
      const options = {
        twosided: true
      }
      
      const connections = node.connect(layer.nodes, options);
      
      expect(connections).to.be.an("array");
      expect(connections.length).to.equal(size);
      
      for (let i = 0; i < connections.length; i++) {
        expect(connections[i]).to.be.an.instanceOf(Connection);
      }
      
      expect(node.connections_incoming).to.have.lengthOf(size);
      expect(node.connections_outgoing).to.have.lengthOf(size);
    })
  })
  describe("node.disconnect()", function() {
    it("node.disconnect() => {ReferenceError}", function() {
      const node = new Node();
      const other = new Node();
      
      expect(() => node.connect()).to.throw(ReferenceError);
    })
    it("node.disconnect(self) => {Connection}", function() {
      const node = new Node();
      
      const connection = node.connect(node);
      
      expect(node.disconnect(node)).to.be.an.instanceOf(Connection);
      expect(node.connections_self.weight).to.equal(0);
    })
    it("node.disconnect(node) => {Connection}", function() {
      const node = new Node();
      const other = new Node();
      
      expect(node.connect(other)).to.be.an.instanceOf(Connection);
    })
    it("node.disconnect(nodes) => {Connection[]}", function() {
      const node = new Node();
      const size = Math.floor(Math.random() * 10) + 1;
      const layer = new Layer.Dense(size);
      
      const connections_initial = node.connect(layer.nodes);
      const connections = node.disconnect(layer.nodes);
      
      expect(connections).to.be.an("array");
      expect(connections.length).to.equal(size);
    })
    it("node.disconnect(node, options={ twosided: true }) => {Connection}", function() {
      const node = new Node();
      const other = new Node();
      const options = {
        twosided: true
      }
      
      const connection_initial = node.connect(other, options);
      const connection = node.disconnect(other, options);
      
      expect(connection).to.be.an.instanceOf(Connection);
      
      expect(node.connections_incoming).to.have.lengthOf(0);
      expect(node.connections_outgoing).to.have.lengthOf(0);
    })
    it("node.disconnect(nodes, options={ twosided: true }) => {Connection[]}", function() {
      const node = new Node();
      const size = Math.floor(Math.random() * 10) + 1;
      const layer = new Layer.Dense(size);
      const options = {
        twosided: true
      }
      
      const connections_initial = node.connect(layer.nodes);
      const connections = node.disconnect(layer.nodes);
      
      expect(connections).to.be.an("array");
      expect(connections.length).to.equal(size);
      
      for (let i = 0; i < connections.length; i++) {
        expect(connections[i]).to.be.an.instanceOf(Connection);
      }
      
      expect(node.connections_incoming).to.have.lengthOf(0);
      expect(node.connections_outgoing).to.have.lengthOf(0);
    })
  })
  describe("node.activate()", function() {
    it("node.activate() => {number}", function() {
      const node = new Node();
      
      const output = node.activate();
      
      expect(output).to.be.finite;
    })
    it("node.activate(number) => {number}", function() {
      const node = new Node();
      const number = Math.random() * 10;
      
      const output = node.activate(number);
      
      expect(output).to.be.finite;
      expect(output).to.equal(number);
    })
    it("node.activate(options={ trace: false })", function() {
      const node = new Node();
      const options = {
        trace: false
      }
      
      const output = node.activate(options);
      
      expect(output).to.be.finite;
      expect(node.derivative).to.not.exist;
    })
    it("node.activate(number, options={ trace: false })", function() {
      const node = new Node();
      const number = Math.random() * 10;
      const options = {
        trace: false
      }
      
      const output = node.activate(number, options);
      
      expect(output).to.be.finite;
      expect(output).to.equal(number);
      expect(node.derivative).to.not.exist;
    })
  })
  describe("node.propagate()", function() {
    it("node.propagate() => { responsibility: number, projected: number, gated: number }", function() {
      const node = new Node();
      const number = Math.random() * 10;
      const other_number = Math.random() * 10;
      const options = {
        update: false
      }
      
      const output = node.activate(number);
      const error = node.propagate();
      
      expect(error).to.exist;
      expect(error).to.be.an("object");
      expect(error.responsibility).to.be.finite;
      expect(error.projected).to.be.finite;
      expect(error.gated).to.be.finite;
    })
    it("node.propagate(number) => { responsibility: number, projected: number, gated: number }", function() {
      const node = new Node();
      const number = Math.random() * 10;
      const other_number = Math.random() * 10;
      const options = {
        update: false
      }
      
      const output = node.activate(number);
      const error = node.propagate(other_number);
      
      expect(error).to.exist;
      expect(error).to.be.an("object");
      expect(error.responsibility).to.be.finite;
      expect(error.projected).to.be.finite;
      expect(error.gated).to.be.finite;
      expect(error.responsibility).to.equal(other_number - number);
      expect(error.projected).to.equal(other_number - number);
      expect(error.gated).to.equal(0);
    })
    it("node.propagate(options={ update: false }) => { responsibility: number, projected: number, gated: number }", function() {
      const node = new Node();
      const number = Math.random() * 10;
      const other_number = Math.random() * 10;
      const options = {
        update: false
      }
      
      const output = node.activate(number);
      const error = node.propagate(options);
      
      expect(error).to.exist;
      expect(error).to.be.an("object");
      expect(error.responsibility).to.be.finite;
      expect(error.projected).to.be.finite;
      expect(error.gated).to.be.finite;
      expect(node.delta_bias_total).to.equal(0);
      expect(node.delta_bias_previous).to.equal(0);
    })
    it("node.propagate(number, options={ update: false }) => { responsibility: number, projected: number, gated: number }", function() {
      const node = new Node();
      const number = Math.random() * 10;
      const other_number = Math.random() * 10;
      const options = {
        update: false
      }
      
      const output = node.activate(number);
      const error = node.propagate(other_number, options);
      
      expect(error).to.exist;
      expect(error).to.be.an("object");
      expect(error.responsibility).to.be.finite;
      expect(error.projected).to.be.finite;
      expect(error.gated).to.be.finite;
      expect(node.delta_bias_previous).to.equal(0);
    })
  })
  describe("node.gate()", function() {
    it("node.gate() => {ReferenceError}", function() {
      const node = new Node();
      
      expect(() => node.gate()).to.throw(ReferenceError);
    })
    it("node.gate(connection) => {Connection}", function() {
      const input = new Node();
      const output = new Node();
      const connection = input.connect(output);
      const node = new Node();
      
      const gate = node.gate(connection);
      
      expect(gate).to.be.an.instanceof(Connection);
      expect(gate.gater).to.eql(node);
      expect(node.connections_gated).to.have.lengthOf(1);
    })
    it("node.gate(connections) => {Connection[]}", function() {
      const size = Math.ceil(Math.random() * 10);
      const inputs = [];
      const outputs = [];
      const connections = [];
      const node = new Node();
      
      for (let i = 0; i < size; i++) {
        inputs.push(new Node());
        outputs.push(new Node());
        connections.push(new Connection(inputs[i], outputs[i]));
      }
      
      const gates = node.gate(connections);
      
      expect(gates).to.be.an("array");
      expect(gates).to.have.lengthOf(size);
      
      for (let i = 0; i < gates.length; i++) {
        expect(gates[i]).to.be.an.instanceOf(Connection);
        expect(gates[i].gater).to.eql(node);
      }
      
      expect(node.connections_gated).to.have.lengthOf(size);
    })
  })
  describe("node.ungate()", function() {
    it("node.ungate() => {ReferenceError}", function() {
      const node = new Node();
      
      expect(() => node.ungate()).to.throw(ReferenceError);
    })
    it("node.ungate(connection) => {Connection}", function() {
      const input = new Node();
      const output = new Node();
      const node = new Node();
      const connection = input.connect(output);
      
      node.gate(connection);
      
      const gate = node.ungate(connection);
      
      expect(gate).to.be.an.instanceof(Connection);
      expect(gate.gater).to.not.exist;
      expect(node.connections_gated).to.have.lengthOf(0);
    })
    it("node.ungate(connections) => {Connection[]}", function() {
      const size = Math.ceil(Math.random() * 10);
      const inputs = [];
      const outputs = [];
      const connections = [];
      const node = new Node();
      
      for (let i = 0; i < size; i++) {
        inputs.push(new Node());
        outputs.push(new Node());
        connections.push(new Connection(inputs[i], outputs[i]));
      }
      
      node.gate(connections);
      
      const gates = node.ungate(connections);
      
      expect(gates).to.be.an("array");
      expect(gates).to.have.lengthOf(size);
      
      for (let i = 0; i < gates.length; i++) {
        expect(gates[i]).to.be.an.instanceOf(Connection);
        expect(gates[i].gater).to.not.exist;
      }
      
      expect(node.connections_gated).to.have.lengthOf(0);
    })
  })
  
  describe("node.clear()", function() {
    it("[type='input'] node.clear() => {undefined}")
    it("[type='input'] node.clear(options) => {undefined}")
    it("[type='hidden'] node.clear() => {undefined}")
    it("[type='hidden'] node.clear(options) => {undefined}")
    it("[type='output'] node.clear() => {undefined}")
    it("[type='output'] node.clear(options) => {undefined}")
    it("[type='orphan'] node.clear() => {undefined}")
    it("[type='orphan'] node.clear(options) => {undefined}")
  })
  describe("node.mutate()", function() {
    it("node.mutate() => {undefined}")
    it("node.mutate(mutation) => {undefined}")
  })
  describe("node.isProjectingTo()", function() {
    it("node.isProjectingTo() => {ReferenceError}")
    it("node.isProjectingTo(node) => {boolean}")
    it("node.isProjectingTo(layer) => {boolean}")
    it("node.isProjectingTo(group) => {boolean}")
  })
  describe("node.isProjectedBy()", function() {
    it("node.isProjectedBy() => {ReferenceError}")
    it("node.isProjectedBy(node) => {boolean}")
    it("node.isProjectedBy(layer) => {boolean}")
    it("node.isProjectedBy(group) => {boolean}")
  })
  
  describe("node.toJSON()", function() {
    it("node.toJSON() => {Object}")
  })
  describe("Node.fromJSON()", function() {
    it("node.fromJSON() => {ReferenceError}")
    it("node.fromJSON(json) => {Node}")
    it("node.fromJSON(json_string) => {Node}")
  })
  
  
  
  
  
  // (ALPHA): Useful for dynamic detection/conditionals
  describe("node.isInput()", function() {
    it("[type='input'] node.is.input() => {boolean=true}")
    it("[type='hidden'] node.is.input() => {boolean=false}")
    it("[type='output'] node.is.input() => {boolean=false}")
    it("[type='orphan'] node.is.input() => {boolean=false}")
  })
  describe("node.isHidden()", function() {
    it("[type='input'] node.is.hidden() => {boolean=false}")
    it("[type='hidden'] node.is.hidden() => {boolean=true}")
    it("[type='output'] node.is.hidden() => {boolean=false}")
    it("[type='orphan'] node.is.hidden() => {boolean=false}")
  })
  describe("node.isOutput()", function() {
    it("[type='input'] node.is.output() => {boolean=false}")
    it("[type='hidden'] node.is.output() => {boolean=false}")
    it("[type='output'] node.is.output() => {boolean=true}")
    it("[type='orphan'] node.is.output() => {boolean=false}")
  })
  describe("node.isOrphan()", function() {
    it("[type='input'] node.is.orphan() => {boolean=false}")
    it("[type='hidden'] node.is.orphan() => {boolean=false}")
    it("[type='output'] node.is.orphan() => {boolean=false}")
    it("[type='orphan'] node.is.orphan() => {boolean=true}")
  })
  describe("node.isGating()", function() {
    it("node.isGating() => {ReferenceError}")
    it("node.isGating(connection) => {boolean}")
    it("node.isGating(connections) => {boolean}")
    it("node.isGating(connections, options) => {boolean}")
  })
  
  // (ALPHA): Useful in streaming
  describe("node.canActivate()", function() {
    
  })
  describe("node.canPropagate()", function() {
    
  })
  
  
  // it("new Node()", function() {
  //   let node = new Node();
    
  //   //======================================
  //   // v0.1.x ==============================
  //   //======================================
    
  //   // Properties
  //   node.should.be.an.instanceof(Node);
  //   node.should.have.property("bias"); node.bias.should.be.finite;
  //   node.should.have.property("squash"); node.squash.should.be.a("function");
  //   // node.should.have.property("type"); node.type.should.be.a("string");
  //   node.should.have.property("activation"); node.activation.should.be.finite;
  //   node.should.have.property("state"); node.state.should.be.finite;
  //   node.should.have.property("old"); node.old.should.be.finite;
  //   node.should.have.property("mask"); node.mask.should.be.finite;
  //   node.should.have.property("previousDeltaBias"); node.previousDeltaBias.should.be.finite; // Could change to `bias.previous`
  //   node.should.have.property("totalDeltaBias"); node.totalDeltaBias.should.be.finite;  // Could change to `bias.total`
  //   node.should.have.property("error").be.an("object");
  //   node.error.responsibility.should.be.finite;
  //   node.error.projected.should.be.finite;
  //   node.error.gated.should.be.finite;
    
  //   // Instance Functions
  //   node.should.have.property("activate"); node.activate.should.be.a("function");
  //   node.should.have.property("propagate");  node.propagate.should.be.a("function");
  //   // node.should.have.property("evolve");  node.evolve.should.be.a("function"); // Not implemented
  //   node.should.have.property("connect");  node.connect.should.be.a("function");
  //   node.should.have.property("disconnect");  node.disconnect.should.be.a("function");
  //   node.should.have.property("gate");  node.gate.should.be.a("function");
  //   node.should.have.property("ungate");  node.ungate.should.be.a("function");
  //   node.should.have.property("toJSON");  node.toJSON.should.be.a("function");
  //   node.should.have.property("clear");  node.clear.should.be.a("function");
  //   // node.should.have.property("reset");  node.reset.should.be.a("function"); // Not implemented
    
  //   //======================================
  //   // v0.2.x ==============================
  //   //======================================
  //   /*
  //   // Properties
  //   node.should.have.property("deltabias").be.an("object").with.property("previous").be.finite;
  //   node.should.have.property("deltabias").be.an("object").with.property("total").be.finite;
  //   node.should.have.property("type").equal("input")
    
  //   // Instance Functions
  //   node.should.have.property("is").be.an("object");
  //   node.is.input.should.be.a("function");
  //   node.is.output.should.be.a("function");
  //   node.is.hidden.should.be.a("function");
  //   node.is.connectedto.should.be.a("function");
  //   node.is.selfconnectedto.should.be.a("function");
  //   node.is.selfconnected.should.be.a("function");
  //   node.is.projectingto.should.be.a("function");
  //   node.is.projectedtoby.should.be.a("function");
  //   */
  // })
  
  // it("[type='input'] Node.prototype.activate()" + chalk.italic(" - 1 neuron"), function() {
  //   let node = new Node("input");
    
  //   // node.activate().should.equal(0);
  // })
  // it("[type='input'] Node.prototype.activate(number)"  + chalk.italic(" - 1 neuron"), function() {
  //   let node = new Node("input");
    
  //   const number = Math.random();
    
  //   node.activate(number).should.equal(number);
  // })
  // it("[type='hidden'] Node.prototype.activate()" + chalk.italic(" - 3 neurons"), function() {
  //   const number = Math.random();
    
  //   let input = new Node("input");
  //   let node = new Node();
  //   let output = new Node("output");
    
  //   input.connect(node);
  //   node.connect(output);
    
  //   input.activate(number);
    
  //   //======================================
  //   // v0.1.x ==============================
  //   //======================================
  //   node.activate().should.be.finite.and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
  // })
  // it("[type='hidden'] Node.prototype.activate(number)" + chalk.italic(" - 3 neurons"), function() {
  //   const number = Math.random();
    
  //   let input = new Node("input");
  //   let node = new Node();
  //   let output = new Node("output");
    
  //   input.connect(node);
  //   node.connect(output);
    
  //   input.activate(number);
    
  //   //======================================
  //   // v0.1.x ==============================
  //   //======================================
  //   node.activate(Math.random()).should.be.finite.and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
  // })
  // it("[type='output'] Node.prototype.activate()" + chalk.italic(" - 3 neurons"), function() {
  //   const number = Math.random();
    
  //   let input = new Node("input");
  //   let hidden = new Node();
  //   let node = new Node("output");
    
  //   input.connect(hidden);
  //   hidden.connect(node);
    
  //   input.activate(number);
  //   hidden.activate();
    
  //   //======================================
  //   // v0.1.x ==============================
  //   //======================================
  //   node.activate().should.be.finite.and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
  // })
  // it("[type='output'] Node.prototype.activate(number)" + chalk.italic(" - 3 neurons"), function() {
  //   const number = Math.random();
    
  //   let input = new Node("input");
  //   let hidden = new Node();
  //   let node = new Node("output");
    
  //   input.connect(hidden);
  //   hidden.connect(node);
    
  //   input.activate(number);
  //   hidden.activate();
    
  //   //======================================
  //   // v0.1.x ==============================
  //   //======================================
  //   node.activate(Math.random()).should.be.finite.and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
  // })
  
  // it("[type='output'] Node.prototype.propagate()"  + chalk.italic(" - 1 neuron"))
  // it("[type='output'] Node.prototype.propagate(number)"  + chalk.italic(" - 1 neuron"))
  // it("[type='hidden'] Node.prototype.propagate()"  + chalk.italic(" - 3 neuron"))
  // it("[type='hidden'] Node.prototype.propagate(number)"  + chalk.italic(" - 3 neuron"))
  // it("[type='input'] Node.prototype.propagate()"  + chalk.italic(" - 3 neuron"))
  // it("[type='input'] Node.prototype.propagate(number)"  + chalk.italic(" - 3 neuron"))
})


/**

/**
 *
 * There are 5 questions every unit test must answer.
 *
 * What is the unit under test (module, function, class, whatever)?
 * What should it do? (Prose description)
 * What was the actual output?
 * What was the expected output?
 * How do you reproduce the failure?
 *
 */
 