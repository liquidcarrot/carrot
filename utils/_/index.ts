interface RandomParams {
  min?: number;
  max?: number;
  exclude?: number[];
}

/**
 * Randomly generates an integer
 *
 * @param {Object}	[options]
 * @param {number}  [options.min=0] - Smallest possible integer returned (inclusive)
 * @param {number}  [options.max=Number.MAX_SAFE_INTEGER] - Largest possible integer returned (exclusive)
 * @param {number[]}  [options.exclude={[]}] - An array of numbers that cannot be returned
 *
 * @return {number} Returns a random integer between `options.min` & `options.max` that was not included in `options.exclude`
 *
 * @example
 * _.random() // 2356
 * _.random({ min: -Number.MAX_SAFE_INTEGER }) // -6374724
 * _.random({ min: 0, max: 3, exclude: [2] }) // 1
 */
function random({
  min=0,
  max=Number.MAX_SAFE_INTEGER,
  exclude=[]
}: RandomParams = {}): number {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  return (exclude.includes(number)) ? random({ min, max }) : number;
}
