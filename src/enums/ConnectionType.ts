/**
 * The type of a connection.
 */
export enum ConnectionType {
    /**
     * No connection used for exceptions.
     */
    NO_CONNECTION,
    /**
     * Connect all input to all output nodes
     */
    ALL_TO_ALL,
    /**
     * Connect one input to one output node
     */
    ONE_TO_ONE,
    /**
     * Connect with pooling
     */
    POOLING
}
