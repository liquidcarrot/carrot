import {getOrDefault, sum} from "../../methods/Utils";
import {ConstantNode} from "./ConstantNode";

export class ActivationNode extends ConstantNode {
    constructor() {
        super();
    }

    public activate(): number {
        this.old = this.state;

        const incomingStates: number[] = this.incoming.map(conn => conn.from.activation * conn.weight * conn.gain);

        if (incomingStates.length !== 1) {
            throw new ReferenceError("Only 1 incoming connections is allowed!");
        }

        this.state = incomingStates[0];

        this.activation = this.squash.calc(this.state, false) * this.mask;
        this.derivative = this.squash.calc(this.state, true);

        return this.activation;
    }

    public propagate(target?: number, options: { momentum?: number, rate?: number, update?: boolean } = {}): void {
        options.momentum = getOrDefault(options.momentum, 0);
        options.rate = getOrDefault(options.rate, 0.3);
        options.update = getOrDefault(options.update, true);

        const connectionsStates: number[] = this.outgoing.map(conn => conn.to.errorResponsibility * conn.weight * conn.gain);
        this.errorResponsibility = this.errorProjected = sum(connectionsStates) * this.derivative;

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
    }
}
