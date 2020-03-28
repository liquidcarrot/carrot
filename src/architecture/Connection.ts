import {Node} from "./node";
import {randDouble} from "../methods/Utils";

export class Connection {
    public eligibility: number;
    public gain: number;
    public weight: number;
    public from: Node;
    public to: Node;
    public xTraceNodes: Node[];
    public xTraceValues: number[];
    public gateNode: Node | null;
    public deltaWeightsTotal: number;
    public deltaWeightsPrevious: number;

    constructor(from: Node, to: Node, weight: number = randDouble(-1, 1), gateNode: Node | void | null) {
        this.from = from;
        this.to = to;
        this.weight = weight;
        this.gain = 1;
        this.eligibility = 0;
        this.deltaWeightsPrevious = 0;
        this.deltaWeightsTotal = 0;
        this.xTraceNodes = [];
        this.xTraceValues = [];

        if (gateNode) {
            this.gateNode = gateNode;
            gateNode.addGate(this);
        } else {
            this.gateNode = null;
        }
    }

    public static innovationID(a: number, b: number): number {
        return 1 / 2 * (a + b) * (a + b + 1) + b;
    }

    public toJSON(): ConnectionJSON {
        return {
            fromIndex: this.from.index,
            toIndex: this.to.index,
            gateNodeIndex: this.gateNode === null ? null : this.gateNode.index,
            weight: this.weight
        };
    }
}

export interface ConnectionJSON {
    weight: number;
    fromIndex: number;
    toIndex: number;
    gateNodeIndex: number | null;
}
