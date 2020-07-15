"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMinPooling1DLayer = void 0;
const MinPooling1DLayer_1 = require("./MinPooling1DLayer");
/**
 * Global minimum pooling layer 1D
 */
class GlobalMinPooling1DLayer extends MinPooling1DLayer_1.MinPooling1DLayer {
    constructor(outputSize, options = {}) {
        super(1, options);
    }
}
exports.GlobalMinPooling1DLayer = GlobalMinPooling1DLayer;
