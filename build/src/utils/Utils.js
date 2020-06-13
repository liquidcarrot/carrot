"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairing = exports.generateGaussian = exports.avg = exports.sum = exports.min = exports.minValueIndex = exports.maxValueIndex = exports.max = exports.shuffle = exports.removeFromArray = exports.randBoolean = exports.randDouble = exports.randInt = exports.pickRandom = void 0;
/**
 * Returns an random element from the given array.
 *
 * @param arr the array to pick from
 * @returns the random picked element
 */
function pickRandom(arr) {
    if (Array.isArray(arr)) {
        if (arr.length === 0) {
            throw new RangeError("Cannot pick from an empty array");
        }
        return arr[randInt(0, arr.length)];
    }
    else {
        return pickRandom(Array.from(arr));
    }
}
exports.pickRandom = pickRandom;
/**
 * Returns a random integer in the range [min,max)
 *
 * @param min bound
 * @param max bound
 * @returns random integer in [min,max)
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.randInt = randInt;
/**
 * Returns a random double in the range [min,max)
 *
 * @param min bound
 * @param max bound
 * @returns random double in [min,max)
 */
function randDouble(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randDouble = randDouble;
/**
 * Returns a random boolean
 *
 * @returns random boolean
 */
function randBoolean() {
    return Math.random() >= 0.5;
}
exports.randBoolean = randBoolean;
/**
 * Removes an element from an array.
 *
 * @param arr the array
 * @param elem the element which will be removed
 * @returns false -> element does not exists on array; true -> element removed from array
 */
function removeFromArray(arr, elem) {
    var index = arr.indexOf(elem);
    if (index === -1) {
        return false;
    }
    else {
        arr.splice(index, 1);
        return true;
    }
}
exports.removeFromArray = removeFromArray;
/**
 * Shuffles an array
 * @param array the array
 * @returns the shuffled array
 */
function shuffle(array) {
    // While there are elements in the array
    for (var counter = array.length - 1; counter > 0; counter--) {
        // Pick a random index
        var index = randInt(0, counter);
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
}
exports.shuffle = shuffle;
/**
 * Finds the maximum value of an number array
 *
 * @param array
 */
function max(array) {
    if (array.length === 0) {
        throw new RangeError();
    }
    var maxValue = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }
    return maxValue;
}
exports.max = max;
/**
 * Finds the maximum value index of an number array
 *
 * @param array
 */
function maxValueIndex(array) {
    if (array.length === 0) {
        throw new RangeError();
    }
    var maxValue = array[0];
    var maxValueIndex = 0;
    for (var i = 1; i < array.length; i++) {
        if (array[i] > maxValue) {
            maxValue = array[i];
            maxValueIndex = i;
        }
    }
    return maxValueIndex;
}
exports.maxValueIndex = maxValueIndex;
/**
 * Finds the minimum value index of an number array
 *
 * @param array
 */
function minValueIndex(array) {
    if (array.length === 0) {
        throw new RangeError();
    }
    var minValue = array[0];
    var minValueIndex = 0;
    for (var i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
            minValueIndex = i;
        }
    }
    return minValueIndex;
}
exports.minValueIndex = minValueIndex;
/**
 * Finds the minimum value of an number array
 *
 * @param array
 */
function min(array) {
    if (array.length === 0) {
        throw new RangeError();
    }
    var minValue = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        }
    }
    return minValue;
}
exports.min = min;
/**
 * Calculates the average value of an array
 *
 * @param array
 */
function avg(array) {
    return sum(array) / array.length;
}
exports.avg = avg;
/**
 * Calculates the sum of all values of an array
 *
 * @param array
 */
function sum(array) {
    if (array.length === 0) {
        throw new RangeError();
    }
    var sum = 0;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var value = array_1[_i];
        sum += value;
    }
    return sum;
}
exports.sum = sum;
/**
 * Generates a random number with the gaussian distribution.
 *
 * @see https://en.wikipedia.org/wiki/Normal_distribution
 *
 * @param mean the mean value
 * @param deviation the standard deviation
 */
function generateGaussian(mean, deviation) {
    if (mean === void 0) { mean = 0; }
    if (deviation === void 0) { deviation = 2; }
    var sum = 0;
    var numSamples = 10;
    for (var i = 0; i < numSamples; i++) {
        sum += Math.random();
    }
    return deviation * sum / numSamples + mean - 0.5 * deviation;
}
exports.generateGaussian = generateGaussian;
/**
 * Pairing two numbers
 *
 * @see {@link https://en.wikipedia.org/wiki/Pairing_function (Cantor pairing function)|Pairing function (Cantor pairing function)}
 *
 * @param a - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
 * @param b - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
 *
 * @return An Integer that uniquely represents a pair of Integers
 */
function pairing(a, b) {
    return 1 / 2 * (a + b) * (a + b + 1) + b;
}
exports.pairing = pairing;
