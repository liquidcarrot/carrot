"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGaussian = exports.avg = exports.sum = exports.min = exports.minValueIndex = exports.maxValueIndex = exports.max = exports.shuffle = exports.getOrDefault = exports.removeFromArray = exports.randBoolean = exports.randDouble = exports.randInt = exports.pickRandom = void 0;
/**
 * Returns an random element from the given array.
 *
 * @param arr the array to pick from
 * @returns the random picked element
 */
function pickRandom(arr) {
    if (arr.length === 0) {
        throw new RangeError("Cannot pick from an empty array");
    }
    return arr[randInt(0, arr.length)];
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
 * Checks a given value. If value is undefined return the default value.
 *
 * @param value to check
 * @param defaultValue to return if value is undefined
 * @returns value if defined otherwise defaultValue
 */
function getOrDefault(value, defaultValue) {
    return value !== null && value !== void 0 ? value : defaultValue;
}
exports.getOrDefault = getOrDefault;
/**
 * Shuffles an array
 * @param array the array
 * @returns the shuffled array
 */
function shuffle(array) {
    var counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = randInt(0, counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
exports.shuffle = shuffle;
/**
 * Finds the maximum value of an number array
 *
 * @param array
 */
function max(array) {
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
