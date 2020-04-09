import {avg, generateGaussian, getOrDefault, sum} from "../../methods/Utils";
import {ConstantNode} from "./ConstantNode";
import {NoiseNodeType} from "../../enums/NodeType";

export class NoiseNode extends ConstantNode {
    private readonly noiseType: NoiseNodeType;
    private options: { noiseType?: NoiseNodeType; gaussian?: { mean?: number; deviation?: number } };

    constructor(options: { noiseType?: NoiseNodeType, gaussian?: { mean?: number, deviation?: number } } = {}) {
        super();
        this.noiseType = getOrDefault(options.noiseType, NoiseNodeType.GAUSSIAN_NOISE);
        this.options = options;
    }

    public activate(): number {
        this.old = this.state;

        const incomingStates: number[] = this.incoming.map(conn => conn.from.activation * conn.weight * conn.gain);
        switch (this.noiseType) {

        }
        switch (this.noiseType) {
            case NoiseNodeType.GAUSSIAN_NOISE:
                this.state = avg(incomingStates) + generateGaussian(this.options.gaussian?.mean ?? 0, this.options.gaussian?.deviation ?? 2);
                break;
            default:
                throw new ReferenceError("Cannot activate this noise type!");

        }

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
