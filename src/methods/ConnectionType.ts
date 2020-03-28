/**
 * Specifies the way two [Groups](Group) are connected.
 *
 * Connections can be made between groups using these built-in connection methods and within a group itself by calling the [Group](Group) connection method with itself as a target.
 *
 * To learn more about the formed connections between [Nodes](Node), [Groups](Group), and [Layers](Layer) please see [Connection](Connection_)
 *
 * @namespace connection
 * @alias connection_method
 *
 * @example <caption>Connection between two Groups</caption>
 * let { methods, Group } = require("@liquid-carrot/carrot");
 *
 * let A = new Group(4);
 * let B = new Group(5);
 *
 * A.connect(B, methods.connection.ALL_TO_ALL); // specifying a method is optional
 *
 * @example <caption>Group connection with itself</caption>
 * let { methods, Group } = require("@liquid-carrot/carrot");
 *
 * let A = new Group(4);
 *
 * A.connect(A, methods.connection.ALL_TO_ALL);
 */
export enum ConnectionType {
    /**
     * @constant
     * @type {object}
     * @description Connects each node from <code>GroupX</code> to all nodes in <code>GroupY</code>
     * @description The default connection method between Groups
     * @default
     *
     * @example <caption>Connection between two Groups</caption>
     * let { methods, Group } = require("@liquid-carrot/carrot");
     *
     * let A = new Group(4);
     * let B = new Group(5);
     *
     * A.connect(B, methods.connection.ALL_TO_ALL); // specifying a method is optional
     */
    ALL_TO_ALL,
    /**
     * @constant
     * @type {object}
     * @description Connects each node in <code>GroupX</code> to all nodes in <code>GroupY</code> except for the nodes also contained within itself
     * @default
     *
     * @example <caption>Connection between two Groups</caption>
     * let { methods, Group } = require("@liquid-carrot/carrot");
     *
     * let A = new Group(4);
     * let B = new Group(5);
     *
     * A.connect(B, methods.connection.ALL_TO_ELSE); // specifying a method is optional
     */
    ALL_TO_ELSE,
    /**
     * @constant
     * @type {object}
     * @description Connects each node from <code>GroupX</code> to one node from <code>GroupY</code>
     * @description The default connection method when connecting Groups to themselves
     * @default
     *
     * @example <caption>Connection between two Groups</caption>
     * let { methods, Group } = require("@liquid-carrot/carrot");
     *
     * let A = new Group(4);
     * let B = new Group(5);
     *
     * A.connect(A, methods.connection.ONE_TO_ONE); // specifying a method is optional
     */
    ONE_TO_ONE
}
