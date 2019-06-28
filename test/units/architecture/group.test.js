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
    },
    // checks correct backpropagate returned error
    // options:
    // error(error)
    error: function(error) {
      expect(error).to.exist;
      expect(error).to.be.an("object");
      expect(error.responsibility).to.be.finite;
      expect(error.projected).to.be.finite;
      expect(error.gated).to.be.finite;
    }
  }// close of is

  // returns {main_group, other_group}
  function createRandomGroups(dont_connect) {
    // create the most random group to be returned
    const main_group = new Group(10);

    // change the group a bit
    // this other group is used to apply functions to main group
    const other_group = new Group(5);
    if (!dont_connect) {
      main_group.connect(other_group);
      other_group.connect(main_group);
    }

    const random_array = Array(main_group.nodes.length).fill(0).map(() => Math.random());

    main_group.activate(random_array);
    main_group.propagate(random_array);

    return { main_group, other_group }
  }

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
    it("group.clear() => {Group}", function () {

      const { main_group: group_to_clear, other_group } = createRandomGroups();

      // clear the group
      expect(group_to_clear.clear()).to.be.an.instanceOf(Group);
      group_to_clear.nodes.forEach(node => {
        expect(node.old).to.equal(0);
        expect(node.state).to.equal(0);
        expect(node.activation).to.equal(0);
        expect(node.error_responsibility).to.equal(0);
        expect(node.error_projected).to.equal(0);
        expect(node.error_gated).to.equal(0);
        node.connections_incoming.forEach(connection => {
          expect(connection.elegibility).to.equal(0);
          expect(connection.xtrace_nodes).to.be.an('array');
          expect(connection.xtrace_values).to.be.an('array');
        });
        node.connections_gated.forEach(connection => {
          expect(connection.gain).to.equal(0);
        });
      });

    })
  });

  describe("group.activate()", function() {
    // options:
    // group.activate(), group.activate(numbers), group.activate(wrong_length_array) => RangeError
    it("group.activate() => {number[]}", function() {
      const { main_group, other_group } = createRandomGroups();
      const result = main_group.activate();
      result.forEach(val => expect(val).to.be.a("number"));
      expect(result.length).to.equal(main_group.nodes.length);
    })
    it("group.activate(input_array) => {number[]}", function() {
      const { main_group, other_group } = createRandomGroups();
      const random_array = Array(main_group.nodes.length).fill(0).map(() => Math.random());
      const result = main_group.activate(random_array);
      result.forEach(val => expect(val).to.be.a("number"));
      expect(result.length).to.equal(main_group.nodes.length);
    })
    it("group.activate(wrong_size_array) => {RangeError}", function() {
      const { main_group, other_group } = createRandomGroups();
      const wrong_size_array = [0.1245, 0.95];
      expect(() => main_group.activate(wrong_size_array)).to.throw(RangeError);
    })
  })

  describe("group.propagate()", function() {
    // options
    // propagate(), propagate(target), propagate(options), propagate(target, options),
    // propagate(wrong_length)
    it("group.propagate() => {Array<{responsibility: number, projected: number, gated: number}>}", function() {
      const { main_group, other_group } = createRandomGroups();
      main_group.activate()
      const errors = main_group.propagate()
      errors.forEach(error => is.error(error))
      main_group.nodes.forEach(node => {
        expect(node.delta_bias_total).to.equal(0);
        expect(node.delta_bias_previous).to.equal(0);
      })
    })
    it("group.propagate(target) => {Array<{responsibility: number, projected: number, gated: number}>}", function() {
      const { main_group, other_group } = createRandomGroups();

      const random_numbers = Array(main_group.nodes.length).fill(0).map(() => Math.random() * 10);
      const other_numbers = Array(main_group.nodes.length).fill(0).map(() => Math.random() * 10);

      main_group.activate(random_numbers);
      const errors = main_group.propagate(other_numbers);

      errors.forEach((error) => {
        is.error(error);
      });
    })
    it("group.propagate(options) => {Array<{responsibility: number, projected: number, gated: number}>}", function() {
      const { main_group, other_group } = createRandomGroups();

      const random_numbers = Array(main_group.nodes.length).fill(0).map(() => Math.random() * 10);

      main_group.activate(random_numbers);

      // first run without an updated
      const options_without_update = { update: false };
      let errors = main_group.propagate(options_without_update);
      expect(errors).to.be.an("array");
      errors.forEach((error) => {
        is.error(error);
      });
      main_group.nodes.forEach(node => {
        expect(node.delta_bias_total).to.equal(0);
        expect(node.delta_bias_previous).to.equal(0);
      })

      // now try with an update
      const options_with_update = { update: true };
      errors = main_group.propagate(options_with_update);
      expect(errors).to.be.an("array");
      errors.forEach((error) => {
        is.error(error);
      });
      main_group.nodes.forEach(node => {
        expect(node.delta_bias_total).to.equal(0);
        expect(node.delta_bias_previous).to.equal(0);
      })
    })
    it("group.propagate(target, options) => {Array<{responsibility: number, projected: number, gated: number}>}", function() {
      const { main_group, other_group } = createRandomGroups();


      const random_numbers = Array(main_group.nodes.length).fill(0).map(() => Math.random() * 10);
      const other_numbers = Array(main_group.nodes.length).fill(0).map(() => Math.random() * 10);

      main_group.activate(random_numbers);

      // first run without an updated
      const options_without_update = { update: false };
      let errors = main_group.propagate(other_numbers, options_without_update);

      errors.forEach((error) => {
        is.error(error);
      });

      // run with update now
      const options_with_update = { update: true };
      errors = main_group.propagate(other_numbers, options_with_update);

      errors.forEach((error) => {
        is.error(error);
      });
    })
    it("group.propagate(wrong_length_array) => {RangeError}", function() {
      const { main_group, other_group } = createRandomGroups();

      const wrong_length_array = [0.574, 0.76];

      main_group.activate()
      expect(() => main_group.propagate(wrong_length_array)).to.throw(RangeError);
    })

  })


  describe("group.connect()", function() {
    // options
    // connect(target, methods.connection[any_method_here]), <- no weight
    // connect(target, methods.connection.ONE_TO_ONE, weight),
    // connect(target, methods.connection.ALL_TO_ELSE, weight),
    // connect(target, methods.connection.ALL_TO_ALL, weight)
    it("group.connect(target, methods.connection.ALL_TO_ALL) => {Connection[]}", function() {
      let { main_group, other_group } = createRandomGroups(true);
      main_group.connect(other_group, methods.connection.ALL_TO_ALL);

      main_group.nodes.forEach(node => {
        expect(node.connections_outgoing.length).equal(other_group.nodes.length);
      });
    })
    it("group.connect(target, methods.connection.ALL_TO_ALL, weight) => {Connection[]}", function() {
      let { main_group, other_group } = createRandomGroups(true);
      const weight = Math.random();
      main_group.connect(other_group, methods.connection.ALL_TO_ALL, weight);

      main_group.nodes.forEach(node => {
        expect(node.connections_outgoing.length).equal(other_group.nodes.length);
        node.connections_outgoing.forEach(connection => expect(connection.weight).to.equal(weight));
      });
    })
    it("group.connect(target, methods.connection.ALL_TO_ELSE, weight) => {Connection[]}", function() {
      let { main_group, other_group } = createRandomGroups(true);
      const weight = Math.random();
      main_group.connect(main_group, methods.connection.ALL_TO_ELSE, weight);
      main_group.nodes.forEach(node => {
        expect(node.connections_outgoing.length).equal(0);
      });

      ({ main_group, other_group } = createRandomGroups(true));
      main_group.connect(other_group, methods.connection.ALL_TO_ELSE, weight);
      main_group.nodes.forEach(node => {
        expect(node.connections_outgoing.length).equal(other_group.nodes.length);
      });
    })
    it("group.connect(target, methods.connection.ONE_TO_ONE, weight) => {Connection[]}", function() {
      let { main_group } = createRandomGroups(true);
      let other_group = new Group(main_group.nodes.length);
      const weight = Math.random();
      main_group.connect(other_group, methods.connection.ONE_TO_ONE, weight);

      main_group.nodes.forEach(node => {
        expect(node.connections_outgoing.length).equal(1);
        node.connections_outgoing.forEach(connection => expect(connection.weight).to.equal(weight));
      });
    })
    // TODO: ONE_TO_ONE
  })
})
