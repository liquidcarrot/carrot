import {Layer} from "./Layer";

// TODO: actually implement it
export class PoolLayer extends Layer {
    constructor(inputSize: number, outputSize: number, type: PoolingType) {
        super(inputSize, outputSize);
    }
}

export enum PoolingType {
    MaxPooling,
    AveragePooling,
    GlobalPooling
}
