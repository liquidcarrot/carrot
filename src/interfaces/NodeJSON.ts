import {ActivationType} from "../enums/ActivationType";
import {PoolNodeType} from "../enums/NodeType";

export interface NodeJSON {
    bias?: number;
    type?: number;
    squash?: ActivationType;
    mask?: number;
    index?: number;
}

export interface PoolNodeJSON extends NodeJSON {
    poolType: PoolNodeType;
}

export interface DropoutNodeJSON extends NodeJSON {
    probability: number;
}
