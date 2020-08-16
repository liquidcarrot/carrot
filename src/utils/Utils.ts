/**
 * Returns an random element from the given array.
 *
 * @param arr the array to pick from
 * @returns the random picked element
 */
function pickRandom<T>(arr: T[] | Set<T>): T {
  if (Array.isArray(arr)) {
    if (arr.length === 0) {
      throw new RangeError('Cannot pick from an empty array');
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
  for (let i = 1; i < array.length; i++) {
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
  let maxValueIndex = 0;
  for (let i = 1; i < array.length; i++) {
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
  let minValueIndex = 0;
  for (let i = 1; i < array.length; i++) {
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
  for (let i = 1; i < array.length; i++) {
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
  let sum = 0;
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
function generateGaussian(mean = 0, deviation = 2): number {
  let sum = 0;
  const numSamples = 10;
  for (let i = 0; i < numSamples; i++) {
    sum += Math.random();
  }

  return (deviation * sum) / numSamples + mean - 0.5 * deviation;
}

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
function pairing(a: number, b: number): number {
  if (a < 0 || b < 0) throw new RangeError("Should be a positive integer!");
  return (1 / 2) * (a + b) * (a + b + 1) + b;
}

export {
  pickRandom,
  randInt,
  randDouble,
  randBoolean,
  removeFromArray,
  shuffle,
  max,
  maxValueIndex,
  minValueIndex,
  min,
  sum,
  avg,
  generateGaussian,
  pairing,
};
