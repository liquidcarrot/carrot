"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMaxPooling1DLayer = void 0;
const MaxPooling1DLayer_1 = require("./MaxPooling1DLayer");
/**
 * Global maximum pooling layer 1D
 */
class GlobalMaxPooling1DLayer extends MaxPooling1DLayer_1.MaxPooling1DLayer {
    constructor(outputSize, options = {}) {
        super(1, options);
    }
}
exports.GlobalMaxPooling1DLayer = GlobalMaxPooling1DLayer;
