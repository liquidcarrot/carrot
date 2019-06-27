const { assert, expect } = require('chai');
const should = require('chai').should();
const chalk = require('chalk');

const { Group, Layer, Connection, Node, methods } = require('../../../src/carrot');

describe("Node", function() {
  const is = {
    node: function(node) {
      expect(node).to.be.an.instanceOf(Node);
      expect(node.bias).to.be.a("number");
      expect(node.squash).to.be.a("function");
      expect(node.activation).to.be.a("number");
      expect(node.state).to.be.a("number");
      expect(node.old).to.be.a("number");
      expect(node.mask).to.be.a("number");
      expect(node.delta_bias_previous).to.be.a("number");
      expect(node.delta_bias_total).to.be.a("number");
      expect(node.delta_bias).to.be.an("array");
      expect(node.connections_gated).to.be.an("array");
      expect(node.connections_self).to.be.an.instanceOf(Connection);
      expect(node.connections_incoming).to.be.an("array");
      expect(node.connections_outgoing).to.be.an("array");
      expect(node.error_responsibility).to.be.a("number");
      expect(node.error_projected).to.be.a("number");
      expect(node.error_gated).to.be.a("number");
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
  
  describe("node.activate()", function() {
    const input = new Node();
    const hidden = new Node();
    const output = new Node();
    
    input.connect(hidden);
    hidden.connect(output);
    
    it.skip("[type='input'] node.activate() => {number}", function() {
      
    })
    it.skip("[type='input'] node.activate(number) => {number}", function() {
      
    })
    it.skip("[type='input'] node.activate(numbers) => {number}", function() {
      
    })
    it("[type='hidden'] node.activate() => {number}")
    it("[type='hidden'] node.activate(number) => {number}")
    it("[type='hidden'] node.activate(numbers) => {number}")
    it("[type='output'] node.activate() => {number}")
    it("[type='output'] node.activate(number) => {number}")
    it("[type='output'] node.activate(numbers) => {number}")
    it("[type='orphan'] node.activate() => {number}")
    it("[type='orphan'] node.activate(number) => {number}")
    it("[type='orphan'] node.activate(numbers) => {number}")
  })
  describe("node.noTraceActivate()", function() {
    it("[type='input'] node.noTraceActivate() => {number}")
    it("[type='input'] node.noTraceActivate(number) => {number}")
    it("[type='input'] node.noTraceActivate(numbers) => {number}")
    it("[type='hidden'] node.noTraceActivate() => {number}")
    it("[type='hidden'] node.noTraceActivate(number) => {number}")
    it("[type='hidden'] node.noTraceActivate(numbers) => {number}")
    it("[type='output'] node.noTraceActivate() => {number}")
    it("[type='output'] node.noTraceActivate(number) => {number}")
    it("[type='output'] node.noTraceActivate(numbers) => {number}")
    it("[type='orphan'] node.noTraceActivate() => {number}")
    it("[type='orphan'] node.noTraceActivate(number) => {number}")
    it("[type='orphan'] node.noTraceActivate(numbers) => {number}")
  })
  describe("node.propagate()", function() {
    it("[type='input'] node.propagate() => {number}")
    it("[type='input'] node.propagate(number) => {number}")
    it("[type='input'] node.propagate(numbers) => {number}")
    it("[type='hidden'] node.propagate() => {number}")
    it("[type='hidden'] node.propagate(number) => {number}")
    it("[type='hidden'] node.propagate(numbers) => {number}")
    it("[type='output'] node.propagate() => {number}")
    it("[type='output'] node.propagate(number) => {number}")
    it("[type='output'] node.propagate(numbers) => {number}")
    it("[type='orphan'] node.propagate() => {number}")
    it("[type='orphan'] node.propagate(number) => {number}")
    it("[type='orphan'] node.propagate(numbers) => {number}")
  })
  describe("node.connect()", function() {
    it("node.connect() => {ReferenceError}", function() {
      const node = new Node();
      
      expect(() => node.connect()).to.throw(ReferenceError);
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
    })
    it("node.connect(node, options) => {Connection}")
    it("node.connect(nodes, options) => {Connection[]}")
  })
  describe("node.disconnect()", function() {
    it("node.disconnect() => {ReferenceError}")
    it("node.disconnect(node) => {Connection}")
    it("node.disconnect(layer) => {Connection[]}")
    it("node.disconnect(group) => {Connection[]}")
    it("node.disconnect(node, options) => {Connection}")
    it("node.disconnect(layer, options) => {Connection[]}")
    it("node.disconnect(group, options) => {Connection[]}")
  })
  describe("node.gate()", function() {
    it("node.gate() => {ReferenceError}")
    it("node.gate(connection) => {Connection}")
    it("node.gate(connections) => {Connection[]}")
    it("node.gate(connection, options) => {Connection}")
    it("node.gate(connections, options) => {Connection[]}")
  })
  describe("node.ungate()", function() {
    it("node.ungate() => {ReferenceError}")
    it("node.ungate(connection) => {Connection}")
    it("node.ungate(connections) => {Connection[]}")
    it("node.ungate(connection, options) => {Connection}")
    it("node.ungate(connections, options) => {Connection[]}")
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
  //   node.should.have.property("bias"); node.bias.should.be.a("number");
  //   node.should.have.property("squash"); node.squash.should.be.a("function");
  //   // node.should.have.property("type"); node.type.should.be.a("string");
  //   node.should.have.property("activation"); node.activation.should.be.a("number");
  //   node.should.have.property("state"); node.state.should.be.a("number");
  //   node.should.have.property("old"); node.old.should.be.a("number");
  //   node.should.have.property("mask"); node.mask.should.be.a("number");
  //   node.should.have.property("previousDeltaBias"); node.previousDeltaBias.should.be.a("number"); // Could change to `bias.previous`
  //   node.should.have.property("totalDeltaBias"); node.totalDeltaBias.should.be.a("number");  // Could change to `bias.total`
  //   node.should.have.property("error").be.an("object");
  //   node.error.responsibility.should.be.a("number");
  //   node.error.projected.should.be.a("number");
  //   node.error.gated.should.be.a("number");
    
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
  //   node.should.have.property("deltabias").be.an("object").with.property("previous").be.a("number");
  //   node.should.have.property("deltabias").be.an("object").with.property("total").be.a("number");
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
  //   node.activate().should.be.a("number").and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
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
  //   node.activate(Math.random()).should.be.a("number").and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
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
  //   node.activate().should.be.a("number").and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
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
  //   node.activate(Math.random()).should.be.a("number").and.be.at.least(-1).and.be.at.most(1).and.not.equal(number);
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
 