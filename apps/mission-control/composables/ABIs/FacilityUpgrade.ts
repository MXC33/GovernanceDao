import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  FacilityUpgrade,
  FacilityUpgradeMethodNames,
  FacilityUpgradeEventsContext,
  FacilityUpgradeEvents
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
export type FacilityUpgradeEvents =
  | 'ClaimOrder'
  | 'FacilityUpgradeFinished'
  | 'OwnershipTransferred'
  | 'PlaceFacilityUpgradeOrder'
  | 'SpeedUpCooldown'
  | 'SpeedUpOrder';
export interface FacilityUpgradeEventsContext {
  ClaimOrder(...parameters: any): EventFilter;
  FacilityUpgradeFinished(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PlaceFacilityUpgradeOrder(...parameters: any): EventFilter;
  SpeedUpCooldown(...parameters: any): EventFilter;
  SpeedUpOrder(...parameters: any): EventFilter;
}
export type FacilityUpgradeMethodNames =
  | 'IXTSpeedUpOrder'
  | 'assetLevel'
  | 'assetManager'
  | 'baseLevel'
  | 'calcExponentDoubleUpgradeChance'
  | 'claimBatchOrder'
  | 'claimOrder'
  | 'cooldownEndTimestamp'
  | 'cooldownSpeedupCost'
  | 'cooldownSpeedupTime'
  | 'cooldownTimePerLevel'
  | 'currentUpgradeOrder'
  | 'doubleUpgradeChanceDenominator'
  | 'doubleUpgradeChanceForEnergy'
  | 'fulfillRandomWords'
  | 'getLevelUpgradeCost'
  | 'getOrders'
  | 'initialize'
  | 'maxOrders'
  | 'minBaseLevel'
  | 'nextOrderId'
  | 'orderForRequest'
  | 'owner'
  | 'pixt'
  | 'pixtSpeedupCost'
  | 'pixtSpeedupSplitBps'
  | 'pixtSpeedupSplitBpsDenominator'
  | 'placeFacilityUpgradeOrder'
  | 'renounceOwnership'
  | 'setAssetManagerAddress'
  | 'setBaseLevelAddress'
  | 'setCooldownParams'
  | 'setDoubleUpgradeChanceForEnergy'
  | 'setFacilityParams'
  | 'setIXTSpeedUpParams'
  | 'setLevelUpgradeCost'
  | 'setSpeedUpTime'
  | 'setVRFManager'
  | 'speedUpCooldown'
  | 'speedUpOrder'
  | 'speedupTime'
  | 'transferOwnership'
  | 'upgradeToAssetId'
  | 'upgradingOrders'
  | 'upgradingTime'
  | 'vrfManager';
export interface ClaimOrderEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
  requestId: BigNumberish;
  cooldownEndTimestamp: BigNumberish;
}
export interface FacilityUpgradeFinishedEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
  upgradedFacilityId: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PlaceFacilityUpgradeOrderEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
  facilityTokenId: BigNumberish;
  orderDoubleUpgradeChance: BigNumberish;
}
export interface SpeedUpCooldownEventEmittedResponse {
  player: string;
  numSpeedUps: BigNumberish;
  cooldownEndtimestamp: BigNumberish;
}
export interface SpeedUpOrderEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
  numSpeedups: BigNumberish;
}
export interface UpgradecostResponse {
  tokenIds: BigNumber[];
  0: BigNumber[];
  amounts: BigNumber[];
  1: BigNumber[];
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
export interface SetLevelUpgradeCostRequest {
  tokenIds: BigNumberish[];
  amounts: BigNumberish[];
}
export interface BaseOrderResponse {
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
export interface UpgradingOrdersResponse {
  player: string;
  0: string;
  baseOrder: BaseOrderResponse;
  1: BaseOrderResponse;
  facilityTokenId: BigNumber;
  2: BigNumber;
  doubleUpgradeChance: BigNumber;
  3: BigNumber;
  vrfRequestId: BigNumber;
  4: BigNumber;
  length: 5;
}
export interface FacilityUpgrade {
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
   * @param parameter0 Type: uint256, Indexed: false
   */
  assetLevel(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  assetManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  baseLevel(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _maxEnergy Type: uint256, Indexed: false
   * @param _maxChanceParam Type: uint256, Indexed: false
   * @param _step Type: uint256, Indexed: false
   * @param _expCParam Type: uint256, Indexed: false
   */
  calcExponentDoubleUpgradeChance(
    _maxEnergy: BigNumberish,
    _maxChanceParam: BigNumberish,
    _step: BigNumberish,
    _expCParam: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * @param parameter0 Type: address, Indexed: false
   */
  cooldownEndTimestamp(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  cooldownSpeedupCost(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  cooldownSpeedupTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  cooldownTimePerLevel(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  currentUpgradeOrder(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  doubleUpgradeChanceDenominator(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  doubleUpgradeChanceForEnergy(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param requestId Type: uint256, Indexed: false
   * @param randomWords Type: uint256[], Indexed: false
   */
  fulfillRandomWords(
    requestId: BigNumberish,
    randomWords: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param level Type: uint256, Indexed: false
   */
  getLevelUpgradeCost(
    level: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<UpgradecostResponse>;
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
   * @param _assetManagerAddress Type: address, Indexed: false
   * @param _baseLevelAddress Type: address, Indexed: false
   * @param _vrfManagerAddress Type: address, Indexed: false
   * @param _pixt Type: address, Indexed: false
   */
  initialize(
    _assetManagerAddress: string,
    _baseLevelAddress: string,
    _vrfManagerAddress: string,
    _pixt: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  maxOrders(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  minBaseLevel(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   * @param parameter0 Type: uint256, Indexed: false
   */
  orderForRequest(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
   * @param _facilityTokenId Type: uint256, Indexed: false
   * @param _additionalEnergy Type: uint256, Indexed: false
   */
  placeFacilityUpgradeOrder(
    _facilityTokenId: BigNumberish,
    _additionalEnergy: BigNumberish,
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
   * @param _cooldownTimePerLevel Type: uint256, Indexed: false
   * @param _cooldownSpeedupCost Type: uint256, Indexed: false
   * @param _cooldownSpeedupTime Type: uint256, Indexed: false
   */
  setCooldownParams(
    _cooldownTimePerLevel: BigNumberish,
    _cooldownSpeedupCost: BigNumberish,
    _cooldownSpeedupTime: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _energy Type: uint256, Indexed: false
   * @param _chance Type: uint256, Indexed: false
   */
  setDoubleUpgradeChanceForEnergy(
    _energy: BigNumberish,
    _chance: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param assetIds Type: uint256[], Indexed: false
   * @param levels Type: uint256[], Indexed: false
   * @param upgradeToAssetIds Type: uint256[], Indexed: false
   */
  setFacilityParams(
    assetIds: BigNumberish[],
    levels: BigNumberish[],
    upgradeToAssetIds: BigNumberish[],
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
   * @param level Type: uint256, Indexed: false
   * @param costParams Type: tuple, Indexed: false
   */
  setLevelUpgradeCost(
    level: BigNumberish,
    costParams: SetLevelUpgradeCostRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _speedUpTime Type: uint256, Indexed: false
   */
  setSpeedUpTime(
    _speedUpTime: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _vrfManagerAddress Type: address, Indexed: false
   */
  setVRFManager(
    _vrfManagerAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _numSpeedUps Type: uint256, Indexed: false
   */
  speedUpCooldown(
    _numSpeedUps: BigNumberish,
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
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  upgradeToAssetId(
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
  upgradingOrders(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<UpgradingOrdersResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  upgradingTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  vrfManager(overrides?: ContractCallOverrides): Promise<string>;
}
