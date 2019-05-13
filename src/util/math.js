const BigNumber = require("bignumber.js")
const _ = require("lodash");

const toNumber = (BigNumber) => BigNumber.abs().gt(Number.MAX_VALUE) ? BigNumber.isNegative() ? -Number.MAX_VALUE : Number.MAX_VALUE : BigNumber.toNumber();

module.exports.multiply = (numbers) => toNumber(_.reduce(numbers, (total, number) => total.times(number), new BigNumber(1)));

module.exports.sum = (numbers) => toNumber(_.reduce(numbers, (total, number) => total.plus(number), new BigNumber(0)));