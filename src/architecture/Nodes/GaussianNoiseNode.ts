import {generateGaussian, sum} from "../../methods/Utils";
import {ConstantNode} from "./ConstantNode";

export class GaussianNoiseNode extends ConstantNode {

    constructor() {
        super();
    }

    public activate(): number {
        const incomingStates: number[] = this.incoming.map(conn => conn.from.activation * conn.weight * conn.gain);
        this.state = sum(incomingStates) + generateGaussian();
        this.activation = this.state;

        // Adjust gain
        for (const connection of this.gated) {
            connection.gain = this.activation;
        }

        return this.activation;
    }
}
