import {expose} from "threads/worker";
import {Network} from "../architecture/Network";
import {NetworkJSON} from "../interfaces/NetworkJSON";
import {ALL_LOSSES, MSELoss} from "../methods/Loss";

expose((serializedDataSet: {
    /**
     * The input values
     */
    input: number[],
    /**
     * The target output values
     */
    output: number[]
}[], jsonNetwork: NetworkJSON, lossIndex: number): number => {
    return Network.fromJSON(jsonNetwork).test(serializedDataSet, ALL_LOSSES[lossIndex] ?? new MSELoss());
});
