import {Mutation} from "../methods/Mutation";
import {ActivationType} from "../enums/ActivationType";
import {Selection} from "../methods/Selection";
import {Loss} from "../methods/Loss";
import {Network} from "../architecture/Network";

export interface EvolveOptions {
    threads?: number;
    generation?: number;
    template?: Network;
    mutations?: Mutation[];
    activations?: ActivationType[];
    selection?: Selection;
    mutationRate?: number;
    mutationAmount?: number;
    provenance?: number;
    elitism?: number;
    populationSize?: number;
    fitnessFunction?: (dataset: { input: number[], output: number[] }[], population: Network[]) => Promise<void>;
    growth?: number;
    loss?: Loss;
    amount?: number;
    maxNodes?: number;
    maxConnections?: number;
    maxGates?: number;
    equal?: boolean;
    log?: number;
    schedule?: { iterations: number, function: (fitness: number, error: number, iteration: number) => void };
    clear?: boolean;
    error?: number;
    iterations?: number;
}




