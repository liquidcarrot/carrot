"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Architect = void 0;
const InputLayer_1 = require("./Layers/CoreLayers/InputLayer");
const OutputLayer_1 = require("./Layers/CoreLayers/OutputLayer");
const Layer_1 = require("./Layers/Layer");
const Network_1 = require("./Network");
/**
 * Architect constructs multilayer networks with various types of layers.
 */
class Architect {
    constructor() {
        this.layers = [];
    }
    /**
     * Adds a layer to the architect.
     *
     * @param layer The layer
     * @param incomingConnectionType The incoming connection to this layer
     * @returns this object to function as builder class
     */
    addLayer(layer, incomingConnectionType) {
        const connectionType = incomingConnectionType !== null && incomingConnectionType !== void 0 ? incomingConnectionType : layer.getDefaultIncomingConnectionType();
        if (!layer.connectionTypeisAllowed(connectionType)) {
            throw new ReferenceError("Connection type " + connectionType + " is not allowed at layer " + layer.constructor.name);
        }
        this.layers.push({
            layer,
            incomingConnectionType: connectionType
        });
        return this; // function as builder class
    }
    /**
     * Build the network from the layers added to the architect.
     *
     * @returns the constructed network
     */
    buildModel() {
        if (!(this.layers[0].layer instanceof InputLayer_1.InputLayer)) {
            throw new ReferenceError("First layer has to be a InputLayer! Currently is: " + this.layers[0].layer.constructor.name);
        }
        if (!(this.layers[this.layers.length - 1].layer instanceof OutputLayer_1.OutputLayer)) {
            throw new ReferenceError("Last layer has to be a OutputLayer! Currently is: " + this.layers[this.layers.length - 1].layer.constructor.name);
        }
        const inputSize = this.layers[0].layer.nodes.length;
        const outputSize = this.layers[this.layers.length - 1].layer.nodes.length;
        const network = new Network_1.Network(inputSize, outputSize);
        network.nodes = [];
        network.connections.clear();
        for (let i = 0; i < this.layers.length - 1; i++) {
            Layer_1.Layer.connect(this.layers[i].layer, this.layers[i + 1].layer, this.layers[i + 1].incomingConnectionType).forEach(conn => network.connections.add(conn));
            network.nodes.push(...this.layers[i].layer.nodes);
            this.layers[i].layer.connections.forEach(conn => network.connections.add(conn));
            this.layers[i].layer.gates.forEach(conn => network.gates.add(conn));
        }
        network.nodes.push(...this.layers[this.layers.length - 1].layer.nodes);
        return network;
    }
}
exports.Architect = Architect;
