import {DenseLayer} from "../src/architecture/Layers/CoreLayers/DenseLayer";
import {Node} from "../src/architecture/Node";
import {DropoutLayer} from "../src/architecture/Layers/CoreLayers/DropoutLayer";
import {NoiseLayer} from "../src/architecture/Layers/NoiseLayers/NoiseLayer";
import {OutputLayer} from "../src/architecture/Layers/CoreLayers/OutputLayer";
import {InputLayer} from "../src/architecture/Layers/CoreLayers/InputLayer";
import {AvgPooling1DLayer} from "../src/architecture/Layers/PoolingLayers/AvgPooling1DLayer";
import {MinPooling1DLayer} from "../src/architecture/Layers/PoolingLayers/MinPooling1DLayer";
import {MaxPooling1DLayer} from "../src/architecture/Layers/PoolingLayers/MaxPooling1DLayer";
import {GlobalAvgPooling1DLayer} from "../src/architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer";
import {GlobalMaxPooling1DLayer} from "../src/architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer";
import {GlobalMinPooling1DLayer} from "../src/architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer";
import {PoolingLayer} from "../src/architecture/Layers/PoolingLayers/PoolingLayer";
import {GRULayer} from "../src/architecture/Layers/RecurrentLayers/GRULayer";
import {LSTMLayer} from "../src/architecture/Layers/RecurrentLayers/LSTMLayer";
import {MemoryLayer} from "../src/architecture/Layers/RecurrentLayers/MemoryLayer";
import {Layer} from "../src/architecture/Layers/Layer";
import {ConstantNode} from "../src/architecture/Nodes/ConstantNode";
import {DropoutNode} from "../src/architecture/Nodes/DropoutNode";
import {NoiseNode} from "../src/architecture/Nodes/NoiseNode";
import {PoolNode} from "../src/architecture/Nodes/PoolNode";
import {Architect} from "../src/architecture/Architect";
import {Connection} from "../src/architecture/Connection";
import {Network} from "../src/architecture/Network";
import {ActivationType} from "../src/enums/ActivationType";
import {ConnectionType} from "../src/enums/ConnectionType";
import {GatingType} from "../src/enums/GatingType";
import {NodeType, NoiseNodeType, PoolNodeType} from "../src/enums/NodeType";
import {ConnectionJSON} from "../src/interfaces/ConnectionJSON";
import {EvolveOptions} from "../src/interfaces/EvolveOptions";
import {NetworkJSON} from "../src/interfaces/NetworkJSON";
import {DropoutNodeJSON, NodeJSON, PoolNodeJSON} from "../src/interfaces/NodeJSON";
import {TrainOptions} from "../src/interfaces/TrainOptions";
import {
    AbsoluteActivation,
    Activation,
    ALL_ACTIVATIONS,
    BentIdentityActivation,
    BipolarActivation,
    BipolarSigmoidActivation,
    GaussianActivation,
    HardTanhActivation,
    IdentityActivation,
    InverseActivation,
    LogisticActivation,
    RELUActivation,
    SELUActivation,
    SinusoidActivation,
    SoftSignActivation,
    StepActivation,
    TanhActivation
} from "../src/methods/Activation";
import {
    ALL_LOSSES,
    BinaryLoss,
    CrossEntropyLoss,
    HINGELoss,
    Loss,
    MAELoss,
    MAPELoss,
    MSELoss,
    MSLELoss,
    WAPELoss
} from "../src/methods/Loss";
import {
    AddBackConnectionMutation,
    AddConnectionMutation,
    AddGateMutation,
    AddNodeMutation,
    AddSelfConnectionMutation,
    ALL_MUTATIONS,
    FEEDFORWARD_MUTATIONS,
    ModActivationMutation,
    ModBiasMutation,
    ModWeightMutation,
    Mutation,
    NO_STRUCTURE_MUTATIONS,
    ONLY_STRUCTURE,
    SubBackConnectionMutation,
    SubConnectionMutation,
    SubGateMutation,
    SubNodeMutation,
    SubSelfConnectionMutation,
    SwapNodesMutation,
} from "../src/methods/Mutation";
import {ExponentialRate, FixedRate, InverseRate, Rate, StepRate} from "../src/methods/Rate";
import {FitnessProportionateSelection, PowerSelection, Selection, TournamentSelection} from "../src/methods/Selection";
import {
    avg,
    generateGaussian,
    getOrDefault,
    max,
    maxValueIndex,
    min,
    minValueIndex,
    pickRandom,
    randBoolean,
    randDouble,
    randInt,
    removeFromArray,
    shuffle,
    sum
} from "../src/methods/Utils";

// TODO this could be more beautiful and also dynamic
export {
    DenseLayer,
    DropoutLayer,
    InputLayer,
    OutputLayer,
    NoiseLayer,
    AvgPooling1DLayer,
    MinPooling1DLayer,
    MaxPooling1DLayer,
    GlobalAvgPooling1DLayer,
    GlobalMinPooling1DLayer,
    GlobalMaxPooling1DLayer,
    PoolingLayer,
    GRULayer,
    LSTMLayer,
    MemoryLayer,
    Layer,
    ConstantNode,
    DropoutNode,
    NoiseNode,
    PoolNode,
    Architect,
    Connection,
    Network,
    Node,
    ActivationType,
    ConnectionType,
    GatingType,
    NodeType,
    PoolNodeType,
    NoiseNodeType,
    ConnectionJSON,
    EvolveOptions,
    NetworkJSON,
    NodeJSON,
    PoolNodeJSON,
    DropoutNodeJSON,
    TrainOptions,
    ALL_ACTIVATIONS,
    Activation,
    LogisticActivation,
    TanhActivation,
    IdentityActivation,
    StepActivation,
    RELUActivation,
    SoftSignActivation,
    SinusoidActivation,
    GaussianActivation,
    BentIdentityActivation,
    BipolarActivation,
    BipolarSigmoidActivation,
    HardTanhActivation,
    AbsoluteActivation,
    InverseActivation,
    SELUActivation,
    ALL_LOSSES,
    Loss,
    CrossEntropyLoss,
    MSELoss,
    BinaryLoss,
    MAELoss,
    MAPELoss,
    WAPELoss,
    MSLELoss,
    HINGELoss,
    ALL_MUTATIONS,
    FEEDFORWARD_MUTATIONS,
    NO_STRUCTURE_MUTATIONS,
    ONLY_STRUCTURE,
    Mutation,
    AddNodeMutation,
    SubNodeMutation,
    AddConnectionMutation,
    SubConnectionMutation,
    ModWeightMutation,
    ModBiasMutation,
    ModActivationMutation,
    AddGateMutation,
    SubGateMutation,
    AddSelfConnectionMutation,
    SubSelfConnectionMutation,
    AddBackConnectionMutation,
    SubBackConnectionMutation,
    SwapNodesMutation,
    Rate,
    FixedRate,
    StepRate,
    ExponentialRate,
    InverseRate,
    Selection,
    FitnessProportionateSelection,
    PowerSelection,
    TournamentSelection,
    pickRandom,
    randInt,
    randDouble,
    randBoolean,
    removeFromArray,
    getOrDefault,
    shuffle,
    max,
    maxValueIndex,
    minValueIndex,
    min,
    sum,
    avg,
    generateGaussian
};
