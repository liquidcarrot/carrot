import {expose} from "threads/worker";
import {ALL_LOSSES, Loss, MSELoss} from "../methods/Loss";
import {Activation, ALL_ACTIVATIONS} from "../methods/Activation";

function activateSerializedNetwork(input: number[], activations: number[], states: number[], connections: number[]): number[] {
    for (let i: number = 0; i < connections[0]; i++) {
        activations[i] = input[i];
    }
    for (let i: number = 2; i < connections.length; i++) {
        const index: number = connections[i++];
        const bias: number = connections[i++];
        const squash: number = connections[i++];
        const selfweight: number = connections[i++];
        const selfgater: number = connections[i++];

        states[index] = (selfgater === -1 ? 1 : activations[selfgater]) * selfweight * states[index] + bias;

        while (connections[i] !== -2) {
            states[index] += activations[connections[i++]] * connections[i++] * (connections[i++] === -1 ? 1 : activations[connections[i - 1]]);
        }
        activations[index] = Activation.getActivation(ALL_ACTIVATIONS[squash]).calc(states[index], false);
    }

    const output: number[] = [];
    for (let i: number = activations.length - connections[1]; i < activations.length; i++) {
        output.push(activations[i]);
    }
    return output;
}

function deserializeDataSet(serializedSet: number[]): { input: number[]; output: number[] }[] {
    const set: { input: number[], output: number[] }[] = [];

    const sampleSize: number = serializedSet[0] + serializedSet[1];
    for (let i: number = 0; i < (serializedSet.length - 2) / sampleSize; i++) {
        const input: number[] = [];
        for (let j: number = 2 + i * sampleSize; j < 2 + i * sampleSize + serializedSet[0]; j++) {
            input.push(serializedSet[j]);
        }
        const output: number[] = [];
        for (let j: number = 2 + i * sampleSize + serializedSet[0]; j < 2 + i * sampleSize + sampleSize; j++) {
            output.push(serializedSet[j]);
        }
        set.push({input, output});
    }

    return set;
}

expose(async (serializedDataSet: number[], serializedNetwork: number[][], lossIndex: number): Promise<number> => {
    const activations: number[] = serializedNetwork[0];
    const states: number[] = serializedNetwork[1];
    const connections: number[] = serializedNetwork[2];
    const dataset: { input: number[]; output: number[] }[] = deserializeDataSet(serializedDataSet);
    const loss: Loss = ALL_LOSSES[lossIndex] ?? new MSELoss();

    let error: number = 0;
    dataset.forEach(entry => {
        error += loss.calc(entry.output, activateSerializedNetwork(entry.input, activations, states, connections));
    });
    return error / dataset.length;
});
