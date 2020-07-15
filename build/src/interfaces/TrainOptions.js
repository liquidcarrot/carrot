"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainOptions = void 0;
var Loss_1 = require("../methods/Loss");
var Rate_1 = require("../methods/Rate");
/**
 * Options used to train network
 */
var TrainOptions = /** @class */ (function () {
    function TrainOptions(dataset) {
        this._dataset = dataset;
        this._iterations = -1;
        this._error = -1;
        this._loss = Loss_1.MSELoss;
        this._dropout = 0;
        this._momentum = 0;
        this._batchSize = this.dataset.length;
        this._rate = new Rate_1.FixedRate(0.3);
        this._log = -1;
        this._crossValidateTestSize = -1;
        this._shuffle = false;
        this._clear = false;
    }
    Object.defineProperty(TrainOptions.prototype, "dataset", {
        /**
         * Getter
         */
        get: function () {
            return this._dataset;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._dataset = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "shuffle", {
        /**
         * Getter
         */
        get: function () {
            return this._shuffle;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._shuffle = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "clear", {
        /**
         * Getter
         */
        get: function () {
            return this._clear;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._clear = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "schedule", {
        /**
         * Getter
         */
        get: function () {
            return this._schedule;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._schedule = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "crossValidateTestSize", {
        /**
         * Getter
         */
        get: function () {
            return this._crossValidateTestSize;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._crossValidateTestSize = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "rate", {
        /**
         * Getter
         */
        get: function () {
            return this._rate;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._rate = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "loss", {
        /**
         * Getter
         */
        get: function () {
            return this._loss;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._loss = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "iterations", {
        /**
         * Getter
         */
        get: function () {
            return this._iterations;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._iterations = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "error", {
        /**
         * Getter
         */
        get: function () {
            return this._error;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._error = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "momentum", {
        /**
         * Getter
         */
        get: function () {
            return this._momentum;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._momentum = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "dropout", {
        /**
         * Getter
         */
        get: function () {
            return this._dropout;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._dropout = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "log", {
        /**
         * Getter
         */
        get: function () {
            return this._log;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._log = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrainOptions.prototype, "batchSize", {
        /**
         * Getter
         */
        get: function () {
            return this._batchSize;
        },
        /**
         * Setter
         */
        set: function (value) {
            this._batchSize = value;
        },
        enumerable: false,
        configurable: true
    });
    return TrainOptions;
}());
exports.TrainOptions = TrainOptions;
