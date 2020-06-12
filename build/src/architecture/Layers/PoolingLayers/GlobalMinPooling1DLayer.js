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
exports.GlobalMinPooling1DLayer = void 0;
var MinPooling1DLayer_1 = require("./MinPooling1DLayer");
/**
 * Global minimum pooling layer 1D
 */
var GlobalMinPooling1DLayer = /** @class */ (function (_super) {
    __extends(GlobalMinPooling1DLayer, _super);
    function GlobalMinPooling1DLayer(outputSize, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, 1, options) || this;
    }
    return GlobalMinPooling1DLayer;
}(MinPooling1DLayer_1.MinPooling1DLayer));
exports.GlobalMinPooling1DLayer = GlobalMinPooling1DLayer;
