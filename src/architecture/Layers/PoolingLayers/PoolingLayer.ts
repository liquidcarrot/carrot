import {ConnectionType} from "../../../enums/ConnectionType";
import {Layer} from "../Layer";

/**
 * Parent class for all pooling layers
 */
export abstract class PoolingLayer extends Layer {
    protected constructor(outputSize: number) {
        super(outputSize);
    }

    /**
     * Gets the default connection type for a incoming connection to this layer.
     *
     * @returns the default incoming connection
     */
    public getDefaultIncomingConnectionType(): ConnectionType {
        return ConnectionType.POOLING;
    }

    /**
     * Checks if a given connection type is allowed on this layer.
     *
     * @param type the type to check
     *
     * @return Is this connection type allowed?
     */
    public connectionTypeisAllowed(type: ConnectionType): boolean {
        return true;
    }
}
