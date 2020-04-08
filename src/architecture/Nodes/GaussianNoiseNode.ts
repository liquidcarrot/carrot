import {avg, generateGaussian} from "../../methods/Utils";
import {ConstantNode} from "./ConstantNode";

export class GaussianNoiseNode extends ConstantNode {

    constructor() {
        super();
    }

    public activate(): number {
        // should only be one incoming, but if there are more incoming connections take the average and add gaussian noise
        const incomingStates: number[] = this.incoming.map(conn => conn.from.activation * conn.weight * conn.gain);
        this.state = avg(incomingStates) + generateGaussian();
        this.activation = this.state;

        // Adjust gain
        for (const connection of this.gated) {
            connection.gain = this.activation;
        }

        return this.activation;
    }
}
