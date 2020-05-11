import {ConnectionJSON} from "./ConnectionJSON";
import {NodeJSON} from "./NodeJSON";

/**
 * An interface for representing a network with an json object
 */
export interface NetworkJSON {
    /**
     * All nodes inside the network
     */
    nodes: NodeJSON[];
    /**
     * All connections in the network
     */
    connections: ConnectionJSON[];
    /**
     * The input size of the network
     */
    inputSize: number;
    /**
     * The output size of the network
     */
    outputSize: number;
}
