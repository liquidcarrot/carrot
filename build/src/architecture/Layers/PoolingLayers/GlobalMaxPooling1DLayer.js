"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMaxPooling1DLayer = void 0;
var MaxPooling1DLayer_1 = require("./MaxPooling1DLayer");
/**
 * Global maximum pooling layer 1D
 */
var GlobalMaxPooling1DLayer = /** @class */ (function (_super) {
    __extends(GlobalMaxPooling1DLayer, _super);
    function GlobalMaxPooling1DLayer(outputSize, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, 1, options) || this;
    }
    return GlobalMaxPooling1DLayer;
}(MaxPooling1DLayer_1.MaxPooling1DLayer));
exports.GlobalMaxPooling1DLayer = GlobalMaxPooling1DLayer;
