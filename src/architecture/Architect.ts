import {Layer} from "./layer/Layer";

export class Architect {
    private readonly layers: Layer[];

    constructor() {
        this.layers = [];
    }

    public addLayer(layer: Layer): Architect {
        if (this.layers[this.layers.length - 1].outputSize !== layer.inputSize) {
            throw new RangeError("Output size of last layer is unequal input size of this layer! " + this.layers[this.layers.length - 1].outputSize + " -> " + layer.inputSize);
        }
        this.layers.push(layer);
        return this;
    }
}
