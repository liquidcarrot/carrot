var activation = require('./activation');

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
 * // Setting a mutation method for a network
 * myNetwork.mutate(methods.mutation.ADD_NODE);
 *
 * // specifying a list of network mutation methods to use during evolution
 * myNetwork.evolve(trainingset, {
 *  mutation: [methods.mutation.MOD_BIAS, methods.mutation.ADD_NODE]
 * }
 *
 * @example <caption>Using a mutation method with a neuron</caption>
 * myNode.mutate(methods.mutation.MOD_BIAS);
 *
 *
 */
var mutation = {
  /**
   * @constant
   * @type {object}
   * @description Adds a node
   * @default
   */
  ADD_NODE: {
    name: 'ADD_NODE'
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a node
   * @default
   *
   * @prop {boolean} keep_gates=true Ensures replacement node has gated connections if the removed node did.

   */
  SUB_NODE: {
    name: 'SUB_NODE',
    keep_gates: true
  },
  /**
   * @constant
   * @type {object}
   * @description Adds a connection between two nodes
   * @default
   */
  ADD_CONN: {
    name: 'ADD_CONN'
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a connection between two nodes
   * @default
   */
  SUB_CONN: {
    name: 'REMOVE_CONN'
  },
  /**
   * @constant
   * @type {object}
   * @description Modifies the weight of a connection
   * @default
   *
   * @prop {number} min=-1 lower bound for weight modification
   * @prop {number} max=1 higher bound for weight modification
   */
  MOD_WEIGHT: {
    name: 'MOD_WEIGHT',
    min: -1,
    max: 1
  },
  /**
   * @constant
   * @type {object}
   * @description Modifies the bias of a node
   * @default
   *
   * @prop {number} min=-1 lower bound for modification of a neuron's bias
   * @prop {number} max=1 higher bound for modification of a neuron's bias
   *
   * @example
   * let myNode = new Node();
   *
   * myNode.mutate(methods.mutation.MOD_BIAS);
   */
  MOD_BIAS: {
    name: 'MOD_BIAS',
    min: -1,
    max: 1
  },
  /**
   * @constant
   * @type {object}
   * @description Modifies the activation function of a node
   * @default
   *
   * @prop {boolean} mutateOutput=true Change activation function of network output neurons. Disable this to keep output of a neural network normalized.
   * @prop {activation[]} allowed=[]
   *
   * @example
   * let myNode = new Node();
   *
   * myNode.mutate(methods.mutation.MOD_ACTIVATION);
   */
  MOD_ACTIVATION: {
    name: 'MOD_ACTIVATION',
    mutateOutput: true,
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
      activation.SELU
    ]
  },
  /**
   * @constant
   * @type {object}
   * @description Adds a self-connection to a node
   * @default
   */
  ADD_SELF_CONN: {
    name: 'ADD_SELF_CONN'
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a self-connection from a node
   * @default
   */
  SUB_SELF_CONN: {
    name: 'SUB_SELF_CONN'
  },
  /**
   * @constant
   * @type {object}
   * @description Makes a node gate a connection
   * @default
   */
  ADD_GATE: {
    name: 'ADD_GATE'
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a gate from a connection
   * @default
   */
  SUB_GATE: {
    name: 'SUB_GATE'
  },
  /**
   * @constant
   * @type {object}
   * @description Adds a recurrent connection
   * @default
   */
  ADD_BACK_CONN: {
    name: 'ADD_BACK_CONN'
  },
  /**
   * @constant
   * @type {object}
   * @description Removes a recurrent connection
   * @default
   */
  SUB_BACK_CONN: {
    name: 'SUB_BACK_CONN'
  },
  /**
   * @constant
   * @type {object}
   * @description Swaps the bias and squash function between two nodes
   * @default
   *
   * @prop {boolean} mutateOutput=true Swap bias and activation function of network output neurons too. Disable this to keep output of a neural network normalized.
   */
  SWAP_NODES: {
    name: 'SWAP_NODES',
    mutateOutput: true
  }
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
  mutation.SWAP_NODES
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
  mutation.SWAP_NODES
];

module.exports = mutation;
