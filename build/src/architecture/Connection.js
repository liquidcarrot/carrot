"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
var Utils_1 = require("../utils/Utils");
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
     * Returns the connection as a JSON
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
        return Utils_1.pairing(this.from.index, this.to.index);
    };
    return Connection;
}());
exports.Connection = Connection;
