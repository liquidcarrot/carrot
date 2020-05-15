/**
 * An interface for representing a connection with an json object
 */
export interface ConnectionJSON {
    /**
     * The connection weight
     */
    weight: number;
    /**
     * The index of the origin node
     */
    fromIndex: number;
    /**
     * The index of the destination node
     */
    toIndex: number;
    /**
     * The index of the gate node, if connection is gated
     */
    gateNodeIndex: number | null;
}
