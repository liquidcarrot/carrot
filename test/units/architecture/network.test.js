const _ = require('lodash')
const { assert, expect } = require('chai')
const should = require('chai').should()
const {
  Network,
  methods,
  config,
  architect,
  Node,
  Connection
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
  describe('new Network()', function () {
    it('new Network() => {TypeError}', function () {
      // missing input or output size
      expect(() => new Network()).to.throw(TypeError);
      expect(() => new Network(3461)).to.throw(TypeError);
    })

    it('new Network(input_size, output_size) => {Network}', function () {
      const network = new Network(10, 20);
      expect(network).to.be.an.instanceOf(Network);
      expect(network.nodes).to.be.of.length(30);
    })
  })

  describe('network.connect()', function () {
    it('network.connect() => {Connection[]}', function () {
      const network = new Network(10, 20);
      const source_node = new Node();
      const target_node = network.nodes[25];
      const formed_connections = network.connect(source_node, target_node, 7);
      expect(formed_connections).to.be.an(`array`);
      expect(formed_connections).to.be.of.length(1);

      const formed_connection = formed_connections[0];

      expect(formed_connection).to.be.an.instanceOf(Connection);
      expect(formed_connection.from).eql(source_node);
      expect(formed_connection.to).eql(target_node);
    })
  })

  describe('network.activate()', function () {
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

      debugger;

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

      // const source_node = new Node();
      // network.addNodes(source_node);
      // const target_node = network.nodes[25];
      // network.connect(source_node, target_node, 7);
    })
    it('network.activate(Array<Number>, bool) => {Array<Number>}', function () {

    })
  })

  describe('network.mutate()', function() {
    describe('mutation.SUB_NODE', function() {
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

    });
  });
  describe("network.clone()", function() {

  })
})
