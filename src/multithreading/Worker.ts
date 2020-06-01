import {expose} from "threads/worker";
import {Network} from "../architecture/Network";
import {NetworkJSON} from "../interfaces/NetworkJSON";
import {lossType} from "../methods/Loss";

expose((serializedDataSet: {
    /**
     * The input values
     */
    input: number[],
    /**
     * The target output values
     */
    output: number[]
}[], jsonNetwork: NetworkJSON, loss: lossType): number => {
    return Network.fromJSON(jsonNetwork).test(serializedDataSet, loss);
});
