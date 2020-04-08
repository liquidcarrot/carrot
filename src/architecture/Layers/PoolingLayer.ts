import {Layer} from "../Layer";

export abstract class PoolingLayer extends Layer {
    protected constructor(outputSize: number) {
        super(outputSize);
    }
}
