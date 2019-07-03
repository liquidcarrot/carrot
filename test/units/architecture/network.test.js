let _ = require('lodash')
let { assert, expect } = require('chai')
let should = require('chai').should()
let {
  Network,
  methods,
  config,
  architect
} = require('../../../src/carrot')


let mutation = methods.mutation;

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
     it('new Network() => {Network}', function () {
       const network = new Network(10, 20);
       expect(network).to.be.an.instanceOf(Network);
       expect(network.nodes).to.be.of.length(30);
     })
   })

   describe('network.connect()', function () {

   })

   describe('.mutate()', function() {

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
