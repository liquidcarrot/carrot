import {Network} from './Network';
import {Species} from './Species';

class Population {
  public static nodeCounter: number;
  public static connCounter: number;
  public static nodeIDs: Map<number, number>;
  public static connIDs: Map<number, number>;

  private species: Species[];
  private networks: Set<Network>;

  private generation: number;
  private populationSize: number;

  public constructor(populationSize: number, template: Network) {
    this.populationSize = populationSize;
    this.species = [];
    this.networks = new Set<Network>();
    this.createNetworks(template);

    this.generation = 0;
  }

  private createNetworks(template: Network) {
    for (let i = 0; i < this.populationSize; i++) {
      this.networks.add(template.deepCopy());
    }
  }
}
