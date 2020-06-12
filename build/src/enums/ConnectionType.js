"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionType = void 0;
/**
 * The type of a connection.
 */
var ConnectionType;
(function (ConnectionType) {
    /**
     * No connection used for exceptions.
     */
    ConnectionType[ConnectionType["NO_CONNECTION"] = 0] = "NO_CONNECTION";
    /**
     * Connect all input to all output nodes
     */
    ConnectionType[ConnectionType["ALL_TO_ALL"] = 1] = "ALL_TO_ALL";
    /**
     * Connect one input to one output node
     */
    ConnectionType[ConnectionType["ONE_TO_ONE"] = 2] = "ONE_TO_ONE";
    /**
     * Connect with pooling
     */
    ConnectionType[ConnectionType["POOLING"] = 3] = "POOLING";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
