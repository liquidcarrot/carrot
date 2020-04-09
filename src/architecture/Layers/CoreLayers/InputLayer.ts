import {Layer} from "../Layer";
import {Node} from "../../Node";
import {NodeType, NoiseNodeType} from "../../../enums/NodeType";
import {ConnectionType} from "../../../enums/ConnectionType";
import {NoiseLayer} from "../NoiseLayers/NoiseLayer";

export class InputLayer extends Layer {
    public constructor(outputSize: number, options: { noise?: NoiseNodeType } = {}) {
        super(outputSize);

        for (let i: number = 0; i < outputSize; i++) {
            const node: Node = new Node(NodeType.INPUT);
            this.nodes.push(node);
        }

        if (options.noise) {
            const noiseLayer: NoiseLayer = new NoiseLayer(options.noise ?? NoiseNodeType.GAUSSIAN_NOISE);
            noiseLayer.outputNodes.forEach(node => this.outputNodes.add(node));
            this.connections.push(...Layer.connect(this.nodes, noiseLayer, noiseLayer.getDefaultIncomingConnectionType()));
        } else {
            this.nodes.forEach(node => this.outputNodes.add(node));
        }
    }

    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.NO_CONNECTION;
    }
}
