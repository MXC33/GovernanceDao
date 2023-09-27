import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  WasteTrader,
  WasteTraderMethodNames,
  WasteTraderEventsContext,
  WasteTraderEvents
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
export type WasteTraderEvents =
  | 'MintedMissionControl'
  | 'OwnershipTransferred'
  | 'WasteOrderCompleted'
  | 'WasteOrderPlaced'
  | 'WasteOrderSpedUp';
export interface WasteTraderEventsContext {
  MintedMissionControl(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  WasteOrderCompleted(...parameters: any): EventFilter;
  WasteOrderPlaced(...parameters: any): EventFilter;
  WasteOrderSpedUp(...parameters: any): EventFilter;
}
export type WasteTraderMethodNames =
  | 'MAXIMUM_BASIS_POINTS'
  | 'MINT_MESSAGE'
  | 'checkMintValidity'
  | 'claimBatchOrder'
  | 'claimOrder'
  | 'getExchangeRate'
  | 'getFeeWallet'
  | 'getGwsMax'
  | 'getGwsMinimumOrder'
  | 'getGwsSpeedupCost'
  | 'getGwsTax'
  | 'getGwsTime'
  | 'getIAssetManager'
  | 'getModerator'
  | 'getOrders'
  | 'getSigner'
  | 'getSpeedupTime'
  | 'initialize'
  | 'nextOrderId'
  | 'owner'
  | 'placeWasteOrder'
  | 'renounceOwnership'
  | 's_denominator'
  | 's_gwsMax'
  | 's_gwsMinimumOrder'
  | 's_gwsSpeedupCost'
  | 's_gwsTax'
  | 's_gwsTime'
  | 's_numerator'
  | 's_speedupTime'
  | 'setExchangeRate'
  | 'setFeeWallet'
  | 'setGwsMax'
  | 'setGwsMinimumOrder'
  | 'setGwsSpeedupCost'
  | 'setGwsTax'
  | 'setGwsTime'
  | 'setIAssetManager'
  | 'setModerator'
  | 'setSigner'
  | 'setSpeedupTime'
  | 'speedUpOrder'
  | 'IXTSpeedUpOrder'
  | 'transferOwnership';
export interface MintedMissionControlEventEmittedResponse {
  player: string;
  tokenId: BigNumberish;
  amount: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface WasteOrderCompletedEventEmittedResponse {
  player: string;
  orderId: BigNumberish;
}
export interface WasteOrderPlacedEventEmittedResponse {
  player: string;
  amount: BigNumberish;
}
export interface WasteOrderSpedUpEventEmittedResponse {
  player: string;
  amount: BigNumberish;
  orderId: BigNumberish;
}
export interface GetExchangeRateResponse {
  _numerator: BigNumber;
  0: BigNumber;
  _denominator: BigNumber;
  1: BigNumber;
  length: 2;
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
export interface WasteTrader {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAXIMUM_BASIS_POINTS(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MINT_MESSAGE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param hash Type: bytes32, Indexed: false
   * @param signature Type: bytes, Indexed: false
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param nonce Type: uint256, Indexed: false
   */
  checkMintValidity(
    hash: Arrayish,
    signature: Arrayish,
    to: string,
    amount: BigNumberish,
    nonce: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
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
  getExchangeRate(
    overrides?: ContractCallOverrides
  ): Promise<GetExchangeRateResponse>;
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
  getGwsMax(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getGwsMinimumOrder(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getGwsSpeedupCost(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getGwsTax(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getGwsTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
  getSigner(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param assetManagerImpl Type: address, Indexed: false
   * @param gwsWalletAddress Type: address, Indexed: false
   * @param numerator Type: uint256, Indexed: false
   * @param denominator Type: uint256, Indexed: false
   * @param gwsTime Type: uint256, Indexed: false
   * @param speedupTime Type: uint256, Indexed: false
   * @param gwsMinimumOrder Type: uint256, Indexed: false
   * @param gwsTax Type: uint256, Indexed: false
   * @param gwsMax Type: uint8, Indexed: false
   * @param gwsSpeedupCost Type: uint8, Indexed: false
   */
  initialize(
    assetManagerImpl: string,
    gwsWalletAddress: string,
    numerator: BigNumberish,
    denominator: BigNumberish,
    gwsTime: BigNumberish,
    speedupTime: BigNumberish,
    gwsMinimumOrder: BigNumberish,
    gwsTax: BigNumberish,
    gwsMax: BigNumberish,
    gwsSpeedupCost: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _wasteAmount Type: uint256, Indexed: false
   */
  placeWasteOrder(
    _wasteAmount: BigNumberish,
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
   */
  s_denominator(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_gwsMax(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_gwsMinimumOrder(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_gwsSpeedupCost(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_gwsTax(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_gwsTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_numerator(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_speedupTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _numerator Type: uint256, Indexed: false
   * @param _denominator Type: uint256, Indexed: false
   */
  setExchangeRate(
    _numerator: BigNumberish,
    _denominator: BigNumberish,
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
   * @param _gwsMax Type: uint8, Indexed: false
   */
  setGwsMax(
    _gwsMax: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _gwsMinimumOrder Type: uint16, Indexed: false
   */
  setGwsMinimumOrder(
    _gwsMinimumOrder: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _gwsSpeedupCost Type: uint8, Indexed: false
   */
  setGwsSpeedupCost(
    _gwsSpeedupCost: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _gwsTax Type: uint16, Indexed: false
   */
  setGwsTax(
    _gwsTax: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _gwsTime Type: uint256, Indexed: false
   */
  setGwsTime(
    _gwsTime: BigNumberish,
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
   * @param _signer Type: address, Indexed: false
   */
  setSigner(
    _signer: string,
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
   * @param _orderId Type: uint256, Indexed: false
   */
  IXTSpeedUpOrder(
    _numSpeedUps: BigNumberish,
    _orderId: BigNumberish,
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
