import { ActivationType } from "activations";
import {
  ALL_INSTINCT_MUTATIONS,
  FEEDFORWARD_INSTINCT_MUTATIONS,
  NO_STRUCTURE_INSTINCT_MUTATIONS,
  ONLY_STRUCTURE_INSTINCT_MUTATION,
} from "./InstinctMutation";
import { Network } from "../architecture/Network";

/**
 *
 * Genetic algorithm mutation methods. Creates variations (mutations) in neural networks which are then selected for better performance.
 *
 * @see {@link https://en.wikipedia.org/wiki/mutation_(genetic_algorithm)|Mutation (genetic algorithms) on Wikipedia}
 * @see {@link https://en.wikipedia.org/wiki/Genetic_algorithm#Selection|Selection (genetic algorithms) on Wikipedia}
 */
export abstract class Mutation {
  /**
   * Mutates a given network.
   *
   * @param network the network to mutate
   * @param options you can set the max amount of nodes, connections and gates
   */
  public abstract mutate(
    network: Network,
    options?: {
      /**
       * Maximum allowed nodes.
       */
      maxNodes?: number;
      /**
       * Maximum allowed connections.
       */
      maxConnections?: number;
      /**
       * Maximum allowed gates.
       */
      maxGates?: number;
      /**
       * All allowed activations.
       */
      allowedActivations?: ActivationType[];
    }
  ): void;
}

export const ALL_MUTATIONS: Mutation[] = ALL_INSTINCT_MUTATIONS;
export const FEEDFORWARD_MUTATIONS: Mutation[] = FEEDFORWARD_INSTINCT_MUTATIONS;
export const NO_STRUCTURE_MUTATIONS: Mutation[] = NO_STRUCTURE_INSTINCT_MUTATIONS;
export const ONLY_STRUCTURE_MUTATIONS: Mutation[] = ONLY_STRUCTURE_INSTINCT_MUTATION;
