import {avg, generateGaussian, getOrDefault, sum} from "../../methods/Utils";
import {ConstantNode} from "./ConstantNode";

export class GaussianNoiseNode extends ConstantNode {
    private readonly mean: number;
    private readonly deviation: number;

    constructor(options: { mean?: number, deviation?: number } = {}) {
        super();
        this.mean = options.mean ?? 0;
        this.deviation = options.deviation ?? 2;
    }

    public activate(): number {
        this.old = this.state;

        const incomingStates: number[] = this.incoming.map(conn => conn.from.activation * conn.weight * conn.gain);
        this.state = avg(incomingStates) + generateGaussian(this.mean, this.deviation);

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
