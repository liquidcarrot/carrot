let { assert, expect } = require('chai');
let should = require('chai').should();
let carrot = require('../../../src/carrot');

const { Group, Layer, Connection, Node, methods } = require('../../../src/carrot');

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


describe("Group", function() {
  const is = {
    group: function(group) {
      expect(group).to.be.an.instanceOf(Group);
      expect(group.nodes).to.be.an("array");
      group.nodes.forEach(node => expect(node).to.be.an.instanceOf(Node));

      // const example_connections = {
      //   connections_self: Number(1246315), // any number
      //   connections_incoming: [],
      //   connections_outgoing: []
      // };
      expect(group.connections_self).to.be.an("array");
      expect(group.connections_incoming).to.be.an("array");
      expect(group.connections_outgoing).to.be.an("array");
      const array_of_arrays = [group.connections_self, group.connections_incoming, group.connections_incoming];
      array_of_arrays.forEach(array_of_connections => array_of_connections.forEach(connection => {
        expect(connection).to.be.an.instanceOf(Connection);
      }));
    }
  }// close of is

  describe("new Group()", function() {
    it("new Group() => {Group}", function() {
      const group = new Group();

      is.group(group);
    })
    it("new Group(size) => {Group}", function() {
      const group = new Group(5);
      is.group(group)
      expect(group.nodes).to.be.an("array");
      expect(group.nodes).to.have.lengthOf(5);
    })
  })

  describe("group.clear()", function() {
    const cleared_node = new Node();
    cleared_node.id = 0;
    // it()
  });

})
