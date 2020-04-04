import {Connection} from "../Connection";
import {Node} from "../Node";

// TODO: actually implement it
export abstract class Layer {
    public inputSize: number;
    public outputSize: number;
    public nodes: Node[];
    public connections: Connection[];


    protected constructor(inputSize: number, outputSize: number) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.nodes = [];
        this.connections = [];
    }
}
