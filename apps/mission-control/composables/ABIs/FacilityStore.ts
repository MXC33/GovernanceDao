import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  FacilityStore,
  FacilityStoreMethodNames,
  FacilityStoreEventsContext,
  FacilityStoreEvents
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
export type FacilityStoreEvents =
  | 'FacilityOrderPlaced'
  | 'OwnershipTransferred'
  | 'ReceiveFacility'
  | 'RequestClaimFacility'
  | 'SpeedUpConstruction';
export interface FacilityStoreEventsContext {
  FacilityOrderPlaced(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  ReceiveFacility(...parameters: any): EventFilter;
  RequestClaimFacility(...parameters: any): EventFilter;
  SpeedUpConstruction(...parameters: any): EventFilter;
}
export type FacilityStoreMethodNames =
  | 'assetManager'
  | 'biomodPriceAmounts'
  | 'biomodTokenIds'
  | 'claimBatchOrder'
  | 'claimOrder'
  | 'facilityProbabilityWeights'
  | 'facilityTime'
  | 'facilityTokenIds'
  | 'feePercentage'
  | 'feeTokenAmount'
  | 'feeTokenId'
  | 'feeWallet'
  | 'fixedPriceTokenAmounts'
  | 'fixedPriceTokenIds'
  | 'fulfillRandomWords'
  | 'getFacilityBiomodTokensPrice'
  | 'getFacilityFixedTokensPrice'
  | 'getMaxOrders'
  | 'getOrders'
  | 'initialize'
  | 'maxOrders'
  | 'moderator'
  | 'nextOrderId'
  | 'owner'
  | 'placeFacilityOrder'
  | 'renounceOwnership'
  | 'setAssetManager'
  | 'setBiomodTokenPrices'
  | 'setFacilityTime'
  | 'setFacilityTokenIdsAndWeights'
  | 'setFeePercentage'
  | 'setFeeWallet'
  | 'setFixedPriceTokenIds'
  | 'setMaxOrders'
  | 'setModerator'
  | 'setSpeedupParameters'
  | 'setVrfCoordinator'
  | 'speedUpOrder'
  | 'IXTSpeedUpOrder'
  | 'speedupPrice'
  | 'speedupPriceTokenId'
  | 'speedupTime'
  | 'transferOwnership'
  | 'userOpenOrdersAmount'
  | 'vrfCoordinator'
  | 'vrfRequests';
export interface FacilityOrderPlacedEventEmittedResponse {
  user: string;
  orderId: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface ReceiveFacilityEventEmittedResponse {
  user: string;
  orderId: BigNumberish;
  facilityTokenId: BigNumberish;
}
export interface RequestClaimFacilityEventEmittedResponse {
  user: string;
  orderId: BigNumberish;
}
export interface SpeedUpConstructionEventEmittedResponse {
  user: string;
  orderId: BigNumberish;
  _numSpeedups: BigNumberish;
}
export interface GetFacilityBiomodTokensPriceResponse {
  _tokenIds: BigNumber[];
  0: BigNumber[];
  _tokenAmounts: BigNumber[];
  1: BigNumber[];
  length: 2;
}
export interface GetFacilityFixedTokensPriceResponse {
  _tokenIds: BigNumber[];
  0: BigNumber[];
  _tokenAmounts: BigNumber[];
  1: BigNumber[];
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
export interface InitializeRequest {
  _assetManager: string;
  _feeWallet: string;
  _facilityTime: BigNumberish;
  _speedupPriceTokenId: BigNumberish;
  _speedupPrice: BigNumberish;
  _speedupTime: BigNumberish;
  _maxOrders: BigNumberish;
  _fixedPriceTokenIds: BigNumberish[];
  _fixedPriceTokenAmounts: BigNumberish[];
  _biomodTokenIds: BigNumberish[];
  _biomodPriceAmounts: BigNumberish[];
  _facilityTokenIds: BigNumberish[];
  _facilityProbabilityWeights: BigNumberish[];
  _vrfCoordinator: string;
}
export interface FacilityStore {
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
   * @param parameter0 Type: uint256, Indexed: false
   */
  biomodPriceAmounts(
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
  biomodTokenIds(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
  facilityProbabilityWeights(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  facilityTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  facilityTokenIds(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feePercentage(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeTokenAmount(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeTokenId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeWallet(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  fixedPriceTokenAmounts(
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
  fixedPriceTokenIds(
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
   */
  getFacilityBiomodTokensPrice(
    overrides?: ContractCallOverrides
  ): Promise<GetFacilityBiomodTokensPriceResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFacilityFixedTokensPrice(
    overrides?: ContractCallOverrides
  ): Promise<GetFacilityFixedTokensPriceResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getMaxOrders(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   * @param _initParams Type: tuple, Indexed: false
   */
  initialize(
    _initParams: InitializeRequest,
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
  moderator(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param _additionalBiomodAmounts Type: uint256[], Indexed: false
   */
  placeFacilityOrder(
    _additionalBiomodAmounts: BigNumberish[],
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
   * @param _assetManager Type: address, Indexed: false
   */
  setAssetManager(
    _assetManager: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _biomodTokenIds Type: uint256[], Indexed: false
   * @param _biomodPriceAmounts Type: uint256[], Indexed: false
   */
  setBiomodTokenPrices(
    _biomodTokenIds: BigNumberish[],
    _biomodPriceAmounts: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _facilityTime Type: uint256, Indexed: false
   */
  setFacilityTime(
    _facilityTime: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _facilityTokenIds Type: uint256[], Indexed: false
   * @param _facilityProbabilityWeights Type: uint256[], Indexed: false
   */
  setFacilityTokenIdsAndWeights(
    _facilityTokenIds: BigNumberish[],
    _facilityProbabilityWeights: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _feePercentage Type: uint256, Indexed: false
   */
  setFeePercentage(
    _feePercentage: BigNumberish,
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
   * @param _fixedPriceTokenIds Type: uint256[], Indexed: false
   * @param _fixedPriceTokenAmounts Type: uint256[], Indexed: false
   */
  setFixedPriceTokenIds(
    _fixedPriceTokenIds: BigNumberish[],
    _fixedPriceTokenAmounts: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _maxOrders Type: uint256, Indexed: false
   */
  setMaxOrders(
    _maxOrders: BigNumberish,
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
   * @param _speedupPriceTokenId Type: uint256, Indexed: false
   * @param _speedupPrice Type: uint256, Indexed: false
   * @param _speedupTime Type: uint256, Indexed: false
   */
  setSpeedupParameters(
    _speedupPriceTokenId: BigNumberish,
    _speedupPrice: BigNumberish,
    _speedupTime: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _vrfCoordinator Type: address, Indexed: false
   */
  setVrfCoordinator(
    _vrfCoordinator: string,
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
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  speedupPrice(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  speedupPriceTokenId(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   * @param _user Type: address, Indexed: false
   */
  userOpenOrdersAmount(
    _user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  vrfCoordinator(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  vrfRequests(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
}
