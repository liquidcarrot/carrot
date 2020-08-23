import { Architect } from "./architecture/Architect";
import { Connection } from "./architecture/Connection";
import { ActivationLayer } from "./architecture/Layers/CoreLayers/ActivationLayer";
import { DenseLayer } from "./architecture/Layers/CoreLayers/DenseLayer";
import { DropoutLayer } from "./architecture/Layers/CoreLayers/DropoutLayer";
import { InputLayer } from "./architecture/Layers/CoreLayers/InputLayer";
import { OutputLayer } from "./architecture/Layers/CoreLayers/OutputLayer";
import { Layer } from "./architecture/Layers/Layer";
import { NoiseLayer } from "./architecture/Layers/NoiseLayers/NoiseLayer";
import { AvgPooling1DLayer } from "./architecture/Layers/PoolingLayers/AvgPooling1DLayer";
import { GlobalAvgPooling1DLayer } from "./architecture/Layers/PoolingLayers/GlobalAvgPooling1DLayer";
import { GlobalMaxPooling1DLayer } from "./architecture/Layers/PoolingLayers/GlobalMaxPooling1DLayer";
import { GlobalMinPooling1DLayer } from "./architecture/Layers/PoolingLayers/GlobalMinPooling1DLayer";
import { MaxPooling1DLayer } from "./architecture/Layers/PoolingLayers/MaxPooling1DLayer";
import { MinPooling1DLayer } from "./architecture/Layers/PoolingLayers/MinPooling1DLayer";
import { PoolingLayer } from "./architecture/Layers/PoolingLayers/PoolingLayer";
import { GRULayer } from "./architecture/Layers/RecurrentLayers/GRULayer";
import { HopfieldLayer } from "./architecture/Layers/RecurrentLayers/HopfieldLayer";
import { LSTMLayer } from "./architecture/Layers/RecurrentLayers/LSTMLayer";
import { MemoryLayer } from "./architecture/Layers/RecurrentLayers/MemoryLayer";
import { RNNLayer } from "./architecture/Layers/RecurrentLayers/RNNLayer";
import { Network } from "./architecture/Network";
import { Node } from "./architecture/Node";
import { ConstantNode } from "./architecture/Nodes/ConstantNode";
import { DropoutNode } from "./architecture/Nodes/DropoutNode";
import { NoiseNode } from "./architecture/Nodes/NoiseNode";
import { PoolNode } from "./architecture/Nodes/PoolNode";
import { Species } from "./architecture/Species";
import { ConnectionType } from "./enums/ConnectionType";
import { GatingType } from "./enums/GatingType";
import { NodeType, PoolNodeType } from "./enums/NodeType";
import { ConnectionJSON } from "./interfaces/ConnectionJSON";
import { EvolveOptions } from "./interfaces/EvolveOptions";
import { NetworkJSON } from "./interfaces/NetworkJSON";
import { DropoutNodeJSON, NodeJSON, PoolNodeJSON } from "./interfaces/NodeJSON";
import { TrainOptions } from "./interfaces/TrainOptions";
import {
  ALL_LOSSES,
  BinaryLoss,
  HINGELoss,
  MAELoss,
  MAPELoss,
  MBELoss,
  MSELoss,
  MSLELoss,
  WAPELoss,
} from "./methods/Loss";
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
} from "./methods/Mutation";
import { ExponentialRate, FixedRate, InverseRate, Rate, StepRate } from "./methods/Rate";
import { FitnessProportionateSelection, PowerSelection, Selection, TournamentSelection } from "./methods/Selection";
import {
  avg,
  generateGaussian,
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
  sum,
} from "./utils/Utils";
import { InstinctPopulation } from "./population/InstinctPopulation";
import { NEATPopulation } from "./population/NEATPopulation";
import { Population } from "./population/Population";

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
  ActivationLayer,
  HopfieldLayer,
  RNNLayer,
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
  Species,
  Node,
  ConnectionType,
  GatingType,
  NodeType,
  PoolNodeType,
  ConnectionJSON,
  EvolveOptions,
  NetworkJSON,
  NodeJSON,
  PoolNodeJSON,
  DropoutNodeJSON,
  TrainOptions,
  ALL_LOSSES,
  MSELoss,
  MBELoss,
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
  shuffle,
  max,
  maxValueIndex,
  minValueIndex,
  min,
  sum,
  avg,
  generateGaussian,
  Population,
  NEATPopulation,
  InstinctPopulation,
};
