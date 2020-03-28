import {Layer} from "./Layer";

export class PoolLayer extends Layer {
    constructor(inputSize: number, outputSize: number, type: PoolingType) {
        super(inputSize, outputSize);
        // TODO: actually implement it
    }
}

export enum PoolingType {
    MaxPooling,
    AveragePooling,
    GlobalPooling
}
