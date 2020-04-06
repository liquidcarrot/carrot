import {ActivationType} from "../enums/ActivationType";

export interface NodeJSON {
    bias: number;
    type: number;
    squash: ActivationType;
    mask: number;
    index: number;
}
