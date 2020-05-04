/**
 * Loss functions play an important role in neural networks. They give neural networks an indication of 'how wrong' they are; a.k.a. how far they are from the desired outputs. Also in fitness functions, loss functions play an important role.
 *
 * @see [Loss Function on Wikipedia](https://en.wikipedia.org/wiki/Loss_function)
 */
abstract class Loss {
    /**
     * Calculates the loss value from output to target.
     *
     * @param targets the target values
     * @param outputs the real output values
     * @returns the loss between output and target
     */
    public abstract calc(targets: number[], outputs: number[]): number;
}

/**
 * Cross entropy error
 *
 * @see {@link http://bit.ly/2p5W29A | Cross-entropy Error Function}
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Cross entropy error](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, { loss: new CrossEntropyLoss() });
 */
class CrossEntropyLoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error -= targets[index] * Math.log(Math.max(value, 1e-15)) + (1 - targets[index]) * Math.log(1 - Math.max(value, 1e-15));
        }));
        return error / outputs.length;
    }
}

/**
 * Mean Squared Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Mean squared error](https://medium.freecodecamp.org/machine-learning-mean-squared-error-regression-line-c7dde9a26b93)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, { loss: new MSELoss() });
 */
class MSELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.pow(targets[index] - value, 2);
        }));
        return error / outputs.length;
    }
}

/**
 * Binary Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return misses The amount of times targets value was missed
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new BinaryLoss()
 * });
 */
class BinaryLoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.round(targets[index] * 2) !== Math.round(value * 2) ? 1 : 0;
        }));
        return error / outputs.length;
    }
}

/**
 * Mean Absolute Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Mean absolute error](https://en.wikipedia.org/wiki/Mean_absolute_error)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new MAELoss()
 * });
 */
class MAELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.abs(targets[index] - value);
        }));
        return error / outputs.length;
    }
}

/**
 * Mean Absolute Percentage Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return [Mean absolute percentage error](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new MAPELoss()
 * });
 */
class MAPELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.abs((value - targets[index]) / Math.max(targets[index], 1e-15));
        }));
        return error / outputs.length;
    }
}

/**
 * Weighted Absolute Percentage Error (WAPE)
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return - [Weighted absolute percentage error](https://help.sap.com/doc/saphelp_nw70/7.0.31/en-US/76/487053bbe77c1ee10000000a174cb4/content.htm?no_cache=true)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   loss: new WAPELoss()
 * });
 */
class WAPELoss extends Loss {
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

/**
 * Mean Squared Logarithmic Error
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return - [Mean squared logarithmic error](https://peltarion.com/knowledge-center/documentation/modeling-view/build-an-ai-model/loss-functions/mean-squared-logarithmic-error)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new MSLELoss()
 * });
 */
class MSLELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach(((value, index) => {
            error += Math.log(Math.max(targets[index], 1e-15)) - Math.log(Math.max(value, 1e-15));
        }));
        return error / outputs.length;
    }
}

/**
 * Hinge loss, for classifiers
 *
 * @param targets Ideal value
 * @param outputs Actual values
 *
 * @return - [Hinge loss](https://towardsdatascience.com/support-vector-machines-intuitive-understanding-part-1-3fb049df4ba1)
 *
 * @example
 * let myNetwork = new Network(5, 5);
 * myNetwork.train(trainingData, {
 *   log: 1,
 *   iterations: 500,
 *   error: 0.03,
 *   rate: 0.05,
 *   loss: new HINGELoss()
 * });
 */
class HINGELoss extends Loss {
    public calc(targets: number[], outputs: number[]): number {
        let error: number = 0;
        outputs.forEach((value, index) => {
            error += Math.max(0, 1 - value * targets[index]);
        });
        return error / outputs.length;
    }
}

const ALL_LOSSES: Loss[] = [
    new CrossEntropyLoss(),
    new MSELoss(),
    new BinaryLoss(),
    new MAELoss(),
    new MAPELoss(),
    new WAPELoss(),
    new MSLELoss(),
    new HINGELoss()
];

export {
    ALL_LOSSES,
    Loss,
    CrossEntropyLoss,
    MSELoss,
    BinaryLoss,
    MAELoss,
    MAPELoss,
    WAPELoss,
    MSLELoss,
    HINGELoss
};
