import {Loss} from "../methods/Loss";
import {Rate} from "../methods/Rate";

export interface TrainOptions {
    dataset: { input: number[], output: number[] }[];
    ratePolicy?: Rate;
    rate?: number;
    loss?: Loss;
    iterations?: number;
    error?: number;
    shuffle?: boolean;
    momentum?: number;
    dropout?: number;
    clear?: boolean;
    schedule?: { iterations: number, function: (error: number, iteration: number) => undefined };
    crossValidateTestSize?: number;
    log?: number;
    batchSize?: number;
}
