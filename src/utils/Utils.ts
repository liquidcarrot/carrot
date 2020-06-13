/**
 * Returns an random element from the given array.
 *
 * @param arr the array to pick from
 * @returns the random picked element
 */
function pickRandom<T>(arr: T[] | Set<T>): T {
    if (Array.isArray(arr)) {
        if (arr.length === 0) {
            throw new RangeError("Cannot pick from an empty array");
        }
        return arr[randInt(0, arr.length)];
    } else {
        return pickRandom(Array.from(arr));
    }
}

/**
 * Returns a random integer in the range [min,max)
 *
 * @param min bound
 * @param max bound
 * @returns random integer in [min,max)
 */
function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Returns a random double in the range [min,max)
 *
 * @param min bound
 * @param max bound
 * @returns random double in [min,max)
 */
function randDouble(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random boolean
 *
 * @returns random boolean
 */
function randBoolean(): boolean {
    return Math.random() >= 0.5;
}

/**
 * Removes an element from an array.
 *
 * @param arr the array
 * @param elem the element which will be removed
 * @returns false -> element does not exists on array; true -> element removed from array
 */
function removeFromArray<T>(arr: T[], elem: T): boolean {
    const index: number = arr.indexOf(elem);
    if (index === -1) {
        return false;
    } else {
        arr.splice(index, 1);
        return true;
    }
}

/**
 * Checks a given value. If value is undefined return the default value.
 *
 * @param value to check
 * @param defaultValue to return if value is undefined
 * @returns value if defined otherwise defaultValue
 */
function getOrDefault<T>(value: T | undefined, defaultValue: T): T {
    return value ?? defaultValue;
}

/**
 * Shuffles an array
 * @param array the array
 * @returns the shuffled array
 */
function shuffle<T>(array: T[]): void {
    // While there are elements in the array
    for (let counter: number = array.length - 1; counter > 0; counter--) {
        // Pick a random index
        const index: number = randInt(0, counter);

        // And swap the last element with it
        const temp: T = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
}

/**
 * Finds the maximum value of an number array
 *
 * @param array
 */
function max(array: number[]): number {
    if (array.length === 0) {
        throw new RangeError();
    }
    let maxValue: number = array[0];
    for (let i: number = 1; i < array.length; i++) {
        if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }
    return maxValue;
}

/**
 * Finds the maximum value index of an number array
 *
 * @param array
 */
function maxValueIndex(array: number[]): number {
    if (array.length === 0) {
        throw new RangeError();
    }
    let maxValue: number = array[0];
    let maxValueIndex: number = 0;
    for (let i: number = 1; i < array.length; i++) {
        if (array[i] > maxValue) {
            maxValue = array[i];
            maxValueIndex = i;
        }
    }
    return maxValueIndex;
}

/**
 * Finds the minimum value index of an number array
 *
 * @param array
 */
function minValueIndex(array: number[]): number {
    if (array.length === 0) {
        throw new RangeError();
    }
    let minValue: number = array[0];
    let minValueIndex: number = 0;
    for (let i: number = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
            minValueIndex = i;
        }
    }
    return minValueIndex;
}

/**
 * Finds the minimum value of an number array
 *
 * @param array
 */
function min(array: number[]): number {
    if (array.length === 0) {
        throw new RangeError();
    }
    let minValue: number = array[0];
    for (let i: number = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        }
    }
    return minValue;
}

/**
 * Calculates the average value of an array
 *
 * @param array
 */
function avg(array: number[]): number {
    return sum(array) / array.length;
}

/**
 * Calculates the sum of all values of an array
 *
 * @param array
 */
function sum(array: number[]): number {
    if (array.length === 0) {
        throw new RangeError();
    }
    let sum: number = 0;
    for (const value of array) {
        sum += value;
    }
    return sum;
}

/**
 * Generates a random number with the gaussian distribution.
 *
 * @see https://en.wikipedia.org/wiki/Normal_distribution
 *
 * @param mean the mean value
 * @param deviation the standard deviation
 */
function generateGaussian(mean: number = 0, deviation: number = 2): number {
    let sum: number = 0;
    const numSamples: number = 10;
    for (let i: number = 0; i < numSamples; i++) {
        sum += Math.random();
    }

    return deviation * sum / numSamples + mean - 0.5 * deviation;
}

export {
    pickRandom,
    randInt,
    randDouble,
    randBoolean,
    removeFromArray,
    getOrDefault,
    shuffle,
    max,
    maxValueIndex,
    minValueIndex,
    min,
    sum,
    avg,
    generateGaussian
};
