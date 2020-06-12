"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Architect = void 0;
var InputLayer_1 = require("./Layers/CoreLayers/InputLayer");
var OutputLayer_1 = require("./Layers/CoreLayers/OutputLayer");
var Layer_1 = require("./Layers/Layer");
var Network_1 = require("./Network");
/**
 * Architect constructs multilayer networks with various types of layers.
 */
var Architect = /** @class */ (function () {
    function Architect() {
        this.layers = [];
    }
    /**
     * Adds a layer to the architect.
     *
     * @param layer The layer
     * @param incomingConnectionType The incoming connection to this layer
     * @returns this object to function as builder class
     */
    Architect.prototype.addLayer = function (layer, incomingConnectionType) {
        var connectionType = incomingConnectionType !== null && incomingConnectionType !== void 0 ? incomingConnectionType : layer.getDefaultIncomingConnectionType();
        if (!layer.connectionTypeisAllowed(connectionType)) {
            throw new ReferenceError("Connection type " + connectionType + " is not allowed at layer " + layer.constructor.name);
        }
        this.layers.push({
            layer: layer,
            incomingConnectionType: connectionType
        });
        return this; // function as builder class
    };
    /**
     * Build the network from the layers added to the architect.
     *
     * @returns the constructed network
     */
    Architect.prototype.buildModel = function () {
        var _a, _b;
        if (!(this.layers[0].layer instanceof InputLayer_1.InputLayer)) {
            throw new ReferenceError("First layer has to be a InputLayer! Currently is: " + this.layers[0].layer.constructor.name);
        }
        if (!(this.layers[this.layers.length - 1].layer instanceof OutputLayer_1.OutputLayer)) {
            throw new ReferenceError("Last layer has to be a OutputLayer! Currently is: " + this.layers[this.layers.length - 1].layer.constructor.name);
        }
        var inputSize = this.layers[0].layer.nodes.length;
        var outputSize = this.layers[this.layers.length - 1].layer.nodes.length;
        var network = new Network_1.Network(inputSize, outputSize);
        network.nodes = [];
        network.connections.clear();
        for (var i = 0; i < this.layers.length - 1; i++) {
            Layer_1.Layer.connect(this.layers[i].layer, this.layers[i + 1].layer, this.layers[i + 1].incomingConnectionType).forEach(function (conn) { return network.connections.add(conn); });
            (_a = network.nodes).push.apply(_a, this.layers[i].layer.nodes);
            this.layers[i].layer.connections.forEach(function (conn) { return network.connections.add(conn); });
            this.layers[i].layer.gates.forEach(function (conn) { return network.gates.add(conn); });
        }
        (_b = network.nodes).push.apply(_b, this.layers[this.layers.length - 1].layer.nodes);
        return network;
    };
    return Architect;
}());
exports.Architect = Architect;
