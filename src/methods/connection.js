/**
* Specifies the way two [Groups](Group) are connected. Connections can be made between groups using these built-in connection methods and within a group itself by calling the [Group](Group) connection method with itself as a target
*
* @namespace connection
* @alias connection_method
*
* @example <caption>Connection between two Groups</caption>
* let A = new Group(4);
* let B = new Group(5);
*
* A.connect(B, methods.connection.ALL_TO_ALL); // specifying a method is optional
*
* @example <caption>Group connection with itself</caption>
* let A = new Group(4);
*
* A.connect(A, methods.connection.ALL_TO_ALL);
*
*/
var connection = {
  /**
   * @constant
   * @type {object}
   * @description Connects all nodes from <code>GroupX</code> to all nodes from <code>GroupY</code>
   * @default
   */
  ALL_TO_ALL: {
    name: 'OUTPUT'
  },
  /**
   * @constant
   * @type {object}
   * @description Connects each node in <code>GroupX</code> to all nodes in the same group except itself
   * @default
   */
  ALL_TO_ELSE: {
    name: 'INPUT'
  },
  /**
   * @constant
   * @type {object}
   * @description Connects each node from <code>GroupX</code> to one node from <code>GroupY</code>
   * @default
   */
  ONE_TO_ONE: {
    name: 'SELF'
  }
};

module.exports = connection;
