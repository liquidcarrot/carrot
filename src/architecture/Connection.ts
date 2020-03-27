import {Node} from "./node";
import {randDouble} from "../methods/Utils";

export class Connection {
    elegibility: number;
    gain: number;
    weight: number;
    from: Node;
    to: Node;
    xtraceNodes: Node[];
    xtraceValues: number[];
    gateNode: Node | null;
    deltaWeightsTotal: number;
    deltaWeightsPrevious: number;
    private deltaWeights: number[];

    constructor(from: Node, to: Node, weight: number = randDouble(-1, 1), gateNode: Node | void | null) {
        this.from = from;
        this.to = to;
        this.weight = weight;
        this.gain = 1;
        this.elegibility = 0;
        this.deltaWeightsPrevious = 0;
        this.deltaWeightsTotal = 0;
        this.deltaWeights = [];
        this.xtraceNodes = [];
        this.xtraceValues = [];

        if (gateNode) {
            this.gateNode = gateNode;
            gateNode.addGate(this);
        } else {
            this.gateNode = null;
        }
    }

    static innovationID(a: number, b: number) {
        return 1 / 2 * (a + b) * (a + b + 1) + b;
    };

    toJSON(): ConnectionJSON {
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
