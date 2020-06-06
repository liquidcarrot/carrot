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
exports.AtomicNumber = exports.Atomic = void 0;
/**
 * Generic atomic class
 */
var Atomic = /** @class */ (function () {
    function Atomic(value) {
        this.value = value;
    }
    /**
     * Getter
     */
    Atomic.prototype.getValue = function () {
        return this.value;
    };
    /**
     * Setter
     * @param value
     */
    Atomic.prototype.setValue = function (value) {
        this.value = value;
    };
    return Atomic;
}());
exports.Atomic = Atomic;
/**
 * Atomic number class
 */
var AtomicNumber = /** @class */ (function (_super) {
    __extends(AtomicNumber, _super);
    function AtomicNumber(value) {
        if (value === void 0) { value = 0; }
        return _super.call(this, value) || this;
    }
    /**
     * Atomically adds the given value to the current value.
     * @param summand
     */
    AtomicNumber.prototype.getAndAddValue = function (summand) {
        this.value += summand;
        return this.value - summand;
    };
    /**
     * Atomically increments by one the current value.
     */
    AtomicNumber.prototype.getAndIncrement = function () {
        return this.getAndAddValue(1);
    };
    /**
     * Atomically decrements by one the current value.
     */
    AtomicNumber.prototype.getAndDecrement = function () {
        return this.getAndAddValue(-1);
    };
    /**
     * Atomically adds the given value to the current value.
     */
    AtomicNumber.prototype.addValueAndGet = function (summand) {
        this.value += summand;
        return this.value;
    };
    /**
     * Atomically increments by one the current value.
     */
    AtomicNumber.prototype.incrementAndGet = function () {
        return this.addValueAndGet(1);
    };
    /**
     * Atomically decrements by one the current value.
     */
    AtomicNumber.prototype.decrementAndGet = function () {
        return this.addValueAndGet(-1);
    };
    return AtomicNumber;
}(Atomic));
exports.AtomicNumber = AtomicNumber;
