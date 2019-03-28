var activation = require('./activation');

/**
 *
 * @module
 *
 * @todo Create a namespace description
 * @todo Add `@prop MOD_ACTIVATION.allowed` tag type
 * @todo Add `@prop MOD_ACTIVATION.allowed` tag defaults
 * @todo Add `@prop ALL` tag type
 * @todo Add `@prop ALL` tag defaults
 * @todo Add `@prop FFW` tag type
 * @todo Add `@prop FFW` tag defaults
 * @todo Add `@prop` tag descriptions
 *
 * @namespace mutation
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithm)}
 *
 * @prop {object} ADD_NODE
 * @prop {string} ADD_NODE.name="ADD_NODE"
 * @prop {object} SUB_NODE
 * @prop {string} SUB_NODE.name="SUB_NODE"
 * @prop {object} ADD_CONN
 * @prop {string} ADD_CONN.name="ADD_CONN"
 * @prop {object} SUB_CONN
 * @prop {string} SUB_CONN.name="SUB_CONN"
 * @prop {object} MOD_WEIGHT
 * @prop {string} MOD_WEIGHT.name="MOD_WEIGHT"
 * @prop {number} MOD_WEIGHT.min=-1
 * @prop {number} MOD_WEIGHT.max=1
 * @prop {object} MOD_BIAS
 * @prop {string} MOD_BIAS.name="MOD_BIAS"
 * @prop {object} MOD_BIAS.min=-1
 * @prop {object} MOD_BIAS.max=1
 * @prop {object} MOD_ACTIVATION
 * @prop {string} MOD_ACTIVATION.name="MOD_ACTIVATION"
 * @prop {boolean} MOD_ACTIVATION.mutateOutput=true
 * @prop MOD_ACTIVATION.allowed
 * @prop {object} ADD_SELF_CONN
 * @prop {string} ADD_SELF_CONN.name="ADD_SELF_CONN"
 * @prop {object} SUB_SELF_CONN
 * @prop {string} SUB_SELF_CONN.name="SUB_SELF_CONN"
 * @prop {object} ADD_GATE
 * @prop {string} ADD_GATE.name="ADD_GATE"
 * @prop {object} SUB_GATE
 * @prop {string} SUB_GATE.name="SUB_GATE"
 * @prop {object} ADD_BACK_CONN
 * @prop {string} ADD_BACK_CONN.name="ADD_BACK_CONN"
 * @prop {object} SUB_BACK_CONN
 * @prop {string} SUB_BACK_CONN.name="SUB_BACK_CONN"
 * @prop {object} SWAP_NODES
 * @prop {string} SWAP_NODES.name="SWAP_NODES"
 * @prop {object} SWAP_NODES.mutateOutput=true
 * @prop ALL
 * @prop FFW
*/
var mutation = {
  ADD_NODE: {
    name: 'ADD_NODE'
  },
  SUB_NODE: {
    name: 'SUB_NODE',
    keep_gates: true
  },
  ADD_CONN: {
    name: 'ADD_CONN'
  },
  SUB_CONN: {
    name: 'REMOVE_CONN'
  },
  MOD_WEIGHT: {
    name: 'MOD_WEIGHT',
    min: -1,
    max: 1
  },
  MOD_BIAS: {
    name: 'MOD_BIAS',
    min: -1,
    max: 1
  },
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
  ADD_SELF_CONN: {
    name: 'ADD_SELF_CONN'
  },
  SUB_SELF_CONN: {
    name: 'SUB_SELF_CONN'
  },
  ADD_GATE: {
    name: 'ADD_GATE'
  },
  SUB_GATE: {
    name: 'SUB_GATE'
  },
  ADD_BACK_CONN: {
    name: 'ADD_BACK_CONN'
  },
  SUB_BACK_CONN: {
    name: 'SUB_BACK_CONN'
  },
  SWAP_NODES: {
    name: 'SWAP_NODES',
    mutateOutput: true
  }
};

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
