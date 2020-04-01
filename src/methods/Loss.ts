abstract class Loss {
    public abstract calc(targets: number[], outputs: number[]): number;
}

export class CrossEntropyLoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error -= targets[index] * Math.log(Math.max(value, 1e-15)) + (1 - targets[index]) * Math.log(1 - Math.max(value, 1e-15));
        }));
        return error / outputs.length;
    }
}

export class MSELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.pow(targets[index] - value, 2);
        }));
        return error / outputs.length;
    }
}

export class BinaryLoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.round(targets[index] * 2) !== Math.round(value * 2) ? 1 : 0;
        }));
        return error / outputs.length;
    }
}

export class MAELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.abs(targets[index] - value);
        }));
        return error / outputs.length;
    }
}

export class MAPELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.abs((value - targets[index]) / Math.max(targets[index], 1e-15));
        }));
        return error / outputs.length;
    }
}

export class WAPELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        let sum: number = 0;
        for (let i: number = 0; i < outputs.length; i++) {
            error += Math.abs(targets[i] - outputs[i]);
            sum += targets[i];
        }
        return error / sum;
    }
}

export class MSLELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.log(Math.max(targets[index], 1e-15)) - Math.log(Math.max(value, 1e-15));
        }));
        return error / outputs.length;
    }
}

export class HINGELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach((value, index) => {
            error += Math.max(0, 1 - value * targets[index]);
        });
        return error / outputs.length;
    }
}
