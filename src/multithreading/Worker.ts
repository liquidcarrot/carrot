import {expose} from "threads/worker";
import {Network} from "../architecture/Network";
import {ALL_LOSSES, MSELoss} from "../methods/Loss";

expose(async (serializedDataSet: string, jsonNetwork: string, lossIndex: number): Promise<number> => {
    return new Promise(resolve => {
        // parse network and dataset and run test
        resolve(Network.fromJSON(JSON.parse(jsonNetwork)).test(JSON.parse(serializedDataSet), ALL_LOSSES[lossIndex] ?? new MSELoss()));
    });
});
