declare module 'mnist' {
  export function set(
    trainingSize: number,
    testSize: number
  ): {
    training: {
      input: number[];
      output: number[];
    }[];
    test: {
      input: number[];
      output: number[];
    }[];
  };
}
