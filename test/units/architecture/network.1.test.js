const _ = require('lodash');
const chai = require('chai');
const { assert, expect } = chai;
const should = chai.should();
chai.use(require('chai-things')); // support for array tests using should
const {
  Network,
  methods,
  config,
  architect,
  Node,
  Connection,
  Group
} = require('../../../src/carrot')


const mutation = methods.mutation;

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
describe('Network', function(){
  /** Helper functions to facilitate testing */
  function createUsedNetwork() {
    const network = new Network(10, 20);

    // add some nodes that will (or not) be dropped out
    const new_nodes = Array(10).fill({}).map(() => new Node());
    network.addNodes(new_nodes);
    // connect the nodes randomly
    new_nodes.forEach(node => {
      const input_node_index = Math.floor(Math.random() * 10);
      const output_node_index = 10 + Math.floor(Math.random() * 20);
      network.nodes[input_node_index].connect(node);
      node.connect(network.nodes[output_node_index]);
    });

    // generate random input to test the network
    const input = Array(10).fill(0).map(() => Math.random());

    const output = network.activate(input, { dropout_rate: 0.5 });

    return network;
  }

  describe('new Network()', async function() {
    it('new Network() => {TypeError}', async function () {
      // missing input or output size
      expect(() => new Network()).to.throw(TypeError);
      expect(() => new Network(3461)).to.throw(TypeError);
    })

    it('new Network(input_size, output_size) => {Network}', async function () {
      const network = new Network(10, 20);
      expect(network).to.be.an.instanceOf(Network);
      expect(network.nodes).to.be.of.length(30);
    })

    it('new Network(input_size, output_size) | connection ids are sequential, numbered 1 to input_size + output_size', async function () {
      const network = new Network(2,2);

      for(let i = 0; i < network.connections.length; i++) {
        expect(network.connections[i].id).equal(i+1);
      }
    });

    it('new Network(input_size, output_size, { connectionIds }) | Network.connIds is reference of external connectionIds object', async function () {
      const connectionIds = { last: 0 }; // initialize connection id object
      const network = new Network(2,2, { connIds: connectionIds }); // pass in connection id object to be mutated

      expect(connectionIds).equal(network.connIds); // refers to the same object
    });

    it('new Network(input_size, output_size, { connectionIds }) | Mutates connection IDs', async function () {
      const connectionIds = { last: 0 }; // initialize connection id object
      const network = new Network(2,2, { connIds: connectionIds }); // pass in connection id object to be mutated

      expect(connectionIds).not.eql({ last: 0 }); // should not be deeply equal initial object i.e. values should have changed
    });

    it('new Network(2, 2, { connectionIds }) | mutates connectionIds, .last equals 4', async function () {
      const connectionIds = { last: 0 }; // initialize connection id object
      let network = new Network(2,2, { connIds: connectionIds }); // pass in connection id object to be mutated
      expect(connectionIds.last).equal(4); // Should be equal to the number of connections, 4
    })

    it('new Network(2, 2, { connectionIds }) | connIds.last is equal to the latest value', async function () {
      const connectionIds = { last: 0 }; // initialize connection id object
      let network = new Network(2,2, { connIds: connectionIds }); // pass in connection id object to be mutated

      const values = Object.keys(connectionIds).map(key => connectionIds[key])
      expect(Math.max.apply(null, values)).equal(connectionIds.last)
    })

    it('new Network(2, 2, { connectionIds }) | connection IDs contains 4 entries plus .last entry', async function () {
      const connectionIds = { last: 0 }; // initialize connection id object
      let network = new Network(2,2, { connIds: connectionIds }); // pass in connection id object to be mutated

      expect(Object.keys(connectionIds).length).equal(5); // Should be equal to the number of connections, 4 plus .last
    });

    it('new Network(2, 2, { connectionIds }) | connection IDs has unique entries, except for .last', async function () {
      const connectionIds = { last: 0 }; // initialize connection id object
      let network = new Network(2,2, { connIds: connectionIds }); // pass in connection id object to be mutated

      // Creates an object that catalogs seen connection value, key pairs and runs a check to make sure that they are all unique
      const keys = Object.keys(connectionIds);
      const seen = {};
      for(let i = 0; i < keys.length; i++) {
        if(keys[i] == "last") continue;
        const value = connectionIds[keys[i]];
        expect(seen[value]).equal(undefined);
        seen[value] = keys[i]; // mark value as seen by storing corresponding key
      }
    })

    it('new Network(2,2), new Network(2,2) | both networks have same connection ids', async function () {
      const network = new Network(2,2);
      const network2 = new Network(2,2);

      const conns = network.connections.map(conn => conn.id);
      const conns2 = network.connections.map(conn => conn.id);

      expect(conns).eql(conns2)
    });

    it('new Network(2,2), new Network(2,2) | both networks have same connection ids and corresponding node ids', async function () {
      const network = new Network(2,2);
      const network2 = new Network(2,2);

      const conns = network.connections.map(conn => ({
        id: conn.id,
        from: conn.from.id,
        to: conn.to.id
      }));

      const conns2 = network.connections.map(conn => ({
        id: conn.id,
        from: conn.from.id,
        to: conn.to.id
      }));

      expect(conns).eql(conns2)
    });
  })

  describe('network.activate()', function() {
    it('network.activate(Array<Number>) => {Array<Number>}', function () {
      const network = new Network(10, 20);
      const input = Array(10).fill(0).map(() => Math.random());
      const simple_case_output = network.activate(input);
      expect(simple_case_output).to.be.an("array");
      expect(simple_case_output).to.be.of.length(20);
      simple_case_output.forEach((val) => expect(val).to.be.a('number'));

      // add a node and check that the output changed
      const new_node = new Node();
      network.addNodes(new_node);
      network.nodes[7].connect(new_node);
      new_node.connect(network.nodes[24]);

      const added_node_output = network.activate(input);

      for (let i = 0; i < 20; i++) {
        if (i !== 14) { // the added node was connected to output 14 (node 24 in the network)
          expect(simple_case_output[i]).to.equal(added_node_output[i]);
        } else {
          expect(simple_case_output[i]).to.not.equal(added_node_output[i]);
        }
      }

      // run again (without changing the network) and check that the output hasn't changed
      const rerun_output = network.activate(input);
      for (let i = 0; i < 20; i++) {
        expect(rerun_output[i]).to.equal(added_node_output[i]);
      }
    })
    it('network.activate(Array<Number>, {dropout_rate: Number}) => {Array<Number>}', function () {
      // check that droupout=false (so training=false) returns same values twice
      // check that droupout=true returns different from drouput=false, and different again on rerun
      const network = new Network(10, 20);

      // add some nodes that will (or not) be dropped out
      const new_nodes = Array(10).fill({}).map(() => new Node());
      network.addNodes(new_nodes);
      // connect the nodes randomly
      new_nodes.forEach(node => {
        const input_node_index = Math.floor(Math.random() * 10);
        const output_node_index = 10 + Math.floor(Math.random() * 20);
        network.nodes[input_node_index].connect(node);
        node.connect(network.nodes[output_node_index]);
      });

      // generate random input to test the network
      const input = Array(10).fill(0).map(() => Math.random());

      // outputs to test (in)equality
      const no_dropout_options = {dropout_rate: 0};
      const normal_dropout_options = {dropout_rate: 0.5};
      const all_nodes_dropped_options = {dropout_rate: 1};

      const first_dropout_off_output = network.activate(input, no_dropout_options);
      const second_dropout_off_output = network.activate(input, no_dropout_options);
      const first_dropout_on_output = network.activate(input, normal_dropout_options);
      const second_dropout_on_output = network.activate(input, normal_dropout_options);
      const first_full_dropout_output = network.activate(input, all_nodes_dropped_options);
      const second_full_dropout_output = network.activate(input, all_nodes_dropped_options);

      // check the results..
      expect(first_dropout_off_output).to.eql(second_dropout_off_output);
      expect(first_dropout_off_output).to.not.eql(first_dropout_on_output);
      expect(first_dropout_on_output).to.not.eql(second_dropout_on_output);
      expect(first_dropout_on_output).to.not.eql(first_full_dropout_output);
      expect(first_full_dropout_output).to.eql(second_full_dropout_output);
    })
  })

  describe('network.addNodes()', function () {
    it('network.addNodes(Node) => {Network}', function () {
      const test_network = new Network(10, 20);

      // test the network before adding the nodes
      // generate random input to test the network
      const random_input = Array(10).fill(0).map(() => Math.random());
      const original_output = test_network.activate(random_input, { dropout_rate: 0 });

      // add the nodes
      const test_node = new Node();
      test_network.nodes[7].connect(test_node);
      test_node.connect(test_network.nodes[27]);
      test_network.addNodes(test_node);

      // test the network after adding the nodes. The output should be different
      expect(test_network.nodes).to.be.of.length(31);
      const new_output = test_network.activate(random_input, { dropout_rate: 0 });
      expect(new_output).to.not.eql(original_output);

    })

    it('network.addNodes(Node[]) => {Network}', function () {
      const test_network = new Network(10, 20);

      // test the network before adding the nodes
      // generate random input to test the network
      const random_input = Array(10).fill(0).map(() => Math.random());
      const original_output = test_network.activate(random_input, { dropout_rate: 0 });

      // add the nodes
      const test_node = new Node();
      test_network.nodes[7].connect(test_node);
      test_node.connect(test_network.nodes[27]);

      const test_node2 = new Node();
      test_network.nodes[5].connect(test_node2);
      test_node2.connect(test_network.nodes[25]);

      const node_array = [test_node, test_node2];
      test_network.addNodes(node_array);

      // test the network after adding the nodes. The output should be different
      expect(test_network.nodes).to.be.of.length(32);
      const new_output = test_network.activate(random_input, { dropout_rate: 0 });
      expect(new_output).to.not.eql(original_output);
    })

    it('network.addNodes(Group) => {Network}', function () {
      const test_network = new Network(10, 20);

      // test the network before adding the nodes
      // generate random input to test the network
      const random_input = Array(10).fill(0).map(() => Math.random());
      const original_output = test_network.activate(random_input, { dropout_rate: 0 });

      // add the nodes
      const test_group = new Group(2);
      const test_node = test_group.nodes[0];


      test_network.nodes[7].connect(test_node);
      test_node.connect(test_network.nodes[27]);

      const test_node2 = test_group.nodes[1];
      test_network.nodes[5].connect(test_node2);
      test_node2.connect(test_network.nodes[25]);

      test_network.addNodes(test_group);

      // test the network after adding the nodes. The output should be different
      expect(test_network.nodes).to.be.of.length(32);
      const new_output = test_network.activate(random_input, { dropout_rate: 0 });
      expect(new_output).to.not.eql(original_output);
    })
  })

  describe('Network.architecture', function() {
    describe('.Construct', function() {
      it('() => Network | fails', function() {
        expect(Network.architecture.Construct).to.throw(Error);
      })
      it('([...]) => Network', function() {
        const A = new Node()
        const B = new Node()
        B.connect(A)
        const network = Network.architecture.Construct([A, B])
        expect(network).to.be.an.instanceOf(Network)
      })
      it('([n1, n2]) | n2 is an input neuron, should be first neuron in .neurons array', function() {
        const A = new Node()
        const B = new Node()
        B.connect(A)
        const network = Network.architecture.Construct([A, B])

        expect(network.nodes.indexOf(B)).equal(0)
      })
    })

    describe('.Perceptron', function() {
      // most basic check ever
      it('([...]) => Network', function() {
        const network = new Network.architecture.Perceptron(2,4,2)
        expect(network).to.be.an.instanceOf(Network)
      })
    })

    describe('.Random', function() {
      // most basic check ever
      it('([...]) => Network', function() {
        const network = Network.architecture.Random(1, 20, 2, {
          connections: 40,
          gates: 4,
          selfconnections: 4
        });
        expect(network).to.be.an.instanceOf(Network)
      })
    })

    describe('.LSTM', function() {
      // most basic check ever
      it('([...]) => Network', function() {
        const network = Network.architecture.LSTM(2,5,2)
        expect(network).to.be.an.instanceOf(Network)
      })
    })

    describe('.GRU', function() {
      // most basic check ever
      it('([...]) => Network', function() {
        const network = Network.architecture.GRU(2,2,2)
        expect(network).to.be.an.instanceOf(Network)
      })
    })

    describe('.Hopfield', function() {
      // most basic check ever
      it('([...]) => Network', function() {
        const network = Network.architecture.Hopfield(2)
        expect(network).to.be.an.instanceOf(Network)
      })
    })

    describe('.NARX', function() {
      // most basic check ever
      it('([...]) => Network', function() {
        const network = Network.architecture.NARX(1,1,1,1,1)
        expect(network).to.be.an.instanceOf(Network)
      })
    })

    describe('.Liquid', function() {
      // most basic check ever
      it('([...]) => Network', function() {
        const A = new Node()
        const B = new Node()
        B.connect(A)
        const network = Network.architecture.Construct([A, B])
        expect(network).to.be.an.instanceOf(Network)
      })
    })
  })

  describe('network.clear()', function() {
    it('network.clear() => {undefined}', function () {
      const test_network = createUsedNetwork();

      test_network.clear();
      test_network.nodes.forEach(node => {
        expect(node.error_responsibility).to.equal(0);
        expect(node.error_projected).to.equal(0);
        expect(node.error_gated).to.equal(0);
        expect(node.old).to.equal(0);
        expect(node.state).to.equal(0);
        expect(node.activation).to.equal(0);
      });
    })
  })

  describe('network.clone()', function() {
    it('network.clone() => {Network}', function () {
      const original = new architect.Perceptron(2,3,1)

      const copy = original.clone()

      expect(copy).eql(original)
    })

    it("network.clone() | Shouldn't return a shallow copy", function () {
      const original = new architect.Perceptron(2,3,1)

      const copy = original.clone()

      expect(copy).not.equal(original)
    })
  })

  describe('network.connect()', function() {
    it('network.connect() => {Connection}', function () {
      const network = new Network(10, 20);
      const source_node = new Node();
      const target_node = network.nodes[25];
      const connection = network.connect(source_node, target_node, 7);

      expect(connection).to.be.an.instanceOf(Connection);
      expect(connection.from).eql(source_node);
      expect(connection.to).eql(target_node);
    })
  })

  describe('network.createOffspring()', function () {
    it('() => {Network}', function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      expect(network.createOffspring(network1)).instanceOf(Network);
    })

    it('createOffspring(network) => {Network} | Network.connections.length > 0', function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      expect(network.createOffspring(network1).connections.length).not.equal(1);
    })

    it('createOffspring() => {Network} | input_nodes set contains nodes with .type of "input"', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const child = network.createOffspring(network1);

      // Convert set to array using spread operator
      [...child.input_nodes].should.all.have.property("type", "input");
    })

    it('createOffspring() => {Network} | output_nodes set contains nodes with .type of "output"', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const child = network.createOffspring(network1);

      // Convert set to array using spread operator
      expect([...child.output_nodes]).all.have.property("type", "output");
    })

    it('createOffspring() => {Network} | Offspring network nodes are not references to parent nodes', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const child = network.createOffspring(network1);

      // Before checking node-level properties, ensure that nodes array length is equal to fitter parent's
      expect(child.nodes.length).equal(network.nodes.length);

      // By using the same index to check for equivalent properties we can (mostly) test to see if offspring has the same node execution order as its fitter parent
      for(let i = 0; i < child.nodes.length; i++) {
        const childNode = child.nodes[i];
        const parentNode = network.nodes[i];

        // Make sure new nodes are not just references. ".equal" checks for strict equality of objects by reference
        expect(childNode).not.equal(parentNode) // Should fail
      }
    })

    it('createOffspring() => {Network} | Offspring network nodes are in the same execution order as fitter parent', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const child = network.createOffspring(network1);

      // Before checking node-level properties, ensure that nodes array length is equal to fitter parent's
      expect(child.nodes.length).equal(network.nodes.length);

      // By using the same index to check for equivalent properties we can (mostly) test to see if offspring has the same node execution order as its fitter parent
      for(let i = 0; i < child.nodes.length; i++) {
        const childNode = child.nodes[i];
        const parentNode = network.nodes[i];

        // Systematically test for relevant matching properties 
        expect(childNode.id).equal(parentNode.id);
        expect(childNode.type).equal(parentNode.type);
        expect(childNode.bias).equal(parentNode.bias);
        expect(childNode.weight).equal(parentNode.weight);
        expect(childNode.squash).equal(parentNode.squash);
      }
    })

    it('createOffspring() => Offspring, Offspring.activate(), parents all matching genes | Offspring network can activate', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const parentOutput = network.activate([0,1,0,1])

      const child = network.createOffspring(network1);

      // Check child viability by activating
      const output = child.activate([0, 1, 0, 1]);

      // Check activation output properties
      expect(output).an('array')
      // expect(output).all.a('number') Fails due to .activate consistently returning string type values... Typescript would be useful
      expect(output).all.closeTo(0.5, 0.5); // Assumes default squash is LOGISTIC
    })

    it('createOffspring() => Offspring, Offspring.activate(), disjoint genes in fitter parent | Offspring network can activate', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      // Indexes of genes (connections) that will not be in less fit parent
      const indexes = [1,6,8,9,10,12]; // removed ids: 2, 7, 8, 9, 10, 11, 13 -- assuming that connection ids are sequential upon construction, which they should be.

      // index offset, used to keep update indexes as connections are spliced
      let offset = 0;

      // Collect removed connection ids to test for origin later
      const removed = new Set();

      // Remove disjoint genes from less fit parent
      for(const index of indexes) {
        // network1 is the less fit parent
        const deleted = network1.connections.splice(index - offset, 1)[0];

        // Add the removed id to the removed connection ids
        removed.add(deleted.id);

        // Add one to the index offset
        offset++;
      }

      const child = network.createOffspring(network1);

      // Check child viability by activating
      const output = child.activate([0, 1, 0, 1]);

      // Check activation output properties
      expect(output).an('array')
      // expect(output).all.a('number') Fails due to .activate consistently returning string type values... Typescript would be useful
      expect(output).all.closeTo(0.5, 0.5); // Assumes default squash is LOGISTIC
    })

    it('createOffspring() => Offspring, Offspring.activate() | Offspring network has activation values distinct from parents', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const parentOutput = network.activate([0,1,0,1])

      const parentOutput1 = network.activate([0,1,0,1])

      const child = network.createOffspring(network1);

      // Check child viability by activating
      const output = child.activate([0, 1, 0, 1]);

      // Ensure childOutput is (deeply) distinct from parentOutput
      expect(output).not.eql(parentOutput)
      expect(output).not.eql(parentOutput1)
    })

    it.skip('createOffspring() => Offspring, Offspring.activate() | Each offspring node is conected to and from', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const child = network.createOffspring(network1);

      // Check child viability by activating
      const output = child.activate([0, 1, 0, 1]);

      // Check activation output properties
      expect(output).an('array')
      expect(output).all.a('number')
      expect(output).all.closeTo(0.5, 0.5); // Assumes default squash is LOGISTIC
    })

    it('createOffspring() => Offspring, Offspring.mutate(ADD_NODE) | offspring connIds refers to fitter parent connIds', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      let child = network.createOffspring(network1);

      // Mutate the child network, should mutate connIds and nodeIds
      child = child.mutate(methods.mutation.ADD_NODE);

      // Check that child.connIds refers to connIds
      expect(child.connIds).equal(network.connIds)
    })

    it('createOffspring() => Offspring, Offspring.mutate(ADD_NODE) | external connIds reference is updated', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const beforeConnIds = _.cloneDeep(connIds);

      let child = network.createOffspring(network1);

      // Mutate the child network, should mutate connIds and nodeIds
      child = child.mutate(methods.mutation.ADD_NODE);

      const afterConnIds = _.cloneDeep(connIds);

      // Check that connIds was mutated
      expect(afterConnIds).not.eql(beforeConnIds)
    })

    it('createOffspring() => Offspring, Offspring.mutate(ADD_NODE) | offspring nodeIds refers to fitter parent nodeIds', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      let child = network.createOffspring(network1);

      // Mutate the child network, should mutate connIds and nodeIds
      child = child.mutate(methods.mutation.ADD_NODE);

      // Check that child.connIds refers to connIds
      expect(child.nodeIds).equal(network.nodeIds)
    })

    it('createOffspring() => Offspring, Offspring.mutate(ADD_NODE) | external nodeIds reference is updated', async function() {
      const connIds = { last: 0 };
      const nodeIds = { last: 0 };
      const network = new Network(4,4,{ connIds, nodeIds });
      const network1 = new Network(4,4,{ connIds, nodeIds });

      const beforeNodeIds = _.cloneDeep(nodeIds);

      let child = network.createOffspring(network1);

      // Mutate the child network, should mutate connIds and nodeIds
      child = child.mutate(methods.mutation.ADD_NODE);

      const afterNodeIds = _.cloneDeep(nodeIds);

      // Check that connIds was mutated
      expect(afterNodeIds).not.eql(beforeNodeIds)
    })
  })

  describe('network.crossOver()', async function () {
    it('network.crossOver(network1) | produces no duplicate ids', async function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      // Track known ids
      const known = new Set();

      const genes = network.crossOver(network1)
      for(let i = 0; i < genes.length; i++) {
        const gene = genes[i];
        expect(known.has(gene.id)).equal(false);
        known.add(gene.id);
      }
    })

    it('network.crossOver(network1) | returns 16 genes', async function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      expect(network.crossOver(network1).length).equal(16);
    });

    it('network.crossOver(network1), where connections.length = 16 for both | returns 16 genes', async function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      expect(network.crossOver(network1).length).equal(16);
    })

    it('network.crossOver(network1) => {connection_data}, disjoint genes in fitter parent | disjoint genes always inherited from fitter parent', async function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      // Indexes of genes (connections) that will not be in less fit parent
      const indexes = [1,6,8,9,10,12]; // removed ids: 2, 7, 8, 9, 10, 11, 13 -- assuming that connection ids are sequential upon construction, which they should be.

      // index offset, used to keep update indexes as connections are spliced
      let offset = 0;

      // Collect removed connection ids to test for origin later
      const removed = new Set();

      // Remove disjoint genes from less fit parent
      for(const index of indexes) {
        // network1 is the less fit parent
        const deleted = network1.connections.splice(index - offset, 1)[0];

        // Add the removed id to the removed connection ids
        removed.add(deleted.id);

        // Add one to the index offset
        offset++;
      }

      // Run crossover to the get the resulting connection data array
      // Important note: network1 is the less fit network, calling network is always fitter, order matters
      const newConns = network.crossOver(network1);

      // Cycle through newConns and see if the id is within the removed set, if so expect it to be from the fitter network
      newConns.forEach(conn => {
        // Ensure each disjoint id was inherited from the fitter parent
        if(removed.has(conn.id)) {
          expect(conn).to.have.property('status', 'excess/disjoint');
          expect(conn).to.have.property('fitter', true);
        }
      })
    })

    it('network.crossOver(network1) => {connection_data}, disjoint genes in fitter parent | returns sequentially ordered ids', async function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      // Indexes of genes (connections) that will not be in less fit parent
      const indexes = [1,6,8,9,10,12]; // removed ids: 2, 7, 8, 9, 10, 11, 13 -- assuming that connection ids are sequential upon construction, which they should be.

      // index offset, used to keep update indexes as connections are spliced
      let offset = 0;

      // Collect removed connection ids to test for origin later
      const removed = new Set();

      // Remove disjoint genes from less fit parent
      for(const index of indexes) {
        // network1 is the less fit parent
        const deleted = network1.connections.splice(index - offset, 1)[0];

        // Add the removed id to the removed connection ids
        removed.add(deleted.id);

        // Add one to the index offset
        offset++;
      }

      // Run crossover to the get the resulting connection data array
      // Important note: network1 is the less fit network, calling network is always fitter, order matters
      const newConns = network.crossOver(network1);

      // Cycle through newConns and see if the id is within the removed set, if so expect it to be from the fitter network
      newConns.forEach((conn, index) => {
        // Ensure each id was inherited and is sequentially ordered
        expect(conn.id).equal(index + 1);
      })
    })

    it('network.crossOver(network1) => {connection_data}, network1 = less fit | excess genes always inherited from fitter parent', async function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      // Nodes to recurrently connect
      const n1 = network.nodes[5]; // Assumes input, hidden, output order in network.nodes
      const n2 = network.nodes[6];
      const n3 = network.nodes[7];

      // Get last connection id
      const lastId = network.connections[network.connections.length-1].id;

      // Add two (excess) connection genes that are not in network1 to network
      network.connections.push(new Connection(n2, n1, { id: lastId + 1 }));
      network.connections.push(new Connection(n3, n2, { id: lastId + 2 }));

      // Store added connections to test for origin later
      const added = new Set([lastId + 1, lastId + 2]);

      // Run crossover to the get the resulting connection data array
      // Important note: network1 is the less fit network, calling network is always fitter, order matters
      const newConns = network.crossOver(network1);

      // Cycle through newConns and see if the id is within the added set, if so expect it to be from the fitter network
      newConns.forEach(conn => {
        // Ensure each excess id was inherited from the fitter parent
        if(added.has(conn.id)) {
          expect(conn).to.have.property('status', 'excess/disjoint');
          expect(conn).to.have.property('fitter', true);
        }
      })
    })

    // TODO. Skipping now in the interest of time
    it.skip('network.crossOver(network1) => {connection_data}, network1 = less fit, excess genes | returns sequentially ordered ids', async function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      // Indexes of genes (connections) that will not be in less fit parent
      const indexes = [1,6,8,9,10,12]; // removed ids: 2, 7, 8, 9, 10, 11, 13 -- assuming that connection ids are sequential upon construction, which they should be.

      // index offset, used to keep update indexes as connections are spliced
      let offset = 0;

      // Collect removed connection ids to test for origin later
      const removed = new Set();

      // Remove disjoint genes from less fit parent
      for(const index of indexes) {
        // network1 is the less fit parent
        const deleted = network1.connections.splice(index - offset, 1)[0];

        // Add the removed id to the removed connection ids
        removed.add(deleted.id);

        // Add one to the index offset
        offset++;
      }

      // Run crossover to the get the resulting connection data array
      // Important note: network1 is the less fit network, calling network is always fitter, order matters
      const newConns = network.crossOver(network1);

      // Cycle through newConns and see if the id is within the removed set, if so expect it to be from the fitter network
      newConns.forEach(conn, index => {
        // Ensure each id was inherited and is sequentially ordered
        expect(conn.id).equal(index + 1);
      })
    })

    it('network.crossOver(network1) => {connection_data}, network1 = less fit | By default, excess genes not inherited from less fit parent', async function() {
      const network = new Network(4,4);
      const network1 = new Network(4,4);

      // Nodes to recurrently connect
      const n1 = network1.nodes[5]; // Assumes input, hidden, output order in network.nodes
      const n2 = network1.nodes[6];
      const n3 = network1.nodes[7];

      // Get last connection id
      const lastId = network1.connections[network1.connections.length-1].id;

      // Add two (excess) connection genes that are not in network to network1
      network1.connections.push(new Connection(n2, n1, { id: lastId + 1 }));
      network1.connections.push(new Connection(n3, n2, { id: lastId + 2 }));

      // Store added connections to test for origin later
      const added = new Set([lastId + 1, lastId + 2]);

      // Run crossover to the get the resulting connection data array
      // Important note: network1 is the less fit network, calling network is always fitter, order matters
      const newConns = network.crossOver(network1);

      // Cycle through newConns chceck that there are no added excess ids from the less-fit network
      newConns.forEach(conn => {
        if(added.has(conn.id)) throw new Error('An excess gene was inherited from a less fit parent')
      })
    })

    it('network.crossOver(network1), matching disabled genes in only fitter parent | sometimes re-enabled when inherited', async function() {
      let network = new Network(1,1); // starts with one connection
      const network1 = new Network(9,9); // has 81 connections

      // Do 40 ADD_NODE mutations, each mutation adds 2 connections and disables the replaced connection.
      for(let i = 0; i < 40; i++) {
        network = network.mutate(methods.mutation.ADD_NODE);
      }

      // network is the fitter network, so it's excess / disjoint connections (basically all connections except maybe first) will be inherited
      const conns = network.crossOver(network1);

      let found = false;
      conns.forEach(conn => {
        // check: gene comes from fitter parent, is in both parents, was disabled originally but is now enabled, and, if so, satisfy assertion
        if(conn.fitter && conn.status == "matching" && !conn.ancestorEnabled && conn.enabled) found = true;
      })

      // There were no enabled connections, unlikely to happen normally, but possible
      if(!found) throw new Error("There are no re-enabled connections in crossover offspring network!");
    })

    it('network.crossOver(network1), matching disabled genes in only fitter parent | sometimes inherited as disabled', async function() {
      let network = new Network(1,1); // starts with one connection
      const network1 = new Network(9,9); // has 81 connections

      // Do 40 ADD_NODE mutations, each mutation adds 2 connections and disables the replaced connection.
      for(let i = 0; i < 40; i++) {
        network = network.mutate(methods.mutation.ADD_NODE);
      }

      // network is the fitter network, so it's excess / disjoint connections (basically all connections except maybe first) will be inherited
      const conns = network.crossOver(network1);

      let found = false;
      conns.forEach(conn => {
        // check: gene comes from fitter parent, is in both parents, was disabled originally and is still disabled, and, if so, satisfy assertion
        if(conn.fitter && conn.status == "matching" && !conn.ancestorEnabled && !conn.enabled) found = true;
      })

      // There were no enabled connections, unlikely to happen normally, but possible
      if(!found) throw new Error("There are no preserved disabled connections in crossover offspring network!");
    })

    it('network.crossOver(network1), excess disabled genes in fitter parent | inherited as disabled', async function() {
      let network = new Network(1,2); // starts with 1 excess connection, total 2
      const network1 = new Network(1,1); // starts with 1 connection

      // Disable the second connection
      network.connections[1].enabled = false;

      // network is the fitter network, so it's excess / disjoint connection will be inherited
      const conns = network.crossOver(network1);

      // expect the second, excess, connection to be disabled
      expect(conns[1]).to.have.property('enabled', false);
    })

    it('network.crossOver(network1), excess enabled genes in fitter parent | inherited as enabled', async function() {
      let network = new Network(1,2); // starts with 1 excess connection, total 2
      const network1 = new Network(1,1); // starts with 1 connection

      // Ensure second connection is enabled
      network.connections[1].enabled = true;

      // network is the fitter network, so it's excess / disjoint connection will be inherited
      const conns = network.crossOver(network1);

      // expect the second, excess, connection to be enabled
      expect(conns[1]).to.have.property('enabled', true);
    })

    // Should be done for future-proofing, skipping now in interest of time
    it.skip('network.crossOver(network1), disjoint disabled genes in fitter parent | inherited as disabled', async function() {
      let network = new Network(1,2); // starts with 1 excess connection, total 2
      const network1 = new Network(1,1); // starts with 1 connection

      // Disable the second connection
      network.connections[1].enabled = false;

      // network is the fitter network, so it's excess / disjoint connection will be inherited
      const conns = network.crossOver(network1);

      // expect the second, excess, connection to be disabled
      expect(conns[1]).to.have.property('enabled', false);
    })

    // Should be done for future-proofing, skipping now in interest of time
    it.skip('network.crossOver(network1), disjoint enabled genes in fitter parent | inherited as enabled', async function() {
      let network = new Network(1,2); // starts with 1 excess connection, total 2
      const network1 = new Network(1,1); // starts with 1 connection

      // Ensure second connection is enabled
      network.connections[1].enabled = true;

      // network is the fitter network, so it's excess / disjoint connection will be inherited
      const conns = network.crossOver(network1);

      // expect the second, excess, connection to be enabled
      expect(conns[1]).to.have.property('enabled', true);
    })
  })

  describe('network.disconnect()', function () {
    const test_network = createUsedNetwork();
    it.skip('network.disconnect(Node, Node) => {undefined}', function () {
      const test_node = new Node();
      test_network.nodes[2].connect(test_node);
      test_node.connect(test_network.nodes[16]);
      test_network.addNodes(test_node);

      const before_network_connection_size = test_network.connections.length;

      test_network.disconnect(test_node, test_network.nodes[16]);
      test_network.disconnect(test_network.nodes[2], test_node);

      expect(test_network.connections.length).to.equal(before_network_connection_size - 1);
      expect(test_node.outgoing).to.be.empty;
    })
    it('network.disconnect(Node, Node) => {Error} | when Nodes unconnected', async function () {
      const network = new Network(2,2);

      // test assumes nodes order, currently organized as inputs, hidden (there are none), and outputs
      expect(() => network.disconnect(network.nodes[0], network.nodes[1])).throw(Error, "No matching connection found in network");
    })
    it('network.disconnect(Node, Node) => {Connection} | when Nodes connected', async function() {
      const network = new Network(2,2);

      // test assumes nodes order, currently organized as inputs, hidden (there are none), and outputs
      expect(network.disconnect(network.nodes[0], network.nodes[2])).to.be.an.instanceOf(Connection)
    })
    it("network.disconnect(Node, Node) | sets corresponding network connection .enabled property to false", async function() {
      const network = new Network(2,2);

      // Setup
      const from = network.nodes[0];
      const to = network.nodes[2];
      network.disconnect(from, to); // run the tested function

      // Verify target connection's .enabled property was set to false
      network.connections.map(conn => {
        if(conn.from === from && conn.to === to) expect(conn.enabled).equal(false)
      })
    })
    it("network.disconnect(Node, Node) | preserves network connections length", async function() {
      const network = new Network(2,2);

      const length = network.connections.length;

      // Setup
      network.disconnect(network.nodes[0], network.nodes[2]); // run the tested function

      // Verify target connection's .enabled property was set to false
      expect(network.connections.length).equal(length)
    })
    it.skip("node.disconnect(Node2) | removes Node2 from node's .outgoing connection array")
  })

  describe.skip('network.evolve()', function () {
    // similar to network.train, with the difference that this dataset requires
    // evolving the network to be solvable
    it('network.evolve(dataset) => {{error:{number},iterations:{number},time:{number}}}', async function () {
      this.timeout(30000);
      const network = new Network(2,1);
      for (let i = 0; i < 10; i++) {
        network.mutate(mutation.ADD_NODE)
      }

      // multiplies the two inputs
      const dataset = [
        { input: [1,0], output: [0]},
        { input: [0,1], output: [0]},
        { input: [1,1], output: [1]},
        { input: [2,1], output: [2]},
        { input: [2,2], output: [4]},
        { input: [2,3], output: [6]},
        { input: [3,3], output: [9]},
        { input: [-3,3], output: [-9]},
      ];

      const initial = network.test(dataset);
      const test_return = await network.evolve(dataset, { iterations: 5 });
      // TODO: 5 iterations is nothing but it's still taking over 2 seconds. Must be improved a TON.
      const final = network.test(dataset);

      expect(test_return.error).to.be.a('number');
      expect(test_return.iterations).to.be.a('number');
      expect(test_return.time).to.be.a('number');
      expect(final.error).to.be.below(initial.error);
    })
  })

  describe('network.gate()', function () {
    it('network.gate(node_not_in_network, Connection) => {ReferenceError}', function () {
      const test_network = createUsedNetwork();
      const new_node = new Node();
      const connection = new_node.connect(test_network.nodes[20]);

      expect(() => {test_network.gate(new_node, connection)}).to.throw(ReferenceError);
    })
    it('network.gate(Node, Connection) => {undefined}', function () {
      const test_network = createUsedNetwork();
      const new_node = new Node();
      const connection = new_node.connect(test_network.nodes[20]);
      test_network.addNodes(new_node);

      const before_number_of_gates = test_network.gates.length;
      test_network.gate(new_node, connection);
      expect(test_network.gates).to.be.of.length(before_number_of_gates + 1);
      expect(connection.gater).to.eql(new_node);
      expect(new_node.gated).to.have.lengthOf(1);
    })
  })

  describe('network.getRandomConnection()', function () {
    it('getRandomConnection() => {Error} | when all connections disabled', function() {
      const network = new Network(1,1)

      // disable only connection manually
      network.connections[0].enabled = false;

      // Expect an error to be thrown
      expect(() => network.getRandomConnection()).throw(Error)
    })
    it('getRandomConnection() | returns enabled connections exclusively (probabilistic)', function() {
      const network = new Network(4,4)

      const times = function(times, fn) {
        while(times) {
          fn();
          times--;
        }
      }

      // disable some connections manually
      times(5, () => { network.connections[Math.floor(Math.random() * network.connections.length)].enabled = false; })

      // Expect each try to return an enabled connection
      times(50, () => { expect(network.getRandomConnection().enabled).equal(true) })
    })
  })

  describe('network.mutate()', function() {

    describe('ADD_NODE', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {
        let network = new Network(1,1)
        const originalNetwork = network.clone()
        network = network.mutate(methods.mutation.ADD_NODE)

        expect(network).not.eql(originalNetwork)
      })

      it("Network.nodes.length is greater by 1 after mutation", function() {
        let network = new Network(1,1)
        const original_nodes_length = network.nodes.length
        network = network.mutate(methods.mutation.ADD_NODE)

        expect(network.nodes.length).equal(original_nodes_length + 1)
      })

      it("Network.connections.length is greater by 2 after mutation", function() {
        let network = new Network(1,1)
        const original_connections_length = network.connections.length
        network = network.mutate(methods.mutation.ADD_NODE)

        expect(network.connections.length).equal(original_connections_length + 2)
      })

      it("First neuron should have no incoming connections | new Network(1,1)", function() {
        let network = new Network(1,1)
        network = network.mutate(methods.mutation.ADD_NODE)

        expect(network.nodes[0].incoming).eql([])
      })

      it('Middle (hidden) neuron should have directionally correct incoming & outgoing connections | new Network(1,1)', function() {
        let network = new Network(1,1)
        network = network.mutate(methods.mutation.ADD_NODE)
        const json = network.toJSON()

        // Disabled connection continues to occupy index 0, 2 new connections take index 1 & 2
        expect(json.connections[1].from).equal(0)
        expect(json.connections[1].to).equal(1)
        expect(json.connections[2].from).equal(1)
        expect(json.connections[2].to).equal(2)

        // Additional notes: this test makes an assumption that
        // neurons should only be between inputs & outputs but it's
        // conceivable that some problems would benefit from "peripheral"
        // neurons that connect from the output (or a series of outputs) back into another neuron
        // including other inputs and outputs. We can't be sure that this behavior wouldn't be useful
        // in some cases and it would be best if we let the evolutionary algorithms handle sorting
        // if these structures are useful should they arise.
        // In short: we shouldn't stop networks with peripheral neurons to form in the future,
        // but right now we're making a compromise
      })

      it("New neuron's out connection matches replaced connection's weight", function() {
        let network = new Network(1,1)
        const original = network.connections[0].weight
        network = network.mutate(methods.mutation.ADD_NODE)
        // Original connection continues to occupy zero index, outgoing connection occupies index 2
        expect(network.connections[2].weight).equal(original)
      })

      it("New neuron's in connection has a weight of 1", function () {
        let network = new Network(1,1)
        const original = network.connections[0].weight
        network = network.mutate(methods.mutation.ADD_NODE)
        // Original connection continues to occupy zero index, incoming connection occupies index 1
        expect(network.connections[1].weight).equal(1)
      })

      it("Last neuron should have no outgoing connections | new Network(1,1)", function() {
        let network = new Network(1,1)
        network = network.mutate(methods.mutation.ADD_NODE)

        expect(network.nodes[2].outgoing).eql([])
      })

      it("new Network({ nodeIds }), new node | updates nodeIds with new node id", function check_nodeIds_mutation () {
        let network = new Network(1,1, { nodeIds: { last: 1 }})
        network = network.mutate(methods.mutation.ADD_NODE)

        expect(network.nodeIds[2]).equal(2)
      })

      it("new Network({ nodeIds }), existing node | doesn't extend nodeIds with existing node ids", function () {
        const nodeIds = { last: 1 }
        let network = new Network(1,1, { nodeIds });
        let network2 = new Network(1,1, { nodeIds });

        network = network.mutate(methods.mutation.ADD_NODE);

        network2 = network2.mutate(methods.mutation.ADD_NODE);

        expect(Object.keys(nodeIds).length).equal(2); // 1 entry plus the .last key
      })

      it("new Network({ nodeIds }), existing node | doesn't increase nodeIds.last", function () {
        const nodeIds = { last: 1 }
        let network = new Network(1,1, { nodeIds });
        let network2 = new Network(1,1, { nodeIds });

        network = network.mutate(methods.mutation.ADD_NODE) // .last is now 2

        network2 = network2.mutate(methods.mutation.ADD_NODE) // should not increase nodeIds

        expect(network2.nodeIds.last).equal(2)
      })

      it("new Network({ nodeIds }), existing node | sets existing new-node id correctly", function () {
        const nodeIds = { last: 1 }
        let network = new Network(1,1, { nodeIds });
        let network2 = new Network(1,1, { nodeIds });

        network = network.mutate(methods.mutation.ADD_NODE)

        network2 = network2.mutate(methods.mutation.ADD_NODE)

        expect(network2.nodes[1].id).equal(2)
      })

      it("new net({ nodeIds }), new net2({ nodesIds }), new node on net2  | updates net1 nodeIds correctly", function () {
        const nodeIds = { last: 1 }
        let network = new Network(1,1, { nodeIds });
        let network2 = new Network(1,1, { nodeIds });

        network = network.mutate(methods.mutation.ADD_NODE)

        // equivalent mutation, no change in nodeIds, .last still 2
        network2 = network2.mutate(methods.mutation.ADD_NODE)

        // new structural mutation, change in nodeIds, .last now 3
        network2 = network2.mutate(methods.mutation.ADD_NODE)

        // network1 should have its nodeIds updated
        expect(network.nodeIds.last).equal(3)
      })

      it("new net({ nodeIds, connIds }), new net2({ nodesIds, connIds }), new node on net2  | updates net1 connIds correctly", function () {
        const nodeIds = { last: 0 }
        const connIds = { last: 0 }
        let network = new Network(1,1, { nodeIds, connIds });
        let network2 = new Network(1,1, { nodeIds, connIds }); // 1 connection added, .last is now 1

        network = network.mutate(methods.mutation.ADD_NODE) // 2 connections added, .last is now 3

        // equivalent mutation, no change in nodeIds, .last still 3
        network2 = network2.mutate(methods.mutation.ADD_NODE)

        // new structural mutation, change in nodeIds, .last now 5
        network2 = network2.mutate(methods.mutation.ADD_NODE)

        // network1 should have its connIds updated
        expect(network.connIds.last).equal(5)
      })

      // to be implemented
      it.skip("(), new node | updates network's internal value", function () {
        let network = new Network(1,1)
        network = network.mutate(methods.mutation.ADD_NODE)
        network = network.mutate(methods.mutation.ADD_NODE)
        expect(network).equals(3)
      })

      // to be implemented
      it.skip("(), existing node | doesn't increase network's internal", function () {})
    })

    describe('ADD_CONNECTION', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('MOD_BIAS', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('MOD_WEIGHT', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('SUB_CONN', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('SUB_NODE', function() {
      it('given a network with 7 nodes, should produce a network with 6', function(){
        // const network = new architect.Random(2,3,2);
        const network = new architect.Perceptron(2,3,2);

        network.mutate(mutation.SUB_NODE);

        expect(network.nodes.length).to.equal(6);
      });

      it('given a network with no hidden nodes, should keep network unchanged', function(){
        // Update "new Network" to allow for hidden nodes
        let network = new architect.Random(2,0,2); // strange workaround
        let network2 = _.cloneDeepWith(network)

        network2.mutate(mutation.SUB_NODE);

        assert.deepEqual(network.toJSON(), network2.toJSON())
      });

      it('given mutation.SUB_NODE.mutateOutput = false, should leave output nodes unchanged', function() {
        let network = new architect.Random(2,50,2);

        let outputs = _.filter(network.nodes, (node) => {
          return (node.type === 'output')
        })

        let total = network.nodes.length;
        for(let i = 0; i < total; i++) {
          network.mutate(mutation.SUB_NODE)
        }

        assert.deepEqual(outputs, _.filter(network.nodes, (node) => { return (node.type === 'output') }))
      })
    })

    describe('MOD_ACTIVATION', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('ADD_GATE', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('SUB_GATE', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('ADD_SELF_CONN', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('SUB_SELF_CONN', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('ADD_BACK_CONN', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('SUB_BACK_CONN', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

    describe('SWAP_NODES', function() {
      it('originalNetwork != newNetwork | when mutation possible', function() {

      })

    })

  })

  describe('Network.mutateRandom()', function () {
    it('() => {Network}', function () {
      let template = new Network(1,2)
      let network = new architect.Perceptron(2,3,2)

      expect(network.mutateRandom()).to.include.keys(Object.keys(template))
    })

    it('([]) => {Network}', function () {
      let template = new Network(1,2)
      let network = new architect.Perceptron(2,3,2)

      expect(network.mutateRandom([])).to.include.keys(Object.keys(template))
    })

    it('originalNetwork !== newNetwork', function () {
      let network = new architect.Perceptron(2,3,2)
      const copy = _.cloneDeep(network);

      // in place mutation (instead of reassignment)
      network = network.mutateRandom();

      expect(copy).to.not.eql(network) // eql: check for content equality (instead of for the same point in memory)
    })

    it("Shouldn't add node when at max nodes", function () {
      let network = new architect.Perceptron(2,3,2)

      network.mutateRandom([methods.mutation.ADD_NODE], { maxNodes: 7 })

      expect(network.nodes.length).equal(7)
    })

    it("Shouldn't add connections when at max connections", function () {
      let network = new architect.Perceptron(1,2,2)

      network.mutateRandom([methods.mutation.ADD_CONN], { maxConns: 6 })

      // natural max is 9
      expect(network.connections.length).equal(6)
    })

    it("Shouldn't add connections when at max gates", function () {
      let network = new architect.Perceptron(1,2,2)

      // directly depends on .mutate(), not ideal
      network.mutate(methods.mutation.ADD_GATE)

      network.mutateRandom([methods.mutation.ADD_GATE], { maxGates: 1 })

      // natural max is 5
      expect(network.gates.length).equal(1)
    })

    it("Shouldn't change network when all methods impossible", function () {
      let network = new architect.Perceptron(2,3,2)
      const copy = _.cloneDeep(network);

      // impossible mutation method
      network.mutateRandom([methods.mutation.SUB_GATE])

      // clear mutations array for deep equality check
      network.mutations = [];

      expect(copy).to.eql(network) // eql: check for content equality (instead of for the same point in memory)
    })
  })

  describe('network.propagate()', function () {
    it('network.propagate(rate, momentum, update, target_output) => {undefined}', function () {
      const upper_test_epoch_limit = 2000; // will attempt to propagate this many times

      const test_network = createUsedNetwork();

      // train the network to output all 1s.
      const input_size = test_network.input_nodes.size;
      const output_size = test_network.output_nodes.size;
      const ideal_output = Array(output_size).fill(1);

      for (let i = 0; i < upper_test_epoch_limit; i++) {
        const random_input = Array(input_size).fill(0).map(() => Math.random());
        test_network.activate(random_input);
        test_network.propagate(0.25, 0.01, true, ideal_output);
      }

      const random_input = Array(input_size).fill(0).map(() => Math.random());
      const test_output = test_network.activate(random_input);

      const epsilon = 0.08;
      test_output.forEach((value, index) => {
        expect(value).to.be.closeTo(ideal_output[index], epsilon);
      });

    })
  })

  describe('network.remove()', function () {
    it('network.remove(node_not_in_network) => {ReferenceError}', function () {
      const test_network = createUsedNetwork();
      const node_not_in_network = new Node();

      expect(() => {test_network.remove(node_not_in_network)}).to.throw(ReferenceError);
    })

    // Unclear what this is testing for, skipping for now, todo: refactor later
    it.skip('network.remove(Node) => {undefined}', function () {
      const test_network = createUsedNetwork();
      const new_node = new Node();

      // set up the connections to test their status after removing the node
      test_network.nodes[1].connect(new_node);
      test_network.nodes[2].connect(new_node);
      new_node.connect(test_network.nodes[24]);
      new_node.connect(test_network.nodes[25]);
      new_node.connect(test_network.nodes[26]);
      new_node.connect(test_network.nodes[30]);

      test_network.addNodes(new_node);

      // remove the node and check that it's not part of the network anymore and that the
      // connections were redirected
      const before_size = test_network.nodes.length;

      test_network.remove(new_node);
      expect(test_network.nodes).to.be.of.length(before_size - 1);

      const input_node_ids_to_test = [1, 2];
      const output_node_ids_to_test = [24, 25, 26, 30];
      const i_max = input_node_ids_to_test.length;
      const j_max = output_node_ids_to_test.length;
      // this check is a mess because of how carrot deals with connections...
      // if the connection list were unique ids of the target nodes this would be so much easier..
      for (let i = 0; i < i_max; i++) {
        for (let j = 0; j < j_max; j++) {
          const from_node = test_network.nodes[input_node_ids_to_test[i]];
          const to_node = test_network.nodes[output_node_ids_to_test[j]];
          // cycle through from_node outgoing connections until to_node is found
          let is_connected = false;
          from_node.outgoing.forEach(connection => {
            if (connection.to == to_node) {
              is_connected = true;
            }
          })
          expect(is_connected).to.be.ok;
        }
      }
    })
  })

  describe('network.set()', function () {
    const test_network = createUsedNetwork();
    test_network.set({ bias: 1.3 });
    test_network.nodes.forEach(node => {
      expect(node.bias).to.equal(1.3);
    })
  })

  describe('network.train()', function () {
    it('network.train(dataset) => {{error:{number},iterations:{number},time:{number}}}', function () {
      const network = new Network(4,4);

      // reverse input
      const dataset = [
        { input: [1,0,0,0], output: [0,0,0,1]},
        { input: [0,1,0,0], output: [0,0,1,0]},
        { input: [0,0,1,0], output: [0,1,0,0]},
        { input: [0,0,0,1], output: [1,0,0,0]},
      ];

      const initial = network.test(dataset);
      const test_return = network.train(dataset);
      const final = network.test(dataset);

      expect(test_return.error).to.be.a('number');
      expect(test_return.iterations).to.be.a('number');
      expect(test_return.time).to.be.a('number');
      expect(final.error).to.be.at.most(initial.error / 4);
    })
  })

  describe('network.ungate()', function () {
    it('network.ungate(connection_not_in_network) => {ReferenceError}', function () {
      const test_network = createUsedNetwork();
      const new_node = new Node();
      const connection = new_node.connect(test_network.nodes[20]);
      new_node.gate(connection);

      expect(() => {test_network.ungate(connection)}).to.throw(Error);
    })
    it('network.ungate(Connection) => {undefined}', function () {
      const test_network = createUsedNetwork();
      const new_node = new Node();
      const connection = new_node.connect(test_network.nodes[20]);
      test_network.addNodes(new_node);
      test_network.gate(new_node, connection);

      const before_number_of_gates = test_network.gates.length;
      test_network.ungate(connection);
      expect(test_network.gates).to.be.of.length(before_number_of_gates - 1);
      expect(connection.gater).to.not.exist;
      expect(new_node.gated).to.have.lengthOf(0);
    })
  })
})
