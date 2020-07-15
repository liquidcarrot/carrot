"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Network_1 = require("../../src/architecture/Network");
var EvolveOptions_1 = require("../../src/interfaces/EvolveOptions");
var TrainOptions_1 = require("../../src/interfaces/TrainOptions");
describe('Logic Gates', function () {
    var data = {
        NOT: [
            { input: [0], output: [1] },
            { input: [1], output: [0] },
        ],
        AND: [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [0] },
            { input: [1, 0], output: [0] },
            { input: [1, 1], output: [1] },
        ],
        OR: [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [1] },
        ],
        NAND: [
            { input: [0, 0], output: [1] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] },
        ],
        NOR: [
            { input: [0, 0], output: [1] },
            { input: [0, 1], output: [0] },
            { input: [1, 0], output: [0] },
            { input: [1, 1], output: [0] },
        ],
        XOR: [
            { input: [0, 0], output: [0] },
            { input: [0, 1], output: [1] },
            { input: [1, 0], output: [1] },
            { input: [1, 1], output: [0] },
        ],
        XNOR: [
            { input: [0, 0], output: [1] },
            { input: [0, 1], output: [0] },
            { input: [1, 0], output: [0] },
            { input: [1, 1], output: [1] },
        ],
    };
    it('[NOT] Network.train()', function () {
        var network = new Network_1.Network(1, 1);
        var initial = network.test(data.NOT);
        var options = new TrainOptions_1.TrainOptions(data.NOT);
        options.iterations = 20;
        network.train(options);
        var final = network.test(data.NOT);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[NOT] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, initial, options, final;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        network = new Network_1.Network(1, 1);
                        initial = network.test(data.NOT);
                        options = new EvolveOptions_1.EvolveOptions();
                        options.iterations = 20;
                        options.dataset = data.NOT;
                        return [4 /*yield*/, network.evolve(options)];
                    case 1:
                        _a.sent();
                        final = network.test(data.NOT);
                        chai_1.expect(final).to.be.at.most(initial);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('[AND] Network.train()', function () {
        var network = new Network_1.Network(2, 1);
        var initial = network.test(data.AND);
        var options = new TrainOptions_1.TrainOptions(data.AND);
        options.iterations = 20;
        network.train(options);
        var final = network.test(data.AND);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[AND] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, initial, options, final;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        network = new Network_1.Network(2, 1);
                        initial = network.test(data.AND);
                        options = new EvolveOptions_1.EvolveOptions();
                        options.iterations = 20;
                        options.dataset = data.AND;
                        return [4 /*yield*/, network.evolve(options)];
                    case 1:
                        _a.sent();
                        final = network.test(data.AND);
                        chai_1.expect(final).to.be.at.most(initial);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('[OR] Network.train()', function () {
        var network = new Network_1.Network(2, 1);
        var initial = network.test(data.OR);
        var options = new TrainOptions_1.TrainOptions(data.OR);
        options.iterations = 20;
        network.train(options);
        var final = network.test(data.OR);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[OR] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, initial, options, final;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        network = new Network_1.Network(2, 1);
                        initial = network.test(data.OR);
                        options = new EvolveOptions_1.EvolveOptions();
                        options.iterations = 20;
                        options.dataset = data.OR;
                        return [4 /*yield*/, network.evolve(options)];
                    case 1:
                        _a.sent();
                        final = network.test(data.OR);
                        chai_1.expect(final).to.be.at.most(initial);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('[NAND] Network.train()', function () {
        var network = new Network_1.Network(2, 1);
        var initial = network.test(data.NAND);
        var options = new TrainOptions_1.TrainOptions(data.NAND);
        options.iterations = 20;
        network.train(options);
        var final = network.test(data.NAND);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[NAND] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, initial, options, final;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        network = new Network_1.Network(2, 1);
                        initial = network.test(data.NAND);
                        options = new EvolveOptions_1.EvolveOptions();
                        options.iterations = 20;
                        options.dataset = data.NAND;
                        return [4 /*yield*/, network.evolve(options)];
                    case 1:
                        _a.sent();
                        final = network.test(data.NAND);
                        chai_1.expect(final).to.be.at.most(initial);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('[NOR] Network.train()', function () {
        var network = new Network_1.Network(2, 1);
        var initial = network.test(data.NOR);
        var options = new TrainOptions_1.TrainOptions(data.NOR);
        options.iterations = 20;
        network.train(options);
        var final = network.test(data.NOR);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[NOR] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, initial, options, final;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        network = new Network_1.Network(2, 1);
                        initial = network.test(data.NOR);
                        options = new EvolveOptions_1.EvolveOptions();
                        options.iterations = 20;
                        options.dataset = data.NOR;
                        return [4 /*yield*/, network.evolve(options)];
                    case 1:
                        _a.sent();
                        final = network.test(data.NOR);
                        chai_1.expect(final).to.be.at.most(initial);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('[XOR] Network.train()', function () {
        var network = new Network_1.Network(2, 1);
        var initial = network.test(data.XOR);
        var options = new TrainOptions_1.TrainOptions(data.XOR);
        options.iterations = 20;
        network.train(options);
        var final = network.test(data.XOR);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[XOR] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, initial, options, final;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        network = new Network_1.Network(2, 1);
                        initial = network.test(data.XOR);
                        options = new EvolveOptions_1.EvolveOptions();
                        options.iterations = 20;
                        options.dataset = data.XOR;
                        return [4 /*yield*/, network.evolve(options)];
                    case 1:
                        _a.sent();
                        final = network.test(data.XOR);
                        chai_1.expect(final).to.be.at.most(initial);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('[XNOR] Network.train()', function () {
        var network = new Network_1.Network(2, 1);
        var initial = network.test(data.XNOR);
        var options = new TrainOptions_1.TrainOptions(data.XNOR);
        options.iterations = 20;
        network.train(options);
        var final = network.test(data.XNOR);
        chai_1.expect(final).to.be.at.most(initial);
    });
    it('[XNOR] Network.evolve()', function () {
        return __awaiter(this, void 0, void 0, function () {
            var network, initial, options, final;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        network = new Network_1.Network(2, 1);
                        initial = network.test(data.XNOR);
                        options = new EvolveOptions_1.EvolveOptions();
                        options.iterations = 20;
                        options.dataset = data.XNOR;
                        return [4 /*yield*/, network.evolve(options)];
                    case 1:
                        _a.sent();
                        final = network.test(data.XNOR);
                        chai_1.expect(final).to.be.at.most(initial);
                        return [2 /*return*/];
                }
            });
        });
    });
});
