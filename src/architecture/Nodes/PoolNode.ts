import {PoolingType} from "../../enums/PoolingType";
import {PoolNodeJSON} from "../../interfaces/NodeJSON";
import {avg, max, min} from "../../methods/Utils";
import {ConstantNode} from "./ConstantNode";

export class PoolNode extends ConstantNode {
    private poolingType: PoolingType;

    constructor(poolingType: PoolingType = PoolingType.MAX_POOLING) {
        super();
        this.poolingType = poolingType;
        this.bias = 1;
    }

    public fromJSON(json: PoolNodeJSON): PoolNode {
        super.fromJSON(json);
        this.poolingType = json.poolType as PoolingType;
        return this;
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
        this.gated.forEach(conn => conn.gain = this.activation);

        return this.activation;
    }

    public propagate(): void {
        // TODO implement that
        throw new Error("Not yet implemented!");
    }

    public toJSON(): PoolNodeJSON {
        return Object.assign(super.toJSON(), {
            poolType: this.poolingType
        });
    }
}
