import {Layer} from "./layer/Layer";
import {InputLayer} from "./layer/InputLayer";
import {Network} from "./Network";
import {OutputLayer} from "./layer/OutputLayer";

export class Architect {
    private readonly layers: { layer: Layer, connectionType: ConnectionType }[];

    constructor() {
        this.layers = [];
    }

    public addLayer(layer: Layer, connectionType: ConnectionType = ConnectionType.ALL_TO_ALL): Architect {
        this.layers.push({layer, connectionType});
        return this; // function as builder class
    }

    public buildModel(): Network {
        if (!(this.layers[0].layer instanceof InputLayer)) {
            throw new ReferenceError("First layer has to be a InputLayer! Currently is: " + this.layers[0].layer.constructor.name);
        }
        if (!(this.layers[this.layers.length - 1].layer instanceof OutputLayer)) {
            throw new ReferenceError("Last layer has to be a OutputLayer! Currently is: " + this.layers[this.layers.length - 1].layer.constructor.name);
        }

        const inputSize: number = this.layers[0].layer.nodes.length;
        const outputSize: number = this.layers[this.layers.length - 1].layer.nodes.length;

        const network: Network = new Network(inputSize, outputSize);
        network.nodes = [];
        network.connections = [];

        for (let i: number = 0; i < this.layers.length - 1; i++) {
            this.layers[i].layer.connect(
                this.layers[i + 1].layer,
                this.layers[i].connectionType
            );

            network.nodes.push(...this.layers[i].layer.nodes);
            network.connections.push(...this.layers[i].layer.connections);
            network.gates.push(...this.layers[i].layer.gates);
        }
        network.nodes.push(...this.layers[this.layers.length - 1].layer.nodes);
        return network;
    }
}

export enum ConnectionType {
    ALL_TO_ALL,
    ONE_TO_ONE
}


export enum GatingType {
    INPUT, SELF, OUTPUT
}
