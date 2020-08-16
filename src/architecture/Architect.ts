import {ConnectionType} from '../enums/ConnectionType';
import {InputLayer} from './Layers/CoreLayers/InputLayer';
import {OutputLayer} from './Layers/CoreLayers/OutputLayer';
import {Layer} from './Layers/Layer';
import {Network} from './Network';

/**
 * Architect constructs multilayer networks with various types of layers.
 */
export class Architect {
    /**
     * Array with all layers and there incoming connection type
     */
    private readonly layers: {
        /**
         * The Layer
         */
        layer: Layer;
        /**
         * The incoming connection type for this layer
         */
        incomingConnectionType: ConnectionType;
    }[];

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
    public addLayer(
        layer: Layer,
        incomingConnectionType?: ConnectionType
    ): Architect {
        const connectionType: ConnectionType =
            incomingConnectionType ?? layer.getDefaultIncomingConnectionType();

        if (!layer.connectionTypeisAllowed(connectionType)) {
            throw new ReferenceError(
                'Connection type ' +
                connectionType +
                ' is not allowed at layer ' +
                layer.constructor.name
            );
        }

        this.layers.push({
            layer,
            incomingConnectionType: connectionType,
        });
        return this; // function as builder class
    }

    /**
     * Build the network from the layers added to the architect.
     *
     * @returns the constructed network
     */
    public buildModel(): Network {
        if (!(this.layers[0].layer instanceof InputLayer)) {
            throw new ReferenceError(
                'First layer has to be a InputLayer! Currently is: ' +
                this.layers[0].layer.constructor.name
            );
        }
        if (!(this.layers[this.layers.length - 1].layer instanceof OutputLayer)) {
            throw new ReferenceError(
                'Last layer has to be a OutputLayer! Currently is: ' +
                this.layers[this.layers.length - 1].layer.constructor.name
            );
        }

        const inputSize: number = this.layers[0].layer.nodes.length;
        const outputSize: number = this.layers[this.layers.length - 1].layer.nodes
            .length;

        const network: Network = new Network(inputSize, outputSize);
        network.nodes = [];
        network.connections.clear();

        for (let i = 0; i < this.layers.length - 1; i++) {
            Layer.connect(
                this.layers[i].layer,
                this.layers[i + 1].layer,
                this.layers[i + 1].incomingConnectionType
            ).forEach(conn => network.connections.add(conn));

            network.nodes.push(...this.layers[i].layer.nodes);
            this.layers[i].layer.connections.forEach(conn =>
                network.connections.add(conn)
            );
            this.layers[i].layer.gates.forEach(conn => network.gates.add(conn));
        }
        network.nodes.push(...this.layers[this.layers.length - 1].layer.nodes);
        return network;
    }
}
