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
  });
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
      const layer = Layer.Dense(size);

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
      const layer = Layer.Dense(size);
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
  });
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
      const layer = Layer.Dense(size);

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
      const layer = Layer.Dense(size);
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
  });
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
  });
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
  });
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
  });
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
  });
  describe("node.clear()", function() {
    it("node.clear() => {undefined}", function() {
      const node = new Node();
      const number = Math.random() * 10;
      const other_number = Math.random() * 10;

      const output = node.activate(number);
      const error = node.propagate(other_number);

      node.clear();

      expect(node.old).to.equal(0);
      expect(node.state).to.equal(0);
      expect(node.activation).to.equal(0);
      expect(node.error_responsibility).to.equal(0);
      expect(node.error_projected).to.equal(0);
      expect(node.error_gated).to.equal(0);

      for (let i = 0; i < node.connections_incoming.length; i++) {
        expect(node.connections_incoming[i].eligibility).to.equal(0);
        expect(node.connections_incoming[i].xtrace_nodes).to.be.an("array");
        expect(node.connections_incoming[i].xtrace_nodes).to.have.lengthOf(0);
        expect(node.connections_incoming[i].xtrace_values).to.be.an("array");
        expect(node.connections_incoming[i].xtrace_values).to.have.lengthOf(0);
      }

      for (let i = 0; i < node.connections_gated.length; i++) {
        expect(node.connections_gated[i].gain).to.equal(0);
      }
    })
  });
  describe("node.mutate()", function() {
    it("node.mutate() => {undefined}", function() {
      const node = new Node();
      const { squash, bias } = { ...node };

      node.mutate();

      expect(node).to.satisfy(function(node) {
        return (node.bias != bias) || (node.squash != squash);
      })
    })
    it("node.mutate(options={ method: methods.mutation.MOD_ACTIVATION }) => {undefined}", function() {
      const node = new Node();
      const options = {
        method: methods.mutation.MOD_ACTIVATION
      }
      const { squash, bias } = { ...node };

      node.mutate(options);

      expect(node.squash).to.not.equal(squash);
      expect(node.squash).to.not.eql(squash);
      expect(node.bias).to.equal(bias);
      expect(node.bias).to.eql(bias);
    })
    it("node.mutate(options={ method: methods.mutation.MOD_BIAS, allowed: [ methods.activation.LOGISTIC, methods.activation.RELU ] }) => {undefined}", function() {
      const node = new Node();
      const options = {
        method: methods.mutation.MOD_ACTIVATION,
        allowed: [
          methods.activation.LOGISTIC,
          methods.activation.RELU
        ]
      }
      const { squash, bias } = { ...node };

      node.mutate(options);

      expect(node.squash).to.not.equal(squash);
      expect(node.squash).to.not.eql(squash);
      expect(node.squash).to.equal(methods.activation.RELU);
      expect(node.squash).to.eql(methods.activation.RELU);
      expect(node.bias).to.equal(bias);
      expect(node.bias).to.eql(bias);
    })
    it("node.mutate(options={ method: methods.mutation.MOD_BIAS }) => {undefined}", function() {
      const node = new Node();
      const options = {
        method: methods.mutation.MOD_BIAS
      }
      const { squash, bias } = { ...node };

      node.mutate(options);

      expect(node.squash).to.equal(squash);
      expect(node.squash).to.eql(squash);
      expect(node.bias).to.not.equal(bias);
      expect(node.bias).to.not.eql(bias);
    })
  });
  describe("node.isProjectingTo()", function() {
    it("node.isProjectingTo() => {ReferenceError}", function() {
      const node = new Node();
      const other = new Node();

      const connection = node.connect(other);

      expect(() => node.isProjectingTo()).to.throw(ReferenceError);
    })
    it("node.isProjectingTo(self) => {boolean}", function() {
      const node = new Node();

      expect(node.isProjectingTo(node)).to.be.false;

      node.connect(node);

      expect(node.isProjectingTo(node)).to.be.true;
    })
    it("node.isProjectingTo(node) => {boolean}", function() {
      const node = new Node();
      const other = new Node();

      expect(node.isProjectingTo(other)).to.be.false;

      node.connect(other);

      expect(node.isProjectingTo(other)).to.be.true;
    })
    it("node.isProjectingTo(nodes) => {boolean}", function() {
      const size = Math.ceil(Math.random() * 10);
      const node = new Node();
      const other = [];

      for (let i = 0; i < size; i++) other.push(new Node());

      expect(node.isProjectingTo(other)).to.be.false;

      node.connect(other);

      expect(node.isProjectingTo(other)).to.be.true;
    })
  });
  describe("node.isProjectedBy()", function() {
    it("node.isProjectedBy() => {ReferenceError}", function() {
      const node = new Node();

      expect(() => node.isProjectedBy()).to.throw(ReferenceError);
    })
    it("node.isProjectedBy(self) => {boolean}", function() {
      const node = new Node();

      expect(node.isProjectedBy(node)).to.be.false;

      node.connect(node);

      expect(node.isProjectedBy(node)).to.be.true;
    })
    it("node.isProjectedBy(node) => {boolean}", function() {
      const node = new Node();
      const other = new Node();

      expect(node.isProjectedBy(other)).to.be.false;

      other.connect(node);

      expect(node.isProjectedBy(other)).to.be.true;
    })
    it("node.isProjectedBy(nodes) => {boolean}", function() {
      const size = Math.ceil(Math.random() * 10);
      const node = new Node();
      const other = [];

      for (let i = 0; i < size; i++) other.push(new Node());

      expect(node.isProjectedBy(other)).to.be.false;

      for (let i = 0; i < size; i++) other[i].connect(node);

      expect(node.isProjectedBy(other)).to.be.true;
    })
  });
  describe("node.toJSON()", function() {
    it("node.toJSON() => {Object}", function() {
      const node = new Node();

      const json = node.toJSON();

      expect(json).to.be.an("object");
      expect(json.bias).to.be.finite;
      expect(json.squash).to.be.a("string");
    })
  });
  describe("Node.fromJSON()", function() {
    it("Node.fromJSON() => {ReferenceError}", function() {
      expect(() => Node.fromJSON()).to.throw(ReferenceError);
    })
    it("Node.fromJSON(json) => {Node}", function() {
      const node = new Node();
      const json = node.toJSON();

      is.node(Node.fromJSON(json));
    })
    it("Node.fromJSON(json_string) => {Node}", function() {
      const node = new Node();
      const json = JSON.stringify(node.toJSON());

      is.node(Node.fromJSON(json));
    })
  });

  //=========================================
  // ALPHA ==================================
  //=========================================

  // Useful for dynamic detection/conditionals
  /**
  describe("node.isInput()", function() {
    it("[type='input'] node.is.input() => {boolean=true}")
    it("[type='hidden'] node.is.input() => {boolean=false}")
    it("[type='output'] node.is.input() => {boolean=false}")
    it("[type='orphan'] node.is.input() => {boolean=false}")
  });
  describe("node.isHidden()", function() {
    it("[type='input'] node.is.hidden() => {boolean=false}")
    it("[type='hidden'] node.is.hidden() => {boolean=true}")
    it("[type='output'] node.is.hidden() => {boolean=false}")
    it("[type='orphan'] node.is.hidden() => {boolean=false}")
  });
  describe("node.isOutput()", function() {
    it("[type='input'] node.is.output() => {boolean=false}")
    it("[type='hidden'] node.is.output() => {boolean=false}")
    it("[type='output'] node.is.output() => {boolean=true}")
    it("[type='orphan'] node.is.output() => {boolean=false}")
  });
  describe("node.isOrphan()", function() {
    it("[type='input'] node.is.orphan() => {boolean=false}")
    it("[type='hidden'] node.is.orphan() => {boolean=false}")
    it("[type='output'] node.is.orphan() => {boolean=false}")
    it("[type='orphan'] node.is.orphan() => {boolean=true}")
  });
  describe("node.isGating()", function() {
    it("node.isGating() => {ReferenceError}")
    it("node.isGating(connection) => {boolean}")
    it("node.isGating(connections) => {boolean}")
    it("node.isGating(connections, options) => {boolean}")
  });
  */

  // Useful in streaming
  /**
  describe("node.canActivate()", function() {

  });
  describe("node.canPropagate()", function() {

  });
  */
});
