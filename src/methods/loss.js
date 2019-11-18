const loss = {
  /**
   * Squared error
   * @param {number} targetValue
   * @param {number} currentValue
   * @returns {number}
   * @constructor
   */
  SE: function(targetValue, currentValue) {
    return (targetValue - currentValue) ** 2;
  },
  MEAN: function(currentValues) {

  },
};

module.exports = loss;
