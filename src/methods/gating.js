/**
* Specifies how to gate a connection between two groups of multiple neurons
*
* @module
*
* @namespace
*
* @prop {object} OUTPUT
* @prop {string} OUTPUT.name="OUTPUT"
* @prop {object} INPUT
* @prop {string} INPUT.name="INPUT"
* @prop {object} SELF
* @prop {string} SELF.name="SELF"
*/
var gating = {
  OUTPUT: {
    name: 'OUTPUT'
  },
  INPUT: {
    name: 'INPUT'
  },
  SELF: {
    name: 'SELF'
  }
};

/* Export */
module.exports = gating;
