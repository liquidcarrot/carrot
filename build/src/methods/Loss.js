"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_LOSSES = exports.HINGELoss = exports.MSLELoss = exports.WAPELoss = exports.MAPELoss = exports.MAELoss = exports.BinaryLoss = exports.MBELoss = exports.MSELoss = void 0;
const Utils_1 = require("../utils/Utils");
exports.MSELoss = function (targets, outputs) {
    let error = 0;
    outputs.forEach(((value, index) => {
        error += Math.pow((targets[index] - value), 2);
    }));
    return error / outputs.length;
};
exports.MBELoss = function (targets, outputs) {
    let error = 0;
    outputs.forEach(((value, index) => {
        error += (targets[index] - value);
    }));
    return error / outputs.length;
};
exports.BinaryLoss = function (targets, outputs) {
    let error = 0;
    outputs.forEach(((value, index) => {
        error += Math.round(targets[index] * 2) !== Math.round(value * 2) ? 1 : 0;
    }));
    return error / outputs.length;
};
exports.MAELoss = function (targets, outputs) {
    let error = 0;
    outputs.forEach(((value, index) => {
        error += Math.abs(targets[index] - value);
    }));
    return error / outputs.length;
};
exports.MAPELoss = function (targets, outputs) {
    let error = 0;
    outputs.forEach(((value, index) => {
        error += Math.abs((value - targets[index]) / Math.max(targets[index], 1e-15));
    }));
    return error / outputs.length;
};
exports.WAPELoss = function (targets, outputs) {
    let error = 0;
    outputs.forEach(((value, index) => {
        error += Math.abs(targets[index] - value);
    }));
    return error / Utils_1.sum(targets);
};
exports.MSLELoss = function (targets, outputs) {
    let error = 0;
    outputs.forEach(((value, index) => {
        error += Math.log(Math.max(targets[index], 1e-15)) - Math.log(Math.max(value, 1e-15));
    }));
    return error / outputs.length;
};
exports.HINGELoss = function (targets, outputs) {
    let error = 0;
    outputs.forEach((value, index) => {
        error += Math.max(0, 1 - value * targets[index]);
    });
    return error / outputs.length;
};
exports.ALL_LOSSES = {
    MSELoss: exports.MSELoss,
    MBELoss: exports.MBELoss,
    BinaryLoss: exports.BinaryLoss,
    MAELoss: exports.MAELoss,
    MAPELoss: exports.MAPELoss,
    WAPELoss: exports.WAPELoss,
    MSLELoss: exports.MSLELoss,
    HINGELoss: exports.HINGELoss
};
