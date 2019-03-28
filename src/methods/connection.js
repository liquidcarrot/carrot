/**
* Specifies in what manner two groups are connected
* 
* @module
*
* @namespace methods.connection
* 
* @prop {object} ALL_TO_ALL
* @prop {string} ALL_TO_ALL.name="OUTPUT"
* @prop {object} ALL_TO_ELSE
* @prop {string} ALL_TO_ELSE.name="INPUT"
* @prop {object} ONE_TO_ONE
* @prop {string} ONE_TO_ONE.name="SELF"
*/
var connection = {
  ALL_TO_ALL: {
    name: 'OUTPUT'
  },
  ALL_TO_ELSE: {
    name: 'INPUT'
  },
  ONE_TO_ONE: {
    name: 'SELF'
  }
};

module.exports = connection;
