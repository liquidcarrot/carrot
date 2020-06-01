import {expose} from "threads/worker";
import {Network} from "../architecture/Network";
import {NetworkJSON} from "../interfaces/NetworkJSON";

expose((serializedDataSet: {
    /**
     * The input values
     */
    input: number[],
    /**
     * The target output values
     */
    output: number[]
}[], jsonNetwork: NetworkJSON, loss: (targets: number[], outputs: number[]) => number): number => {
    return Network.fromJSON(jsonNetwork).test(serializedDataSet, loss);
});
