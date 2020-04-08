import {Node} from "../Node";
import {PoolingType} from "../../enums/PoolingType";
import {NodeType} from "../../enums/NodeType";
import {PoolNodeJSON} from "../../interfaces/NodeJSON";
import {avg, max, min} from "../../methods/Utils";

export class PoolNode extends Node {
    private readonly poolingType: PoolingType;

    constructor(poolingType: PoolingType = PoolingType.MAX_POOLING) {
        super(NodeType.HIDDEN);
        this.poolingType = poolingType;
    }

    public static fromJSON(json: PoolNodeJSON): PoolNode {
        const node: PoolNode = new PoolNode(json.poolType);
        node.type = NodeType.HIDDEN;
        node.index = json.index ?? -1;
        return node;
    }

    public mutateBias(): void {
        throw new ReferenceError("Cannot mutate a pool node!");
    }

    public mutateActivation(): void {
        throw new ReferenceError("Cannot mutate a pool node!");
    }

    public addGate(): void {
        throw new ReferenceError("A pool node can't gate a connection!");
    }

    public removeGate(): void {
        throw new ReferenceError("A pool node can't gate a connection!");
    }

    public activate(): number {
        const incomingStates: number[] = this.incoming.map(conn => conn.from.activation * conn.weight * conn.gain);

        if (this.poolingType === PoolingType.MAX_POOLING) {
            this.state = max(incomingStates);
        } else if (this.poolingType === PoolingType.AVG_POOLING) {
            this.state = avg(incomingStates);
        } else if (this.poolingType === PoolingType.MIN_POOLING) {
            this.state = min(incomingStates);
        } else {
            throw new ReferenceError("No valid pooling type! Type: " + this.poolingType);
        }

        this.activation = this.state;

        // Adjust gain
        for (const connection of this.gated) {
            connection.gain = this.activation;
        }

        return this.activation;
    }

    public propagate(): void {
        // TODO: OVERRIDE
        super.propagate();
    }

    public toJSON(): PoolNodeJSON {
        return Object.assign(super.toJSON(), {
            poolType: this.poolingType
        });
    }

    public setBias(): Node {
        throw new ReferenceError("Cannot set the bias of a pool node!");
    }
}
