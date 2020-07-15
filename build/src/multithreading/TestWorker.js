"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("threads/worker");
const Network_1 = require("../architecture/Network");
const Loss_1 = require("../methods/Loss");
const testWorker = (serializedDataSet, jsonNetwork, lossIndex) => {
    return Network_1.Network.fromJSON(JSON.parse(jsonNetwork)).test(JSON.parse(serializedDataSet), Object.values(Loss_1.ALL_LOSSES)[lossIndex]);
};
worker_1.expose(testWorker);
