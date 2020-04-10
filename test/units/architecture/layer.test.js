let { assert, expect } = require('chai');
let should = require('chai').should();
let carrot = require('../../../src/index');
const { Group, Layer, Connection, Node, methods } = carrot;

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

describe("Layer", function() {
  const is = {
    layer: function(layer) {
      expect(layer).to.be.an.instanceOf(Layer);
      expect(layer.nodes).to.be.an("array");
      layer.nodes.forEach(node => expect(node).to.be.an.instanceOf(Node));

      // const example_connections = {
      //   connections_self: Number(1246315), // any number
      //   incoming: [],
      //   outgoing: []
      // };
      expect(layer.connections_self).to.be.an("array");
      expect(layer.incoming).to.be.an("array");
      expect(layer.outgoing).to.be.an("array");
      const array_of_arrays = [layer.connections_self, layer.incoming, layer.incoming];
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

  // returns {main_layer, other_layer}
  function createRandomLayers(dont_connect) {
    // create the most random layer to be returned
    const main_layer = Layer.Dense(10);

    // change the layer a bit
    // this other layer is used to apply functions to main layer
    const other_layer = Layer.Dense(5);
    if (!dont_connect) {
      main_layer.connect(other_layer);
      other_layer.connect(main_layer);
    }

    const random_array = Array(main_layer.nodes.length).fill(0).map(() => Math.random());

    main_layer.activate(random_array);
    main_layer.propagate(random_array);

    return { main_layer, other_layer }
  }

  describe("new Layer()", function() {
    it("new Layer() => {Layer}", function() {
      const layer = new Layer();

      is.layer(layer);
    })
    it("new Layer(size) => {Layer}", function() {
      const layer = new Layer(5);
      is.layer(layer)
      expect(layer.nodes).to.be.an("array");
      expect(layer.nodes).to.have.lengthOf(5);
    })
  })

  describe("layer.clear()", function() {
    it("layer.clear() => {Layer}", function () {

      const { main_layer: layer_to_clear, other_layer } = createRandomLayers();

      // clear the layer
      expect(layer_to_clear.clear()).to.be.an.instanceOf(Layer);
      layer_to_clear.nodes.forEach(node => {
        expect(node.old).to.equal(0);
        expect(node.state).to.equal(0);
        expect(node.activation).to.equal(0);
        expect(node.error_responsibility).to.equal(0);
        expect(node.error_projected).to.equal(0);
        expect(node.error_gated).to.equal(0);
        node.incoming.forEach(connection => {
          expect(connection.elegibility).to.equal(0);
          expect(connection.xtrace_nodes).to.be.an('array');
          expect(connection.xtrace_values).to.be.an('array');
        });
        node.gated.forEach(connection => {
          expect(connection.gain).to.equal(0);
        });
      });

    })
  });

  describe("layer.activate()", function() {
    // options:
    // layer.activate(), layer.activate(numbers), layer.activate(wrong_length_array) => RangeError
    it("layer.activate() => {number[]}", function() {
      const { main_layer, other_layer } = createRandomLayers();
      const result = main_layer.activate();
      result.forEach(val => expect(val).to.be.a("number"));
      expect(result.length).to.equal(main_layer.nodes.length);
    })
    it("layer.activate(input_array) => {number[]}", function() {
      const { main_layer, other_layer } = createRandomLayers();
      const random_array = Array(main_layer.nodes.length).fill(0).map(() => Math.random());
      const result = main_layer.activate(random_array);
      result.forEach(val => expect(val).to.be.a("number"));
      expect(result.length).to.equal(main_layer.nodes.length);
    })
    it("layer.activate(wrong_size_array) => {RangeError}", function() {
      const { main_layer, other_layer } = createRandomLayers();
      const wrong_size_array = [0.1245, 0.95];
      expect(() => main_layer.activate(wrong_size_array)).to.throw(RangeError);
    })
  })

  describe("layer.propagate()", function() {
    // options
    // propagate(), propagate(target), propagate(options), propagate(target, options),
    // propagate(wrong_length)
    it("layer.propagate() => {Array<{responsibility: number, projected: number, gated: number}>}", function() {
      const { main_layer, other_layer } = createRandomLayers();
      main_layer.activate()
      const errors = main_layer.propagate()
      errors.forEach(error => is.error(error))
      main_layer.nodes.forEach(node => {
        expect(node.delta_bias_total).to.equal(0);
        expect(node.delta_bias_previous).to.equal(0);
      })
    })
    it("layer.propagate(target) => {Array<{responsibility: number, projected: number, gated: number}>}", function() {
      const { main_layer, other_layer } = createRandomLayers();

      const random_numbers = Array(main_layer.nodes.length).fill(0).map(() => Math.random() * 10);
      const other_numbers = Array(main_layer.nodes.length).fill(0).map(() => Math.random() * 10);

      main_layer.activate(random_numbers);
      const errors = main_layer.propagate(other_numbers);

      errors.forEach((error) => {
        is.error(error);
      });
    })
    it("layer.propagate(options) => {Array<{responsibility: number, projected: number, gated: number}>}", function() {
      const { main_layer, other_layer } = createRandomLayers();

      const random_numbers = Array(main_layer.nodes.length).fill(0).map(() => Math.random() * 10);

      main_layer.activate(random_numbers);

      // first run without an updated
      const options_without_update = { update: false };
      let errors = main_layer.propagate(options_without_update);
      expect(errors).to.be.an("array");
      errors.forEach((error) => {
        is.error(error);
      });
      main_layer.nodes.forEach(node => {
        expect(node.delta_bias_total).to.equal(0);
        expect(node.delta_bias_previous).to.equal(0);
      })

      // now try with an update
      const options_with_update = { update: true };
      errors = main_layer.propagate(options_with_update);
      expect(errors).to.be.an("array");
      errors.forEach((error) => {
        is.error(error);
      });
      main_layer.nodes.forEach(node => {
        expect(node.delta_bias_total).to.equal(0);
        expect(node.delta_bias_previous).to.equal(0);
      })
    })
    it("layer.propagate(target, options) => {Array<{responsibility: number, projected: number, gated: number}>}", function() {
      const { main_layer, other_layer } = createRandomLayers();


      const random_numbers = Array(main_layer.nodes.length).fill(0).map(() => Math.random() * 10);
      const other_numbers = Array(main_layer.nodes.length).fill(0).map(() => Math.random() * 10);

      main_layer.activate(random_numbers);

      // first run without an updated
      const options_without_update = { update: false };
      let errors = main_layer.propagate(other_numbers, options_without_update);

      errors.forEach((error) => {
        is.error(error);
      });

      // run with update now
      const options_with_update = { update: true };
      errors = main_layer.propagate(other_numbers, options_with_update);

      errors.forEach((error) => {
        is.error(error);
      });
    })
    it("layer.propagate(wrong_length_array) => {RangeError}", function() {
      const { main_layer, other_layer } = createRandomLayers();

      const wrong_length_array = [0.574, 0.76];

      main_layer.activate()
      expect(() => main_layer.propagate(wrong_length_array)).to.throw(RangeError);
    })

  })

  describe("layer.connect()", function () {
    // options
    // connect(target, methods.connection[any_method_here]), <- no weight
    // connect(target, methods.connection.ONE_TO_ONE, weight),
    // connect(target, methods.connection.ALL_TO_ELSE, weight),
    // connect(target, methods.connection.ALL_TO_ALL_FORWARD, weight)
    it("layer.connect(target, methods.connection.ALL_TO_ALL_FORWARD) => {Connection[]}", function() {
      let { main_layer, other_layer } = createRandomLayers(true);

      main_layer.connect(other_layer, methods.connection.ALL_TO_ALL_FORWARD);
      main_layer.nodes.forEach(node => {
        expect(node.outgoing.length).equal(other_layer.nodes.length);
      });
    })
    it("layer.connect(target, methods.connection.ALL_TO_ALL_FORWARD, weight) => {Connection[]}", function() {
      let { main_layer, other_layer } = createRandomLayers(true);
      const weight = Math.random();
      main_layer.connect(other_layer, methods.connection.ALL_TO_ALL_FORWARD, weight);

      main_layer.nodes.forEach(node => {
        expect(node.outgoing.length).equal(other_layer.nodes.length);
        node.outgoing.forEach(connection => expect(connection.weight).to.equal(weight));
      });
    })
    it("layer.connect(target, methods.connection.ALL_TO_ELSE, weight) => {Connection[]}", function() {
      let { main_layer, other_layer } = createRandomLayers(true);
      const weight = Math.random();
      main_layer.connect(main_layer, methods.connection.ALL_TO_ELSE, weight);
      main_layer.nodes.forEach(node => {
        expect(node.outgoing.length).equal(0);
      });

      ({ main_layer, other_layer } = createRandomLayers(true));
      main_layer.connect(other_layer, methods.connection.ALL_TO_ELSE, weight);
      main_layer.nodes.forEach(node => {
        expect(node.outgoing.length).equal(other_layer.nodes.length);
      });
    })
    it("layer.connect(target, methods.connection.ONE_TO_ONE, weight) => {Connection[]}", function() {
      let { main_layer } = createRandomLayers(true);
      let other_layer = Layer.Dense(main_layer.nodes.length);
      const weight = Math.random();
      main_layer.connect(other_layer, methods.connection.ONE_TO_ONE, weight);

      main_layer.nodes.forEach(node => {
        expect(node.outgoing.length).equal(1);
        node.outgoing.forEach(connection => expect(connection.weight).to.equal(weight));
      });
    })

  })

  describe("layer.disconnect()", function () {
    // options
    // disconnect(target, not_twosided (false)), disconnect(target, twosided)
    it("layer.disconnect(target)", function () {
      const { main_layer, other_layer } = createRandomLayers();

      main_layer.disconnect(other_layer);
      main_layer.nodes.forEach(node => {
        expect(node.outgoing.length).to.equal(0);
      })
      other_layer.nodes.forEach(node => {
        expect(node.outgoing.length).to.equal(main_layer.nodes.length);
      })
    })
    it("layer.disconnect(target, twosided)", function () {
      const { main_layer, other_layer } = createRandomLayers();

      main_layer.disconnect(other_layer, true);
      main_layer.nodes.forEach(node => {
        expect(node.outgoing.length).to.equal(0);
      })
      other_layer.nodes.forEach(node => {
        expect(node.outgoing.length).to.equal(0);
      })
    })
  })

  describe("layer.set()", function () {
    // options
    // set(), set(options_to_set)
    it("layer.set(options_to_set)", function () {
      const { main_layer, other_layer } = createRandomLayers();
      const someSquashFunction = (val) => val * Math.random();
      main_layer.set({ bias: 7, squash: someSquashFunction });
      main_layer.nodes.forEach(node => {
        expect(node.bias).to.equal(7);
        expect(node.squash).to.equal(someSquashFunction);
      })
    })

    it("layer.set() => {TypeError}", function () {
      const { main_layer, other_layer } = createRandomLayers();

      expect(() => main_layer.set()).to.throw(TypeError);
    })

  })

  describe("layer.gate()", function () {
    // options. gating methods are in methods.gating.xxxxxxxxx
    // gate(Connection) => {TypeError}
    // gate(Connection, some_gating_method) <- this tests support for passing a single Connection
    // gate(Connection[], methods.gating.INPUT)
    // gate(Connection[], methods.gating.OUTPUT)
    // gate(Connection[], methods.gating.SELF)
    it("layer.gate(Connection) => {TypeError}", function () {
      const {main_layer, other_layer} = createRandomLayers();
      const connection_to_gate = new Connection(main_layer, other_layer);
      expect(() => main_layer.gate(connection_to_gate)).to.throw(TypeError);
    })
    it("layer.gate(Connection, some_gating_method)", function () {
      const {main_layer} = createRandomLayers(true);
      const to_connect_node = new Node();
      const connections_to_gate = main_layer.connect(to_connect_node);

      main_layer.gate(connections_to_gate, methods.gating.OUTPUT);
      main_layer.nodes.forEach(node => node.outgoing.forEach(connection => {
        expect(connection.gater).to.be.an.instanceOf(Node);
      }))
    })
    it("layer.gate(Connection, methods.gating.INPUT)", function () {
      const {main_layer} = createRandomLayers(true);
      const to_connect_node = new Node();
      const connections_to_gate = main_layer.connect(to_connect_node);

      // console.log(main_layer.nodes[0])
      main_layer.gate(connections_to_gate, methods.gating.INPUT);
      // console.log(main_layer.nodes[0])
      main_layer.nodes.forEach(node => node.outgoing.forEach(connection => {
        expect(connection.gater).to.be.an.instanceOf(Node);
      }))
    })
    it("layer.gate(Connection, methods.gating.OUTPUT)", function () {
      const {main_layer} = createRandomLayers(true);
      const to_connect_node = new Node();
      const connections_to_gate = main_layer.connect(to_connect_node);

      // console.log(main_layer.nodes[0])
      main_layer.gate(connections_to_gate, methods.gating.OUTPUT);
      // console.log(main_layer.nodes[0])
      main_layer.nodes.forEach(node => node.outgoing.forEach(connection => {
        expect(connection.gater).to.be.an.instanceOf(Node);
      }))
    })
    it("layer.gate(Connection, methods.gating.SELF)", function () {
      const {main_layer} = createRandomLayers(true);
      const to_connect_node = new Node();
      // const connections_to_gate = main_layer.connect(to_connect_node);
      const connections_to_gate = main_layer.connect(main_layer);
      main_layer.gate(connections_to_gate, methods.gating.SELF);

      main_layer.nodes.forEach(node => node.outgoing.forEach(connection => {
        expect(connection.gater).to.be.an.instanceOf(Node);
      }))
    })
  })

  describe("Layer.someLayerConstructor()", function () {
    const layer_types_to_test = ['Dense', 'LSTM', 'GRU', {type: 'Memory', extra_args: [5]}];
    layer_types_to_test.forEach(layer_type => {
      const extra_layer_args = [];
      if (typeof layer_type === 'object') {
        extra_layer_args.push(...layer_type.extra_args);
        layer_type = layer_type.type;
      }
      // each test here performs a basic chain of layers and activates them to see
      // if layers were correctly chained and working
      // Does not test individual kind of layer functionality
      it("Layer." + layer_type + "() => {Layer}", function () {
        // get the constructor function
        const layerConstructor = Layer[layer_type];
        const layer_size = 10;

        debugger;

        // create the layer
        const main_created_layer = layerConstructor(layer_size, ...extra_layer_args);
        expect(main_created_layer).to.be.an.instanceOf(Layer);

        // set up testing objects/environment
        const group_for_input = new Group(10);
        const group_for_output = new Group(10);
        const input_connections_weight = Math.random();
        const output_connections_weight = Math.random();

        group_for_input.connect(main_created_layer, methods.connection.ALL_TO_ALL_FORWARD, input_connections_weight);
        main_created_layer.connect(group_for_output, methods.connection.ALL_TO_ALL_FORWARD, output_connections_weight);

        const chain_input = Array(10).fill(0).map(() => Math.random());

        // test the chain
        group_for_input.activate(chain_input);
        main_created_layer.activate();
        const chain_output = group_for_output.activate();

        // check results
        expect(chain_output).to.be.of.length(10);
        chain_output.forEach((out_number) => expect(out_number).to.be.a("number"));
      })
    });
  })
})
