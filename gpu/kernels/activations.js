// Exports a list of GPU serializeable squash functions
module.exports = {
  ACTIVATIONS: [
  // 1 / (1 + e^-x)
  function SIGMOID(x) {
    return 1 / (1 + Math.exp(-x));
  },
  // x; x > 0, 0; x <= 0
  function RELU(x) {
    return x > 0 ? x : 0;
  }],
  DERIVATIVES: [
  // e^-x / (1 + e-x)^2
  function _SIGMOID(x) {
    const f = 1 / (1 + Math.exp(-x));
    return f / Math.pow(1 + f, 2);
  },
  // 1; x > 0, 0; x <= 0
  function _RELU(x) {
    return x > 0 ? 1 : 0;
  }]
}
