"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalAvgPooling1DLayer = void 0;
const AvgPooling1DLayer_1 = require("./AvgPooling1DLayer");
/**
 * Global average pooling layer 1D
 */
class GlobalAvgPooling1DLayer extends AvgPooling1DLayer_1.AvgPooling1DLayer {
    constructor(outputSize, options = {}) {
        super(1, options);
    }
}
exports.GlobalAvgPooling1DLayer = GlobalAvgPooling1DLayer;
