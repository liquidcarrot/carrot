import {expose} from "threads/worker";
import {Network} from "../architecture/Network";
import {ALL_LOSSES, MSELoss} from "../methods/Loss";

expose((serializedDataSet: string, jsonNetwork: string, lossIndex: number): number => {
    return Network.fromJSON(JSON.parse(jsonNetwork)).test(JSON.parse(serializedDataSet), ALL_LOSSES[lossIndex] ?? new MSELoss());
});
