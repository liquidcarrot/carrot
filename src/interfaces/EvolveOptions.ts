import {Network} from "../architecture/Network";
import {ActivationType} from "../enums/ActivationType";
import {Loss} from "../methods/Loss";
import {Mutation} from "../methods/Mutation";
import {Selection} from "../methods/Selection";

export interface EvolveOptions {
    dataset?: { input: number[], output: number[] }[];
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
    fitnessFunction?: (population: Network[], dataset?: { input: number[], output: number[] }[]) => Promise<void>;
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
