import {Rate} from "../methods/Rate";
import {Loss} from "../methods/Loss";

export interface TrainOptions {
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
