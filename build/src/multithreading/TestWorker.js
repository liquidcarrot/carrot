"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_1 = require("threads/worker");
var Network_1 = require("../architecture/Network");
var Loss_1 = require("../methods/Loss");
var testWorker = function (serializedDataSet, jsonNetwork, lossIndex) {
    return Network_1.Network.fromJSON(JSON.parse(jsonNetwork)).test(JSON.parse(serializedDataSet), Object.values(Loss_1.ALL_LOSSES)[lossIndex]);
};
worker_1.expose(testWorker);
