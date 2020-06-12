"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatingType = void 0;
/**
 * The type of gating.
 */
var GatingType;
(function (GatingType) {
    /**
     * Gate incoming connections.
     */
    GatingType[GatingType["INPUT"] = 0] = "INPUT";
    /**
     * Gate self connections.
     */
    GatingType[GatingType["SELF"] = 1] = "SELF";
    /**
     * Gate outgoing connections.
     */
    GatingType[GatingType["OUTPUT"] = 2] = "OUTPUT";
})(GatingType = exports.GatingType || (exports.GatingType = {}));
