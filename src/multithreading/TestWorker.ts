import {expose} from 'threads/worker';
import {Network} from '../architecture/Network';
import {ALL_LOSSES} from '../methods/Loss';

export type TestWorker = (
  serializedDataSet: string,
  jsonNetwork: string,
  lossIndex: number
) => number;

const testWorker: TestWorker = (
  serializedDataSet: string,
  jsonNetwork: string,
  lossIndex: number
): number => {
  return Network.fromJSON(JSON.parse(jsonNetwork)).test(
    JSON.parse(serializedDataSet),
    Object.values(ALL_LOSSES)[lossIndex]
  );
};

expose(testWorker);
