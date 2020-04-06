import {Node} from "../Node";
import {PoolingType} from "../../enums/PoolingType";
import {NodeType} from "../../enums/NodeType";
import {PoolNodeJSON} from "../../interfaces/NodeJSON";

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
        // TODO: OVERRIDE
        return super.activate();
    }

    public propagate(target: number | undefined, options: { momentum?: number; rate?: number; update?: boolean }): { responsibility: number; projected: number; gated: number } {
        // TODO: OVERRIDE
        return super.propagate(target, options);
    }

    public toJSON(): PoolNodeJSON {
        // TODO: OVERRIDE
        return {
            poolType: this.poolingType,
            index: this.index,
        };
    }

    public setBias(): Node {
        throw new ReferenceError("Cannot set the bias of a pool node!");
    }

    public setSquash(): Node {
        throw new ReferenceError("Cannot set the squash function of a pool node!");
    }
}
