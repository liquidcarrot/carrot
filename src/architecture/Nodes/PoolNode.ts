import {PoolNodeType} from "../../enums/NodeType";
import {PoolNodeJSON} from "../../interfaces/NodeJSON";
import {avg, getOrDefault, maxValueIndex, minValueIndex, sum} from "../../methods/Utils";
import {ConstantNode} from "./ConstantNode";

export class PoolNode extends ConstantNode {
    private poolingType: PoolNodeType;
    private receivingIndex: number;

    constructor(poolingType: PoolNodeType = PoolNodeType.MAX_POOLING) {
        super();
        this.poolingType = poolingType;
        this.receivingIndex = -1;
    }

    public fromJSON(json: PoolNodeJSON): PoolNode {
        super.fromJSON(json);
        this.poolingType = json.poolType;
        return this;
    }

    public activate(): number {
        const incomingStates: number[] = this.incoming.map(conn => conn.from.activation * conn.weight * conn.gain);

        if (this.poolingType === PoolNodeType.MAX_POOLING) {
            this.receivingIndex = maxValueIndex(incomingStates);
            this.state = incomingStates[this.receivingIndex];
        } else if (this.poolingType === PoolNodeType.AVG_POOLING) {
            this.state = avg(incomingStates);
        } else if (this.poolingType === PoolNodeType.MIN_POOLING) {
            this.receivingIndex = minValueIndex(incomingStates);
            this.state = incomingStates[this.receivingIndex];
        } else {
            throw new ReferenceError("No valid pooling type! Type: " + this.poolingType);
        }

        this.activation = this.squash.calc(this.state, false) * this.mask;
        if (this.poolingType === PoolNodeType.AVG_POOLING) {
            this.derivative = this.squash.calc(this.state, true);
        }

        // Adjust gain
        this.gated.forEach(conn => conn.gain = this.activation);

        return this.activation;
    }

    public propagate(target?: number, options: { momentum?: number, rate?: number, update?: boolean } = {}): void {
        options.momentum = getOrDefault(options.momentum, 0);
        options.rate = getOrDefault(options.rate, 0.3);
        options.update = getOrDefault(options.update, true);

        const connectionsStates: number[] = this.outgoing.map(conn => conn.to.errorResponsibility * conn.weight * conn.gain);
        this.errorResponsibility = this.errorProjected = sum(connectionsStates) * this.derivative;
        if (this.poolingType === PoolNodeType.AVG_POOLING) {
            for (const connection of this.incoming) {
                // calculate gradient
                let gradient: number = this.errorProjected * connection.eligibility;
                for (let i: number = 0; i < connection.xTraceNodes.length; i++) {
                    gradient += connection.xTraceNodes[i].errorResponsibility * connection.xTraceValues[i];
                }

                connection.deltaWeightsTotal += options.rate * gradient * this.mask;
                if (options.update) {
                    connection.deltaWeightsTotal += options.momentum * connection.deltaWeightsPrevious;
                    connection.weight += connection.deltaWeightsTotal;
                    connection.deltaWeightsPrevious = connection.deltaWeightsTotal;
                    connection.deltaWeightsTotal = 0;
                }
            }
        } else {
            // TODO: don't think that this is correct
            // Passing only the connections that were used for getting the min or max
            for (let i: number = 0; i < this.incoming.length; i++) {
                this.incoming[i].weight = this.receivingIndex === i ? 1 : 0;
                this.incoming[i].gain = this.receivingIndex === i ? 1 : 0;
            }
        }
    }

    public toJSON(): PoolNodeJSON {
        return Object.assign(super.toJSON(), {
            poolType: this.poolingType
        });
    }
}
