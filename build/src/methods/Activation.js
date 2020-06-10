"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_ACTIVATIONS = exports.MISHActivation = exports.SELUActivation = exports.InverseActivation = exports.AbsoluteActivation = exports.HardTanhActivation = exports.BipolarSigmoidActivation = exports.BipolarActivation = exports.BentIdentityActivation = exports.GaussianActivation = exports.SinusoidActivation = exports.SoftSignActivation = exports.RELUActivation = exports.StepActivation = exports.IdentityActivation = exports.TanhActivation = exports.LogisticActivation = void 0;
exports.LogisticActivation = function (x, derivative) {
    if (!derivative) {
        return 1 / (1 + Math.exp(-x));
    }
    else {
        return exports.LogisticActivation(x, false) * (1 - exports.LogisticActivation(x, false));
    }
};
exports.TanhActivation = function (x, derivative) {
    if (!derivative) {
        return Math.tanh(x);
    }
    else {
        return 1 - Math.pow(exports.TanhActivation(x, false), 2);
    }
};
exports.IdentityActivation = function (x, derivative) {
    if (!derivative) {
        return x;
    }
    else {
        return 1;
    }
};
exports.StepActivation = function (x, derivative) {
    if (!derivative) {
        return x < 0 ? 0 : 1;
    }
    else {
        return 0;
    }
};
exports.RELUActivation = function (x, derivative) {
    if (!derivative) {
        return x > 0 ? x : 0;
    }
    else {
        return x <= 0 ? 0 : 1;
    }
};
exports.SoftSignActivation = function (x, derivative) {
    if (!derivative) {
        return x / (1 + Math.abs(x));
    }
    else {
        return x / ((1 + Math.abs(x)) * (1 + Math.abs(x)));
    }
};
exports.SinusoidActivation = function (x, derivative) {
    if (!derivative) {
        return Math.sin(x);
    }
    else {
        return Math.cos(x);
    }
};
exports.GaussianActivation = function (x, derivative) {
    if (!derivative) {
        return Math.exp(-x * x);
    }
    else {
        return -2 * x * exports.GaussianActivation(x, false);
    }
};
exports.BentIdentityActivation = function (x, derivative) {
    if (!derivative) {
        return (Math.sqrt(x * x + 1) - 1) / 2 + x;
    }
    else {
        return x / (2 * Math.sqrt(x * x + 1)) + 1;
    }
};
exports.BipolarActivation = function (x, derivative) {
    if (!derivative) {
        return x > 0 ? 1 : -1;
    }
    else {
        return 0;
    }
};
exports.BipolarSigmoidActivation = function (x, derivative) {
    if (!derivative) {
        return 2 / (1 + Math.exp(-x)) - 1;
    }
    else {
        return (2 * Math.exp(-x)) / ((1 + Math.exp(-x)) * (1 + Math.exp(-x)));
    }
};
exports.HardTanhActivation = function (x, derivative) {
    if (!derivative) {
        return Math.max(-1, Math.min(1, x));
    }
    else {
        return Math.abs(x) < 1 ? 1 : 0;
    }
};
exports.AbsoluteActivation = function (x, derivative) {
    if (!derivative) {
        return Math.abs(x);
    }
    else {
        return x < 0 ? -1 : 1;
    }
};
exports.InverseActivation = function (x, derivative) {
    if (!derivative) {
        return 1 - x;
    }
    else {
        return -1;
    }
};
exports.SELUActivation = function (x, derivative) {
    var alpha = 1.6732632423543772848170429916717; // this is bad
    var scale = 1.0507009873554804934193349852946; // this is bad
    if (!derivative) {
        if (x > 0) {
            return x * scale;
        }
        else {
            return (alpha * Math.exp(x) - alpha) * scale;
        }
    }
    else {
        if (x > 0) {
            return scale;
        }
        else {
            return alpha * Math.exp(x) * scale;
        }
    }
};
exports.MISHActivation = function (x, derivative) {
    var ex = Math.exp(x);
    if (derivative) {
        var w = ex * ex * ex + 4 * (ex * ex + x * ex + x + 1) + 6 * ex;
        var d = 2 * ex + ex * ex + 2;
        return ex * w / (d * d);
    }
    else {
        return x * Math.tanh(Math.log(1 + ex));
    }
};
exports.ALL_ACTIVATIONS = {
    LogisticActivation: exports.LogisticActivation,
    TanhActivation: exports.TanhActivation,
    IdentityActivation: exports.IdentityActivation,
    StepActivation: exports.StepActivation,
    RELUActivation: exports.RELUActivation,
    SoftSignActivation: exports.SoftSignActivation,
    SinusoidActivation: exports.SinusoidActivation,
    GaussianActivation: exports.GaussianActivation,
    BentIdentityActivation: exports.BentIdentityActivation,
    BipolarActivation: exports.BipolarActivation,
    BipolarSigmoidActivation: exports.BipolarSigmoidActivation,
    HardTanhActivation: exports.HardTanhActivation,
    AbsoluteActivation: exports.AbsoluteActivation,
    InverseActivation: exports.InverseActivation,
    SELUActivation: exports.SELUActivation,
    MISHActivation: exports.MISHActivation
};
