import {Layer} from "../Layer";
import {ConnectionType} from "../../enums/ConnectionType";

export abstract class PoolingLayer extends Layer {
    protected constructor(outputSize: number) {
        super(outputSize);
    }

    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.POOLING;
    }
}
