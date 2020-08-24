import { Network } from "../architecture/Network";

export declare type datasetType = { input: number[]; output: number[] }[];
export declare type fitnessFunction = (population: Iterable<Network>, dataset?: datasetType) => void;
