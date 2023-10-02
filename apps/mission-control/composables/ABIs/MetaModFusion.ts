import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  MetaModFusion,
  MetaModFusionMethodNames,
  MetaModFusionEventsContext,
  MetaModFusionEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type MetaModFusionEvents =
  | 'ClaimOrder'
  | 'OwnershipTransferred'
  | 'PlaceMetamodFusionOrder'
  | 'SpeedUpOrder'
  | 'SpeedUpOrderIXT';
export interface MetaModFusionEventsContext {
  ClaimOrder(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PlaceMetamodFusionOrder(...parameters: any): EventFilter;
  SpeedUpOrder(...parameters: any): EventFilter;
  SpeedUpOrderIXT(...parameters: any): EventFilter;
}
export type MetaModFusionMethodNames =
  | 'IXTSpeedUpOrder'
  | 'acSpeedupCost'
  | 'assetManager'
  | 'claimBatchOrder'
  | 'claimOrder'
  | 'costTokenAmounts'
  | 'costTokenIds'
  | 'currentFusionOrder'
  | 'fusionOrderTime'
  | 'fusionOrders'
  | 'getOrders'
  | 'initialize'
  | 'metamodFusionAmount'
  | 'nextOrderId'
  | 'owner'
  | 'pixt'
  | 'pixtSpeedupCost'
  | 'pixtSpeedupSplitBps'
  | 'pixtSpeedupSplitBpsDenominator'
  | 'placeFusionOrder'
  | 'renounceOwnership'
  | 'setAssetManagerAddress'
  | 'setBaseLevelAddress'
  | 'setFusionCost'
  | 'setIXTSpeedUpParams'
  | 'setMetamodFusionAmount'
  | 'setSpeedUpParams'
  | 'speedUpOrder'
  | 'speedupTime'
  | 'transferOwnership';
export interface ClaimOrderEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PlaceMetamodFusionOrderEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
}
export interface SpeedUpOrderEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
  numSpeedUps: BigNumberish;
}
export interface SpeedUpOrderIXTEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
  numSpeedUps: BigNumberish;
}
export interface FusionOrdersResponse {
  orderId: BigNumber;
  0: BigNumber;
  orderAmount: BigNumber;
  1: BigNumber;
  createdAt: BigNumber;
  2: BigNumber;
  speedUpDeductedAmount: BigNumber;
  3: BigNumber;
  totalCompletionTime: BigNumber;
  4: BigNumber;
  length: 5;
}
export interface OrderResponse {
  orderId: BigNumber;
  0: BigNumber;
  orderAmount: BigNumber;
  1: BigNumber;
  createdAt: BigNumber;
  2: BigNumber;
  speedUpDeductedAmount: BigNumber;
  3: BigNumber;
  totalCompletionTime: BigNumber;
  4: BigNumber;
}
export interface MetaModFusion {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _numSpeedUps Type: uint256, Indexed: false
   * @param _orderId Type: uint256, Indexed: false
   */
  IXTSpeedUpOrder(
    _numSpeedUps: BigNumberish,
    _orderId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  acSpeedupCost(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  assetManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  claimBatchOrder(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _orderId Type: uint256, Indexed: false
   */
  claimOrder(
    _orderId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  costTokenAmounts(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  costTokenIds(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  currentFusionOrder(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  fusionOrderTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  fusionOrders(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<FusionOrdersResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _player Type: address, Indexed: false
   */
  getOrders(
    _player: string,
    overrides?: ContractCallOverrides
  ): Promise<OrderResponse[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _assetManager Type: address, Indexed: false
   * @param _pixt Type: address, Indexed: false
   */
  initialize(
    _assetManager: string,
    _pixt: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  metamodFusionAmount(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  nextOrderId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pixt(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pixtSpeedupCost(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pixtSpeedupSplitBps(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pixtSpeedupSplitBpsDenominator(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  placeFusionOrder(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _assetManagerAddress Type: address, Indexed: false
   */
  setAssetManagerAddress(
    _assetManagerAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _baseLevelAddress Type: address, Indexed: false
   */
  setBaseLevelAddress(
    _baseLevelAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _costTokenIds Type: uint256[], Indexed: false
   * @param _costTokenAmounts Type: uint256[], Indexed: false
   */
  setFusionCost(
    _costTokenIds: BigNumberish[],
    _costTokenAmounts: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixt Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param _pixtSpeedupSplitBps Type: uint256, Indexed: false
   * @param _pixtSpeedupCost Type: uint256, Indexed: false
   */
  setIXTSpeedUpParams(
    _pixt: string,
    parameter1: string,
    _pixtSpeedupSplitBps: BigNumberish,
    _pixtSpeedupCost: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _metamodFusionAmount Type: uint256, Indexed: false
   */
  setMetamodFusionAmount(
    _metamodFusionAmount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _speedupTime Type: uint256, Indexed: false
   * @param _acSpeedupCost Type: uint256, Indexed: false
   */
  setSpeedUpParams(
    _speedupTime: BigNumberish,
    _acSpeedupCost: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _numSpeedUps Type: uint256, Indexed: false
   * @param _orderId Type: uint256, Indexed: false
   */
  speedUpOrder(
    _numSpeedUps: BigNumberish,
    _orderId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  speedupTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(
    newOwner: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
