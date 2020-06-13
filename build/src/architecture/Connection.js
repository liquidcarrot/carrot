"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
/**
 * A connection instance describes the connection between two nodes.
 */
var Connection = /** @class */ (function () {
    function Connection(from, to, weight, gateNode) {
        this.from = from;
        this.to = to;
        this.weight = weight !== null && weight !== void 0 ? weight : 0;
        this.gain = 1;
        this.eligibility = 0;
        this.deltaWeightsPrevious = 0;
        this.deltaWeightsTotal = 0;
        this.xTrace = new Map();
        if (gateNode) {
            this.gateNode = gateNode;
            gateNode.addGate(this);
        }
        else {
            this.gateNode = null;
        }
    }
    /**
     * Returns an innovation ID
     *
     * @see {@link https://en.wikipedia.org/wiki/Pairing_function (Cantor pairing function)|Pairing function (Cantor pairing function)}
     *
     * @param a - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
     * @param b - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
     * @time O(1)
     *
     * @return An Integer that uniquely represents a pair of Integers
     */
    Connection.innovationID = function (a, b) {
        return 1 / 2 * (a + b) * (a + b + 1) + b;
    };
    /**
     * Returns the connection as a JSON
     * @time O(1)
     *
     * @return Connection as a JSON
     */
    Connection.prototype.toJSON = function () {
        return {
            fromIndex: this.from.index,
            toIndex: this.to.index,
            gateNodeIndex: this.gateNode === null ? null : this.gateNode.index,
            weight: this.weight
        };
    };
    /**
     * Get the innovation ID for this connection
     */
    Connection.prototype.getInnovationID = function () {
        return Connection.innovationID(this.from.index, this.to.index);
    };
    return Connection;
}());
exports.Connection = Connection;
