import {avg, generateGaussian} from "../../methods/Utils";
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
        // should only be one incoming, but if there are more incoming connections take the average and add gaussian noise
        const incomingStates: number[] = this.incoming.map(conn => conn.from.activation * conn.weight * conn.gain);
        this.state = avg(incomingStates) + generateGaussian(this.mean, this.deviation);
        this.activation = this.state;

        // Adjust gain
        for (const connection of this.gated) {
            connection.gain = this.activation;
        }

        return this.activation;
    }

    public propagate(): void {
        // TODO implement that
        throw new Error("Not yet implemented!");
    }
}
