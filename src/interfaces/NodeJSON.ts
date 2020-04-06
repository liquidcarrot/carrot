import {ActivationType} from "../enums/ActivationType";
import {PoolingType} from "../enums/PoolingType";

export interface NodeJSON {
    bias?: number;
    type?: number;
    squash?: ActivationType;
    mask?: number;
    index?: number;
}

export interface PoolNodeJSON extends NodeJSON {
    poolType: PoolingType;
}
