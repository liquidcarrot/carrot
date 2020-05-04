import {ConnectionJSON} from "./ConnectionJSON";
import {NodeJSON} from "./NodeJSON";

export interface NetworkJSON {
    nodes: NodeJSON[];
    connections: ConnectionJSON[];
    inputSize: number;
    outputSize: number;
}
