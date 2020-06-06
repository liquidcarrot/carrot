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
exports.GlobalAvgPooling1DLayer = void 0;
var AvgPooling1DLayer_1 = require("./AvgPooling1DLayer");
/**
 * Global average pooling layer 1D
 */
var GlobalAvgPooling1DLayer = /** @class */ (function (_super) {
    __extends(GlobalAvgPooling1DLayer, _super);
    function GlobalAvgPooling1DLayer(outputSize, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, 1, options) || this;
    }
    return GlobalAvgPooling1DLayer;
}(AvgPooling1DLayer_1.AvgPooling1DLayer));
exports.GlobalAvgPooling1DLayer = GlobalAvgPooling1DLayer;
