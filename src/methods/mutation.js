const activation = require('./activation');

/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @namespace mutation
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 *
 * @example <caption>Mutation methods with networks</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * // Setting a mutation method for a network
 * myNetwork.mutate(methods.mutation.ADD_NODE);
 *
 * // specifying a list of network mutation methods to use during evolution
 * myNetwork.evolve(trainingset, {
 *  mutation: [methods.mutation.MOD_BIAS, methods.mutation.ADD_NODE]
 * }
 *
 * @example <caption>Using a mutation method with a neuron</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * myNode.mutate(methods.mutation.MOD_BIAS);
 */
const mutation = {
  /**
   * @constant
   * @type {object}
   * @description Adds a node
   * @default
   *
   * @prop {boolean} randomActivation=true If enabled, sets a random activation function on the newly created node
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_NODE);
   */
  ADD_NODE: {
    name: 'ADD_NODE',
    randomActivation: true,
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a node
   * @default
   *
   * @prop {boolean} keep_gates=true Ensures replacement node has gated connections if the removed node did.
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_NODE);
   */
  SUB_NODE: {
    name: 'SUB_NODE',
    keep_gates: true,
  },
  /**
   * @constant
   * @type {object}
   * @description Adds a connection between two nodes
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_CONN);
   */
  ADD_CONN: {
    name: 'ADD_CONN',
  },
  /**
   * @constant
   * @type {object}
   * @description Adds a any kind of connection to a network. A super-set of ADD_CONN, ADD_BACK_CONN, and ADD_SELF_CONN
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_CONNECTION);
   */
  ADD_CONNECTION: {
    name: 'ADD_CONNECTION',
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a connection between two nodes
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_CONN);
   */
  SUB_CONN: {
    name: 'REMOVE_CONN',
  },
  /**
   * @constant
   * @type {object}
   * @description Modifies the weight of a connection
   * @default
   *
   * @prop {number} min=-1 lower bound for weight modification
   * @prop {number} max=1 higher bound for weight modification
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.MOD_WEIGHT);
   */
  MOD_WEIGHT: {
    name: 'MOD_WEIGHT',
    min: -1,
    max: 1,
  },
  /**
   * @constant
   * @type {object}
   * @description Modifies the bias of a node
   * @default
   *
   * @prop {boolean} mutateOutput=true Enable this to let network change its output node biases.
   * @prop {number} min=-1 lower bound for modification of a neuron's bias
   * @prop {number} max=1 higher bound for modification of a neuron's bias
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * let myNode = new Node();
   *
   * myNode.mutate(methods.mutation.MOD_BIAS);
   */
  MOD_BIAS: {
    name: 'MOD_BIAS',
    mutateOutput: true,
    min: -1,
    max: 1,
  },
  /**
   * @constant
   * @type {object}
   * @description Modifies the activation function of a node by randomly picking from the allowed activation methods
   * @default
   *
   * @prop {boolean} mutateOutput=false Change activation function of network output neurons. Enable this to let the network experiment with its output.
   * @prop {activation[]} [allowed=[all built-in activation methods]] Mutation methods to randomly select from when mutating
   *
   * @example <caption>Mutating the activation function of a node</caption>
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * let myNode = new Node();
   *
   * myNode.mutate(methods.mutation.MOD_ACTIVATION);
   *
   * @example <caption>Mutating the activation function of a network's nodes</caption>
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * let myNode = new Node();
   *
   * myNode.mutate(methods.mutation.MOD_ACTIVATION);
   */
  MOD_ACTIVATION: {
    name: 'MOD_ACTIVATION',
    mutateOutput: false,
    allowed: [
      activation.LOGISTIC,
      activation.TANH,
      activation.RELU,
      activation.IDENTITY,
      activation.STEP,
      activation.SOFTSIGN,
      activation.SINUSOID,
      activation.GAUSSIAN,
      activation.BENT_IDENTITY,
      activation.BIPOLAR,
      activation.BIPOLAR_SIGMOID,
      activation.HARD_TANH,
      activation.ABSOLUTE,
      activation.INVERSE,
      activation.SELU,
    ],
  },
  /**
   * @constant
   * @type {object}
   * @description Adds a self-connection to a node
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_SELF_CONN);
   */
  ADD_SELF_CONN: {
    name: 'ADD_SELF_CONN',
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a self-connection from a node
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_SELF_CONN);
   */
  SUB_SELF_CONN: {
    name: 'SUB_SELF_CONN',
  },
  /**
   * @constant
   * @type {object}
   * @description Makes a node gate a connection
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_GATE);
   */
  ADD_GATE: {
    name: 'ADD_GATE',
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a gate from a connection
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_GATE);
   */
  SUB_GATE: {
    name: 'SUB_GATE',
  },
  /**
   * @constant
   * @type {object}
   * @description Adds a recurrent connection
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.ADD_BACK_CONN);
   */
  ADD_BACK_CONN: {
    name: 'ADD_BACK_CONN',
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a recurrent connection
   * @default
   *
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SUB_BACK_CONN);
   */
  SUB_BACK_CONN: {
    name: 'SUB_BACK_CONN',
  },
  /**
   * @constant
   * @type {object}
   * @description Swaps the bias and squash function between two nodes
   * @default
   *
   * @prop {boolean} mutateOutput=false Swap bias and activation function of network output neurons too. Disable this to keep output of a neural network normalized.
   * @example
   * let { methods, Network } = require("@liquid-carrot/carrot");
   *
   * let myNetwork = new Network(5, 10, 5);
   *
   * myNetwork.mutate(methods.mutation.SWAP_NODES);
   */
  SWAP_NODES: {
    name: 'SWAP_NODES',
    mutateOutput: false,
  },
};

/**
 *
 * Array of all mutation methods
 *
 * @constant
 * @type {array}
 * @default
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.ALL // all mutation methods
 * }
 */
mutation.ALL = [
  mutation.ADD_NODE,
  mutation.SUB_NODE,
  mutation.ADD_CONN,
  mutation.SUB_CONN,
  mutation.MOD_WEIGHT,
  mutation.MOD_BIAS,
  mutation.MOD_ACTIVATION,
  mutation.ADD_GATE,
  mutation.SUB_GATE,
  mutation.ADD_SELF_CONN,
  mutation.SUB_SELF_CONN,
  mutation.ADD_BACK_CONN,
  mutation.SUB_BACK_CONN,
  mutation.SWAP_NODES,
];

/**
 *
 * Array of all feedforwad mutation methods
 *
 * @constant
 * @type {array}
 * @default
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.FFW// all feedforward mutation methods
 * }
 */
mutation.FFW = [
  mutation.ADD_NODE,
  mutation.SUB_NODE,
  mutation.ADD_CONN,
  mutation.SUB_CONN,
  mutation.MOD_WEIGHT,
  mutation.MOD_BIAS,
  mutation.MOD_ACTIVATION,
  mutation.SWAP_NODES,
];

/**
 *
 * Array of the methods in canonical Neat
 *
 * @constant
 * @type {array}
 * @default
 *
 * @example <caption>A group of mutation methods for evolution</caption>
 * let { methods, Network } = require("@liquid-carrot/carrot");
 *
 * let myNetwork = new Network(5, 10, 5);
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.NEATSTANDARD// ADD_NODE and ADD_CONN
 * }
 */
mutation.NEATSTANDARD = [
  mutation.ADD_NODE,
  mutation.ADD_CONN,
  mutation.ADD_SELF_CONN,
  mutation.ADD_BACK_CONN,
  mutation.MOD_WEIGHT
];

module.exports = mutation;
