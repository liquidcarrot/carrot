const loss = {
  /**
   * @param {number[]|number} targetValues
   * @param {number[]|number} currentValues
   * @return {number}
   */
  ABS: function(targetValues, currentValues) {
    if (!Array.isArray(targetValues)) {
      targetValues = [targetValues];
    }
    if (!Array.isArray(currentValues)) {
      currentValues = [currentValues];
    }
    let sum = 0;
    for (let i = 0; i < targetValues.length; i++) {
      sum += Math.abs(targetValues[i] - currentValues[i]);
    }
    return sum;
  },
  /**
   * @param {number[]|number} targetValues
   * @param {number[]|number} currentValues
   * @return {number}
   */
  DIFF: function(targetValues, currentValues) {
    if (!Array.isArray(targetValues)) {
      targetValues = [targetValues];
    }
    if (!Array.isArray(currentValues)) {
      currentValues = [currentValues];
    }
    let sum = 0;
    for (let i = 0; i < targetValues.length; i++) {
      sum += targetValues[i] - currentValues[i];
    }
    return sum;
  },
  /**
   * @param {number[]|number} targetValues
   * @param {number[]|number} currentValues
   * @return {number}
   */
  MAE: function(targetValues, currentValues) {
    if (!Array.isArray(targetValues)) {
      targetValues = [targetValues];
    }
    if (!Array.isArray(currentValues)) {
      currentValues = [currentValues];
    }
    return this.ABS(targetValues, currentValues) / targetValues.length;
  },
  /**
   * @param {number[]|number} targetValues
   * @param {number[]|number} currentValues
   * @return {number}
   */
  MSE: function(targetValues, currentValues) {
    if (!Array.isArray(targetValues)) {
      targetValues = [targetValues];
    }
    if (!Array.isArray(currentValues)) {
      currentValues = [currentValues];
    }
    let sum = 0;
    for (let i = 0; i < targetValues.length; i++) {
      sum += (targetValues[i] - currentValues[i]) ** 2;
    }
    return sum / targetValues.length;
  },
  /**
   * @param {number[]|number} targetValues
   * @param {number[]|number} currentValues
   * @param {{delta:number}} options
   * @return {number}
   */
  HuberLoss: function(targetValues, currentValues, options) {
    if (!Array.isArray(targetValues)) {
      targetValues = [targetValues];
    }
    if (!Array.isArray(currentValues)) {
      currentValues = [currentValues];
    }
    let abs = this.ABS(targetValues, currentValues);
    return abs <= options.delta
      ? 0.5 * this.MSE(targetValues, currentValues) * targetValues.length
      : options.delta * abs - 0.5 * options.delta;
  },
  /**
   * @param {number[]|number} targetValues
   * @param {number[]|number} currentValues
   * @param {{delta:number}} options delta -> required quantile value between 0 and 1
   * @return {number}
   */
  QuantileLoss: function(targetValues, currentValues, options) {
    if (!Array.isArray(targetValues)) {
      targetValues = [targetValues];
    }
    if (!Array.isArray(currentValues)) {
      currentValues = [currentValues];
    }
    if (options.delta === undefined || isNaN(options.delta)) {
      options.delta = 0.5;
    }
    options.delta = Math.min(1, Math.max(0, options.delta));

    let sum = 0;
    for (let i = 0; i < targetValues.length; i++) {
      sum += currentValues[i] < targetValues[i]
        ? (options.delta - 1) * Math.abs(targetValues[i] - currentValues[i])
        : options.delta * Math.abs(targetValues[i] - currentValues[i]);
    }
    return sum;
  },
  /**
   * @param {number[]|number} targetValues
   * @param {number[]|number} currentValues
   * @return {number}
   */
  LogCoshLoss: function(targetValues, currentValues) {
    if (!Array.isArray(targetValues)) {
      targetValues = [targetValues];
    }
    if (!Array.isArray(currentValues)) {
      currentValues = [currentValues];
    }
    let sum = 0;
    for (let i = 0; i < targetValues.length; i++) {
      sum += Math.log(Math.cosh(targetValues[i] - currentValues[i]));
    }
    return sum;
  },
};

module.exports = loss;
