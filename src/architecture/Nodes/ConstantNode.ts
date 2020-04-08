import {Node} from "../Node";
import {NodeType} from "../../enums/NodeType";
import {NodeJSON} from "../../interfaces/NodeJSON";
import {Activation} from "../../methods/Activation";
import {ActivationType} from "../../enums/ActivationType";

export class ConstantNode extends Node {

    constructor() {
        super(NodeType.HIDDEN);
        this.bias = 1;
    }

    public fromJSON(json: NodeJSON): Node {
        this.index = json.index ?? -1;
        this.squash = Activation.getActivation(json.squash ?? ActivationType.IdentityActivation);
        return this;
    }

    public toJSON(): NodeJSON {
        return {index: this.index, squash: this.squash.type};
    }

    public mutateBias(): void {
        throw new ReferenceError("Cannot mutate a pool node!");
    }

    public mutateActivation(): void {
        throw new ReferenceError("Cannot mutate a pool node!");
    }

    public addGate(): void {
        throw new ReferenceError("A pool node can't gate a connection!");
    }

    public removeGate(): void {
        throw new ReferenceError("A pool node can't gate a connection!");
    }

    public propagate(): void {
        super.propagate(undefined, {update: false, rate: 0, momentum: 0});
    }

    public setBias(): Node {
        throw new ReferenceError("Cannot set the bias of a pool node!");
    }
}
