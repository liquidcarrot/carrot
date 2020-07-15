"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantNode = void 0;
const src_1 = require("activations/build/src");
const NodeType_1 = require("../../enums/NodeType");
const Node_1 = require("../Node");
/**
 * Constant node
 */
class ConstantNode extends Node_1.Node {
    constructor() {
        super(NodeType_1.NodeType.HIDDEN);
        this.bias = 1;
    }
    /**
     * Create a constant node from json object.
     *
     * @param json the json object representing the node
     *
     * @returns the created node
     */
    fromJSON(json) {
        var _a, _b;
        this.index = (_a = json.index) !== null && _a !== void 0 ? _a : -1;
        this.squash = (_b = json.squash) !== null && _b !== void 0 ? _b : src_1.Identitiy;
        return this;
    }
    /**
     * Convert this node into a json object.
     *
     * @returns the json object representing this node
     */
    toJSON() {
        return { index: this.index, squash: this.squash };
    }
    /**
     * Bias mutations aren't allowed for a constant node.
     */
    mutateBias() {
        throw new ReferenceError("Cannot mutate a pool node!");
    }
    /**
     * Activation mutations aren't allowed for a constant node.
     */
    mutateActivation() {
        throw new ReferenceError("Cannot mutate a pool node!");
    }
    /**
     * Constant nodes can't gate a connection.
     */
    addGate() {
        throw new ReferenceError("A pool node can't gate a connection!");
    }
    /**
     * Constant nodes can't gate a connection.
     */
    removeGate() {
        throw new ReferenceError("A pool node can't gate a connection!");
    }
    /**
     * Can't set the bias of a constant node.
     */
    setBias() {
        throw new ReferenceError("Cannot set the bias of a pool node!");
    }
}
exports.ConstantNode = ConstantNode;
