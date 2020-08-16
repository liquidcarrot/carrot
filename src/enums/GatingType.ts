/**
 * The type of gating.
 */
export enum GatingType {
  /**
   * Gate incoming connections.
   */
  INPUT,
  /**
   * Gate self connections.
   */
  SELF,
  /**
   * Gate outgoing connections.
   */
  OUTPUT,
}
