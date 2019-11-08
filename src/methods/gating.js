/**
* Specifies how to gate a connection between two groups of multiple neurons.
* Gating makes the weights in networks more dynamic by adapting them to their gating node. Read more about it [here](https://en.wikipedia.org/wiki/Synaptic_gating). For specific implementations of gating, see [Node](Node), [Group](Group) and [Network](Network)
*
* NOT YET IMPLEMENTED
* @namespace
*
*/
const gating = {
  /**
   * @constant
   * @type {object}
   * @description Every node in the gating group will gate (at least) 1 node in the emitting group and all its connections to the other, receiving group
   * @default
   *
   * @example
   * let example = "TODO"
   */
  OUTPUT: {
    name: 'OUTPUT',
  },
  /**
   * @constant
   * @type {object}
   * @description Every node in the gating group will gate (at least) 1 node in the receiving group and all its connections from the other, emitting group
   * @default
   *
   * @example
   * let example = "TODO"
   */
  INPUT: {
    name: 'INPUT',
  },
  /**
   * @constant
   * @type {object}
   * @description Every node in the gating group will gate (at least) 1 self connection in the emitting/receiving group
   * @default
   *
   * @example
   * let example = "TODO"
   */
  SELF: {
    name: 'SELF',
  },
};

module.exports = gating;
