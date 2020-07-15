"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const ParcelBundler = require("parcel-bundler");
// tslint:disable-next-line:completed-docs
function runBuild(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const entry = path.resolve(__dirname, '../build/scripts/index.js');
        yield new ParcelBundler(entry, options).bundle();
    });
}
const browserProduction = {
    outDir: path.resolve(__dirname, '../dist/production'),
    outFile: path.resolve(__dirname, '../dist/production/index.browser.min.js'),
    minify: true,
    watch: false,
    target: 'browser',
    bundleNodeModules: true,
    global: 'carrot',
};
const browserDev = {
    outDir: path.resolve(__dirname, '../dist/dev'),
    outFile: path.resolve(__dirname, '../dist/dev/index.browser.js'),
    minify: false,
    watch: true,
    target: 'browser',
    bundleNodeModules: true,
    global: 'carrot',
};
const nodeProduction = {
    outDir: path.resolve(__dirname, '../dist/production'),
    outFile: path.resolve(__dirname, '../dist/production/index.min.js'),
    minify: true,
    watch: false,
    target: "node",
    global: 'carrot',
};
const nodeDev = {
    outDir: path.resolve(__dirname, '../dist/dev'),
    outFile: path.resolve(__dirname, '../dist/dev/index.js'),
    minify: false,
    watch: true,
    target: "node",
    global: 'carrot',
};
Promise.all([
    runBuild(browserProduction),
    runBuild(browserDev),
    runBuild(nodeProduction),
    runBuild(nodeDev)
])
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
