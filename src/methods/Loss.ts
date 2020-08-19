import { sum } from "..";

export type lossType = (targets: number[], outputs: number[]) => number;

export const MSELoss: lossType = function (
  targets: number[],
  outputs: number[]
): number {
  let error = 0;
  outputs.forEach((value, index) => {
    error += (targets[index] - value) ** 2;
  });
  return error / outputs.length;
};
export const MBELoss: lossType = function (
  targets: number[],
  outputs: number[]
): number {
  let error = 0;
  outputs.forEach((value, index) => {
    error += targets[index] - value;
  });
  return error / outputs.length;
};
export const BinaryLoss: lossType = function (
  targets: number[],
  outputs: number[]
): number {
  let error = 0;
  outputs.forEach((value, index) => {
    error += Math.round(targets[index] * 2) !== Math.round(value * 2) ? 1 : 0;
  });
  return error / outputs.length;
};
export const MAELoss: lossType = function (
  targets: number[],
  outputs: number[]
): number {
  let error = 0;
  outputs.forEach((value, index) => {
    error += Math.abs(targets[index] - value);
  });
  return error / outputs.length;
};
export const MAPELoss: lossType = function (
  targets: number[],
  outputs: number[]
): number {
  let error = 0;
  outputs.forEach((value, index) => {
    error += Math.abs(
      (value - targets[index]) / Math.max(targets[index], 1e-15)
    );
  });
  return error / outputs.length;
};
export const WAPELoss: lossType = function (
  targets: number[],
  outputs: number[]
): number {
  let error = 0;
  outputs.forEach((value, index) => {
    error += Math.abs(targets[index] - value);
  });
  return error / sum(targets);
};
export const MSLELoss: lossType = function (
  targets: number[],
  outputs: number[]
): number {
  let error = 0;
  outputs.forEach((value, index) => {
    error +=
      Math.log(Math.max(targets[index], 1e-15)) -
      Math.log(Math.max(value, 1e-15));
  });
  return error / outputs.length;
};

export const HINGELoss: lossType = function (
  targets: number[],
  outputs: number[]
): number {
  let error = 0;
  outputs.forEach((value, index) => {
    error += Math.max(0, 1 - value * targets[index]);
  });
  return error / outputs.length;
};

export const ALL_LOSSES: {
  /**
   * Mean Squared Error
   *
   * @param targets Ideal value
   * @param outputs Actual values
   *
   * @return [Mean squared error](https://medium.freecodecamp.org/machine-learning-mean-squared-error-regression-line-c7dde9a26b93)
   */
  MSELoss: lossType;
  /**
   * Binary Error
   *
   * @param targets Ideal value
   * @param outputs Actual values
   *
   * @return misses The amount of times targets value was missed
   */
  BinaryLoss: lossType;
  /**
   * Mean Squared Logarithmic Error
   *
   * @param targets Ideal value
   * @param outputs Actual values
   *
   * @return - [Mean squared logarithmic error](https://peltarion.com/knowledge-center/documentation/modeling-view/build-an-ai-model/loss-functions/mean-squared-logarithmic-error)
   */
  MSLELoss: lossType;
  /**
   * Mean Bias Error
   *
   * @param targets Ideal value
   * @param outputs Actual values
   *
   * @return [Mean bias error](https://towardsdatascience.com/common-loss-functions-in-machine-learning-46af0ffc4d23)
   */
  MBELoss: lossType;
  /**
   * Weighted Absolute Percentage Error (WAPE)
   *
   * @param targets Ideal value
   * @param outputs Actual values
   *
   * @return - [Weighted absolute percentage error](https://help.sap.com/doc/saphelp_nw70/7.0.31/en-US/76/487053bbe77c1ee10000000a174cb4/content.htm?no_cache=true)
   */
  WAPELoss: lossType;
  /**
   * Hinge loss, for classifiers
   *
   * @param targets Ideal value
   * @param outputs Actual values
   *
   * @return - [Hinge loss](https://towardsdatascience.com/support-vector-machines-intuitive-understanding-part-1-3fb049df4ba1)
   */
  HINGELoss: lossType;
  /**
   * Mean Absolute Error
   *
   * @param targets Ideal value
   * @param outputs Actual values
   *
   * @return [Mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error)
   */
  MAELoss: lossType;
  /**
   * Mean Absolute Percentage Error
   *
   * @param targets Ideal value
   * @param outputs Actual values
   *
   * @return [Mean absolute percentage error](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error)
   */
  MAPELoss: lossType;
} = {
  MSELoss,
  MBELoss,
  BinaryLoss,
  MAELoss,
  MAPELoss,
  WAPELoss,
  MSLELoss,
  HINGELoss,
};
