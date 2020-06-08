"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantNode = void 0;
var src_1 = require("activations/build/src");
var NodeType_1 = require("../../enums/NodeType");
var Node_1 = require("../Node");
/**
 * Constant node
 */
var ConstantNode = /** @class */ (function (_super) {
    __extends(ConstantNode, _super);
    function ConstantNode() {
        var _this = _super.call(this, NodeType_1.NodeType.HIDDEN) || this;
        _this.bias = 1;
        return _this;
    }
    /**
     * Create a constant node from json object.
     *
     * @param json the json object representing the node
     *
     * @returns the created node
     */
    ConstantNode.prototype.fromJSON = function (json) {
        var _a, _b;
        this.index = (_a = json.index) !== null && _a !== void 0 ? _a : -1;
        this.squash = (_b = json.squash) !== null && _b !== void 0 ? _b : src_1.Identitiy;
        return this;
    };
    /**
     * Convert this node into a json object.
     *
     * @returns the json object representing this node
     */
    ConstantNode.prototype.toJSON = function () {
        return { index: this.index, squash: this.squash };
    };
    /**
     * Bias mutations aren't allowed for a constant node.
     */
    ConstantNode.prototype.mutateBias = function () {
        throw new ReferenceError("Cannot mutate a pool node!");
    };
    /**
     * Activation mutations aren't allowed for a constant node.
     */
    ConstantNode.prototype.mutateActivation = function () {
        throw new ReferenceError("Cannot mutate a pool node!");
    };
    /**
     * Constant nodes can't gate a connection.
     */
    ConstantNode.prototype.addGate = function () {
        throw new ReferenceError("A pool node can't gate a connection!");
    };
    /**
     * Constant nodes can't gate a connection.
     */
    ConstantNode.prototype.removeGate = function () {
        throw new ReferenceError("A pool node can't gate a connection!");
    };
    /**
     * Can't set the bias of a constant node.
     */
    ConstantNode.prototype.setBias = function () {
        throw new ReferenceError("Cannot set the bias of a pool node!");
    };
    return ConstantNode;
}(Node_1.Node));
exports.ConstantNode = ConstantNode;
