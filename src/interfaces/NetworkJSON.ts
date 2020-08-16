import {ConnectionJSON} from './ConnectionJSON';
import {NodeJSON} from './NodeJSON';

/**
 * An interface for representing a network with an json object
 */
export interface NetworkJSON {
    /**
     * All nodes inside the network
     */
    readonly nodes: NodeJSON[];
    /**
     * All connections in the network
     */
    readonly connections: ConnectionJSON[];
    /**
     * The input size of the network
     */
    readonly inputSize: number;
    /**
     * The output size of the network
     */
    readonly outputSize: number;
}
