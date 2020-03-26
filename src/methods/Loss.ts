export abstract class Loss {
    abstract calc(targets: number[], outputs: number[]): number;
}

export class CROSS_ENTROPY extends Loss {
    calc(targets: number[], outputs: number[]): number {
        const error = outputs.reduce(function (total, value, index) {
            return total -= targets[index] * Math.log(Math.max(outputs[index], 1e-15)) + (1 - targets[index]) * Math.log(1 - Math.max(outputs[index], 1e-15));
        }, 0);

        return error / outputs.length;
    }
}

export class MSE extends Loss {
    calc(targets: number[], outputs: number[]): number {
        const error = outputs.reduce(function (total, value, index) {
            return total += Math.pow(targets[index] - outputs[index], 2);
        }, 0);

        return error / outputs.length;
    }
}

export class BINARY extends Loss {
    calc(targets: number[], outputs: number[]): number {
        const error = outputs.reduce(function (total, value, index) {
            return total += Math.round(targets[index] * 2) !== Math.round(outputs[index] * 2) ? 1 : 0;
        }, 0);

        return error / outputs.length;
    }
}

export class MAE extends Loss {
    calc(targets: number[], outputs: number[]): number {
        const error = outputs.reduce(function (total, value, index) {
            return total += Math.abs(targets[index] - outputs[index]);
        }, 0);

        return error / outputs.length;
    }
}

export class MAPE extends Loss {
    calc(targets: number[], outputs: number[]): number {
        const error = outputs.reduce(function (total, value, index) {
            return total += Math.abs((outputs[index] - targets[index]) / Math.max(targets[index], 1e-15));
        }, 0);

        return error / outputs.length;
    }
}

export class WAPE extends Loss {
    calc(targets: number[], outputs: number[]): number {
        let error = 0;
        let sum = 0;

        for (let i = 0; i < outputs.length; i++) {
            error += Math.abs(targets[i] - outputs[i]);
            sum += targets[i];
        }

        return error / sum;
    }
}

export class MSLE extends Loss {
    calc(targets: number[], outputs: number[]): number {
        const error = outputs.reduce(function (total, value, index) {
            return total += Math.log(Math.max(targets[index], 1e-15)) - Math.log(Math.max(outputs[index], 1e-15));
        }, 0);

        return error / outputs.length;
    }
}

export class HINGE extends Loss {
    calc(targets: number[], outputs: number[]): number {
        const error = outputs.reduce(function (total, value, index) {
            return total += Math.max(0, 1 - targets[index] * outputs[index]);
        }, 0);

        return error / outputs.length;
    }
}
