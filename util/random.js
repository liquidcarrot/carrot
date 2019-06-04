const _ = require("lodash")
const { methods } = require("../src/carrot")

// 50/50 chance of returning `thing`
const maybe = (thing) => Math.round(Math.random()) ? thing : undefined;

/**
 * Used for randomly generating things
 *
 * @namespace
 */
const random = {
  /**
   * 50/50 chance of generating a number
   *
   * @param min
   * @param max
   */
  number: (min=0, max=Number.MAX_SAFE_INTEGER, floating) => maybe(_.random(min, max, floating)),
  /**
   * 50/50 chance of generating a boolean
   */
  boolean: () => maybe(Math.round(Math.random()) ? true : false),
  /**
   * Picks an element out of an array
   */
  element: (array) => array[_.random(array.length - 1)],
  methods: {
    selection: () => random.element([
      methods.selection.FITNESS_PROPORTIONATE,
      methods.selection.POWER,
      methods.selection.TOURNAMENT
    ]),
    crossover: () => random.element([
      methods.crossover.SINGLE_POINT,
      methods.crossover.TWO_POINT,
      methods.crossover.UNIFORM,
      methods.crossover.AVERAGE
    ]),
    mutation: () => random.element([
      methods.mutation.ADD_NODE,
      methods.mutation.SUB_NODE,
      methods.mutation.ADD_CONN,
      methods.mutation.SUB_CONN,
      methods.mutation.MOD_WEIGHT,
      methods.mutation.MOD_BIAS,
      methods.mutation.MOD_ACTIVATION,
      methods.mutation.ADD_GATE,
      methods.mutation.SUB_GATE,
      methods.mutation.ADD_SELF_CONN,
      methods.mutation.SUB_SELF_CONN,
      methods.mutation.ADD_BACK_CONN,
      methods.mutation.SUB_BACK_CONN,
      methods.mutation.SWAP_NODES,
      methods.mutation.ALL,
      methods.mutation.FFW
    ])
  },
  options: {
    network: () => ({}),
    neat: () => ({
      inputs: random.number(),
      outputs: random.number(),
      equal: random.boolean(),
      clean: random.boolean(),
      popsize: random.number(),
      growth: random.number(1, true),
      amount: random.number(),
      elitism: random.number(),
      provinance: random.number(),
      mutationRate: random.number(1, true),
      mutationAmount: random.number(1, true),
      fitnessPopulation: random.boolean(),
      selection: random.methods.selection(),
      crossover: random.methods.crossover(),
      mutation: random.methods.mutation(),
      // template: random.network(),
      nodes: {
        max: random.number(),
        min: random.number(this.max)
      },
      connections: {
        max: random.number(),
        min: random.number(this.max)
      },
      gates: {
        max: random.number(),
        min: random.number(this.max)
      }
    }),
    network: () => ({}),
    group: () => ({}),
    layer: () => ({}),
    node: () => ({})
  },
  // network: () => ({})
  // number: () => Math.round(Math.random() * 10 + 1),
  // size: () => random.number(),
  // neurons: () => _.times(random.size(), index => new Neuron()),
  // inputs: (n) => _.times((n || random.number()), index => random.number()),
  // feedback: (n) => _.times((n || random.number()), index => random.number()),
  // layer: () => new Layer(random.size()),
  // bias: () => Math.random(),
  // rate: () => Math.random(),
  // activation: () => faker.random.arrayElement(["sigmoid", "sigmoidal", "logistic", "logistics", "relu", "tanh", "linear", "identity", function(x, derivative) {
  //   return !derivative ? Math.atan(x) : (1 / (Math.pow(x, 2) + 1))
  // }]),
  // /*
  // * Returns a random connections object
  // *
  // * @param {"layers"|"neurons"|null} type - Will return a connections contructions object prototype of the `type` given
  // */
  // connections: (type) => type === "layers" || type === "neurons" ? ({
  //   incoming: ((type) => type === "layers" ? random.layer() : type === "neurons" ? random.neurons() : random.neurons())(type),
  //   outgoing: ((type) => type === "layers" ? random.layer() : type === "neurons" ? random.neurons() : random.neurons())(type)
  // }) : ({
  //   incoming: [],
  //   outgoing: []
  // }),
  // options: (connections) => ({
  //   bias: random.bias(),
  //   rate: random.rate(),
  //   activation: random.activation(),
  //   connections: random.connections(connections)
  // })
}

module.exports = random