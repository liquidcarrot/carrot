import {ConstantNode} from "./ConstantNode";
import {DropoutNodeJSON} from "../../interfaces/NodeJSON";
import {Connection} from "../Connection";
import {getOrDefault, randDouble, sum} from "../../methods/Utils";

export class DropoutNode extends ConstantNode {
    private probability: number;
    private droppedOut: boolean;

    constructor(probability: number) {
        super();
        this.probability = probability;
        this.droppedOut = false;
    }

    public activate(): number {
        if (this.incoming.length !== 1) {
            throw new RangeError("Dropout node should have exactly one incoming connection!");
        }
        const incomingConnection: Connection = this.incoming[0];

        // https://stats.stackexchange.com/a/219240
        if (randDouble(0, 1) < this.probability) {
            // DROPOUT
            this.droppedOut = true;
            this.state = 0;
        } else {
            this.droppedOut = false;
            this.state = incomingConnection.from.activation * incomingConnection.weight * incomingConnection.gain;
            this.state *= 1 / (1 - this.probability);
        }
        this.activation = this.squash.calc(this.state, false) * this.mask;

        // Adjust gain
        this.gated.forEach(conn => conn.gain = this.activation);

        return this.activation;
    }

    public propagate(target?: number, options: { momentum?: number, rate?: number, update?: boolean } = {}): void {
        options.momentum = getOrDefault(options.momentum, 0);
        options.rate = getOrDefault(options.rate, 0.3);
        options.update = getOrDefault(options.update, true);

        const connectionsStates: number[] = this.outgoing.map(conn => conn.to.errorResponsibility * conn.weight * conn.gain);
        this.errorResponsibility = this.errorProjected = sum(connectionsStates) / (1 - this.probability);

        if (this.incoming.length !== 1) {
            throw new RangeError("Dropout node should have exactly one incoming connection!");
        }
        const incomingConnection: Connection = this.incoming[0];

        // calculate gradient
        if (!this.droppedOut) {
            let gradient: number = this.errorProjected * incomingConnection.eligibility;
            for (let i: number = 0; i < incomingConnection.xTraceNodes.length; i++) {
                gradient += incomingConnection.xTraceNodes[i].errorResponsibility * incomingConnection.xTraceValues[i];
            }

            if (options.update) {
                incomingConnection.deltaWeightsTotal += options.rate * gradient * this.mask + options.momentum * incomingConnection.deltaWeightsPrevious;
                incomingConnection.weight += incomingConnection.deltaWeightsTotal;
                incomingConnection.deltaWeightsPrevious = incomingConnection.deltaWeightsTotal;
                incomingConnection.deltaWeightsTotal = 0;
            }
        }
    }


    public fromJSON(json: DropoutNodeJSON): DropoutNode {
        super.fromJSON(json);
        this.probability = json.probability;
        return this;
    }

    public toJSON(): DropoutNodeJSON {
        return Object.assign(super.toJSON(), {
            probability: this.probability
        });
    }
}
