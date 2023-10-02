import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  Prospecting,
  ProspectingMethodNames,
  ProspectingEventsContext,
  ProspectingEvents
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
export type ProspectingEvents =
  | 'OwnershipTransferred'
  | 'ProspectingOrderCompleted'
  | 'ProspectingOrderPlaced'
  | 'ProspectingOrderSpedUp'
  | 'RandomBiomodMinted';
export interface ProspectingEventsContext {
  OwnershipTransferred(...parameters: any): EventFilter;
  ProspectingOrderCompleted(...parameters: any): EventFilter;
  ProspectingOrderPlaced(...parameters: any): EventFilter;
  ProspectingOrderSpedUp(...parameters: any): EventFilter;
  RandomBiomodMinted(...parameters: any): EventFilter;
}
export type ProspectingMethodNames =
  | 'IXTSpeedUpOrder'
  | 'baseLevelAddress'
  | 'claimBatchOrder'
  | 'claimOrder'
  | 'getFeeWallet'
  | 'getIAssetManager'
  | 'getModerator'
  | 'getOrders'
  | 'getProspectingMaxOrders'
  | 'getProspectingPrice'
  | 'getProspectingTime'
  | 'getProspectingWeights'
  | 'getProspectorTax'
  | 'getSpeedupCost'
  | 'getSpeedupTime'
  | 'initialize'
  | 'isPaused'
  | 'nextOrderId'
  | 'orderAutomation'
  | 'owner'
  | 'pixt'
  | 'pixtSpeedupCost'
  | 'pixtSpeedupSplitBps'
  | 'placeProspectingOrders'
  | 'renounceOwnership'
  | 's_biomodTypes'
  | 's_biomodWeights'
  | 's_boostedBiomodWeights'
  | 's_prospectingTime'
  | 's_prospectorFee'
  | 's_prospectorMaxOrders'
  | 's_prospectorTax'
  | 's_randNonce'
  | 's_speedupCost'
  | 's_speedupTime'
  | 's_totalBiomodWeights'
  | 's_totalBoostedBiomodWeights'
  | 'setBaseLevelAddress'
  | 'setBiomodWeights'
  | 'setBoostedBiomodWeights'
  | 'setCrosschainServices'
  | 'setFeeWallet'
  | 'setIAssetManager'
  | 'setIXTSpeedUpParams'
  | 'setModerator'
  | 'setNextOrderId'
  | 'setOracle'
  | 'setOrderAutomation'
  | 'setPaused'
  | 'setProspectingPrice'
  | 'setProspectingTime'
  | 'setProspectorTax'
  | 'setSpeedupCost'
  | 'setSpeedupTime'
  | 'speedUpOrder'
  | 'speedupAllAC'
  | 'speedupAllIXT'
  | 'transferOwnership';
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface ProspectingOrderCompletedEventEmittedResponse {
  player: string;
  id: BigNumberish;
}
export interface ProspectingOrderPlacedEventEmittedResponse {
  player: string;
  amount: BigNumberish;
}
export interface ProspectingOrderSpedUpEventEmittedResponse {
  player: string;
  amount: BigNumberish;
  orderId: BigNumberish;
}
export interface RandomBiomodMintedEventEmittedResponse {
  player: string;
  tokenId: BigNumberish;
  orderId: BigNumberish;
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
export interface Prospecting {
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
  baseLevelAddress(overrides?: ContractCallOverrides): Promise<string>;
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
   */
  getFeeWallet(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getIAssetManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getModerator(overrides?: ContractCallOverrides): Promise<string>;
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
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getProspectingMaxOrders(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getProspectingPrice(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getProspectingTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getProspectingWeights(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getProspectorTax(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getSpeedupCost(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getSpeedupTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _feeWallet Type: address, Indexed: false
   * @param _prospectorFee Type: uint256, Indexed: false
   * @param _prospectingTime Type: uint256, Indexed: false
   * @param _prospectingMaxOrders Type: uint256, Indexed: false
   * @param _speedupTime Type: uint256, Indexed: false
   * @param _speedupCost Type: uint256, Indexed: false
   * @param _prospectingTax Type: uint256, Indexed: false
   */
  initialize(
    _feeWallet: string,
    _prospectorFee: BigNumberish,
    _prospectingTime: BigNumberish,
    _prospectingMaxOrders: BigNumberish,
    _speedupTime: BigNumberish,
    _speedupCost: BigNumberish,
    _prospectingTax: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  isPaused(overrides?: ContractCallOverrides): Promise<boolean>;
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
  orderAutomation(overrides?: ContractCallOverrides): Promise<string>;
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _numOrders Type: uint256, Indexed: false
   */
  placeProspectingOrders(
    _numOrders: BigNumberish,
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
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  s_biomodTypes(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  s_biomodWeights(
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
  s_boostedBiomodWeights(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_prospectingTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_prospectorFee(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_prospectorMaxOrders(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_prospectorTax(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_randNonce(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_speedupCost(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_speedupTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_totalBiomodWeights(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_totalBoostedBiomodWeights(
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
   * @param _biomodTypes Type: uint8[], Indexed: false
   * @param _biomodWeights Type: uint256[], Indexed: false
   */
  setBiomodWeights(
    _biomodTypes: BigNumberish[],
    _biomodWeights: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _boostedBiomodWeights Type: uint256[], Indexed: false
   */
  setBoostedBiomodWeights(
    _boostedBiomodWeights: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _crosschainServices Type: address, Indexed: false
   */
  setCrosschainServices(
    _crosschainServices: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _feeWallet Type: address, Indexed: false
   */
  setFeeWallet(
    _feeWallet: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _iAssetManager Type: address, Indexed: false
   */
  setIAssetManager(
    _iAssetManager: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixt Type: address, Indexed: false
   * @param _beneficiary Type: address, Indexed: false
   * @param _pixtSpeedupSplitBps Type: uint256, Indexed: false
   * @param _pixtSpeedupCost Type: uint256, Indexed: false
   */
  setIXTSpeedUpParams(
    _pixt: string,
    _beneficiary: string,
    _pixtSpeedupSplitBps: BigNumberish,
    _pixtSpeedupCost: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _moderator Type: address, Indexed: false
   */
  setModerator(
    _moderator: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _orderId Type: uint256, Indexed: false
   */
  setNextOrderId(
    _orderId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _oracle Type: address, Indexed: false
   */
  setOracle(
    _oracle: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _orderAutomation Type: address, Indexed: false
   */
  setOrderAutomation(
    _orderAutomation: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _isPaused Type: bool, Indexed: false
   */
  setPaused(
    _isPaused: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param price Type: uint256, Indexed: false
   */
  setProspectingPrice(
    price: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _prospectingTime Type: uint256, Indexed: false
   */
  setProspectingTime(
    _prospectingTime: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tax Type: uint16, Indexed: false
   */
  setProspectorTax(
    _tax: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _speedupCost Type: uint256, Indexed: false
   */
  setSpeedupCost(
    _speedupCost: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _speedupTime Type: uint256, Indexed: false
   */
  setSpeedupTime(
    _speedupTime: BigNumberish,
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _numSpeedUps Type: uint256, Indexed: false
   */
  speedupAllAC(
    _numSpeedUps: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _numSpeedUps Type: uint256, Indexed: false
   */
  speedupAllIXT(
    _numSpeedUps: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
