/**
 * Returns an random element from the given array.
 *
 * @param arr the array to pick from
 * @returns the random picked element
 */
export function pickRandom<T>(arr: T[]): T {
    if (arr.length === 0) {
        throw new RangeError("Cannot pick from an empty array");
    }
    return arr[randInt(0, arr.length)];
}

/**
 * Returns a random integer in the range [min,max)
 *
 * @param min bound
 * @param max bound
 * @returns random integer in [min,max)
 */
export function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Returns a random double in the range [min,max)
 *
 * @param min bound
 * @param max bound
 * @returns random double in [min,max)
 */
export function randDouble(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random boolean
 *
 * @returns random boolean
 */
export function randBoolean(): boolean {
    return Math.random() >= 0.5;
}

/**
 * Removes an element from an array.
 *
 * @param arr the array
 * @param elem the element which will be removed
 * @returns false -> element does not exists on array; true -> element removed from array
 */
export function removeFromArray<T>(arr: T[], elem: T): boolean {
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
export function getOrDefault<T>(value: T | undefined, defaultValue: T): T {
    return value ?? defaultValue;
}

/**
 * Shuffles an aray
 * @param array the array
 * @returns the shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
    let counter: number = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        const index: number = randInt(0, counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        const temp: T = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

export function max(array: number[]): number {
    let maxValue: number = -Infinity;
    for (const elem of array) {
        if (elem > maxValue) {
            maxValue = elem;
        }
    }
    return maxValue;
}

export function avg(array: number[]): number {
    let sum: number = 0;
    for (const elem of array) {
        sum += elem;
    }
    return sum / array.length;
}
