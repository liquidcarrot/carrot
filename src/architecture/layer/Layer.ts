import {Connection} from "../Connection";
import {Node} from "../Node";
import {ConnectionType} from "../Architect";

export abstract class Layer {
    public outputSize: number;
    public inputNodes: Set<Node>;
    public outputNodes: Set<Node>;
    public nodes: Node[];
    public connections: Connection[];
    public gates: Connection[];


    protected constructor(outputSize: number) {
        this.outputSize = outputSize;
        this.nodes = [];
        this.inputNodes = new Set<Node>();
        this.outputNodes = new Set<Node>();
        this.connections = [];
        this.gates = [];
    }

    public connect(targetLayer: Layer, connectionType: ConnectionType): void {
        if (targetLayer.inputNodes.size === 0) {
            throw new ReferenceError("Target layer has no input nodes!");
        }
        if (this.outputNodes.size === 0) {
            throw new ReferenceError("This layer has no output nodes!");
        }

        if (connectionType === ConnectionType.ALL_TO_ALL) {
            this.outputNodes.forEach(fromNode => {
                targetLayer.inputNodes.forEach(toNode => {
                    this.connections.push(fromNode.connect(toNode));
                });
            });
        } else {
            throw new ReferenceError("Connection type '" + ConnectionType[connectionType] + "' is not available for this layer type (" + this.constructor.name + ")");
        }
    }
}
