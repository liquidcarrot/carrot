var activation = require('./activation');

/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 * @todo Add `@prop MOD_ACTIVATION.allowed` tag type
 * @todo Add `@prop MOD_ACTIVATION.allowed` tag defaults
 * @todo Add `@prop ALL` tag type
 * @todo Add `@prop ALL` tag defaults
 * @todo Add `@prop FFW` tag type
 * @todo Add `@prop FFW` tag defaults
 *
 * @namespace mutation
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 *
 * @example <caption>Using a mutation method with a network</caption>
 * myNetwork.mutate(methods.mutation.ADD_NODE);
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
   * @prop {boolean} keep_gates=true
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
   *
   * @prop {number} min=-1
   * @prop {number} max=1
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
   * @prop {number} min=-1
   * @prop {number} max=1
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
   * @prop {boolean} mutateOutput=true
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
   * @prop {boolean} mutateOutput=true
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
 *
 * @example
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.ALL // all mutation methods
 * }
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.FFW// all feedforward mutation methods
 * }
 *
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
 *
 * @example
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.ALL // all mutation methods
 * }
 *
 * network.evolve(trainingset, {
 *  mutation: methods.mutation.FFW// all feedforward mutation methods
 * }
 *
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
