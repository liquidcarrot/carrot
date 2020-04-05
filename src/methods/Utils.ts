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
 * Checks if the an array contains an element
 *
 * @param arr array to search in
 * @param target the element to search
 * @returns Does the array contains target?
 */
export function anyMatch<T>(arr: T[], target: T): boolean {
    for (const elem of arr) {
        if (elem === target) {
            return true;
        }
    }
    return false;
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
export function getOrDefault<T>(value: T | undefined | null, defaultValue: T): T {
    return value !== undefined && value !== null ? value : defaultValue;
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
