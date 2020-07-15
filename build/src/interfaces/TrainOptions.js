"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainOptions = void 0;
const Loss_1 = require("../methods/Loss");
const Rate_1 = require("../methods/Rate");
/**
 * Options used to train network
 */
class TrainOptions {
    constructor(dataset) {
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
    /**
     * Getter
     */
    get dataset() {
        return this._dataset;
    }
    /**
     * Setter
     */
    set dataset(value) {
        this._dataset = value;
    }
    /**
     * Getter
     */
    get shuffle() {
        return this._shuffle;
    }
    /**
     * Setter
     */
    set shuffle(value) {
        this._shuffle = value;
    }
    /**
     * Getter
     */
    get clear() {
        return this._clear;
    }
    /**
     * Setter
     */
    set clear(value) {
        this._clear = value;
    }
    /**
     * Getter
     */
    get schedule() {
        return this._schedule;
    }
    /**
     * Setter
     */
    set schedule(value) {
        this._schedule = value;
    }
    /**
     * Getter
     */
    get crossValidateTestSize() {
        return this._crossValidateTestSize;
    }
    /**
     * Setter
     */
    set crossValidateTestSize(value) {
        this._crossValidateTestSize = value;
    }
    /**
     * Getter
     */
    get rate() {
        return this._rate;
    }
    /**
     * Setter
     */
    set rate(value) {
        this._rate = value;
    }
    /**
     * Getter
     */
    get loss() {
        return this._loss;
    }
    /**
     * Setter
     */
    set loss(value) {
        this._loss = value;
    }
    /**
     * Getter
     */
    get iterations() {
        return this._iterations;
    }
    /**
     * Setter
     */
    set iterations(value) {
        this._iterations = value;
    }
    /**
     * Getter
     */
    get error() {
        return this._error;
    }
    /**
     * Setter
     */
    set error(value) {
        this._error = value;
    }
    /**
     * Getter
     */
    get momentum() {
        return this._momentum;
    }
    /**
     * Setter
     */
    set momentum(value) {
        this._momentum = value;
    }
    /**
     * Getter
     */
    get dropout() {
        return this._dropout;
    }
    /**
     * Setter
     */
    set dropout(value) {
        this._dropout = value;
    }
    /**
     * Getter
     */
    get log() {
        return this._log;
    }
    /**
     * Setter
     */
    set log(value) {
        this._log = value;
    }
    /**
     * Getter
     */
    get batchSize() {
        return this._batchSize;
    }
    /**
     * Setter
     */
    set batchSize(value) {
        this._batchSize = value;
    }
}
exports.TrainOptions = TrainOptions;
