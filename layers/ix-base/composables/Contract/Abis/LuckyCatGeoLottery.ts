import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  LuckyCatGeoLottery,
  LuckyCatGeoLotteryMethodNames,
  LuckyCatGeoLotteryEventsContext,
  LuckyCatGeoLotteryEvents
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
export type LuckyCatGeoLotteryEvents =
  | 'OwnershipTransferred'
  | 'Paused'
  | 'PoolToppedUp'
  | 'RewardClaimed'
  | 'Unpaused'
  | 'UserEntered'
  | 'UserStreamEnded'
  | 'UserStreamStarted'
  | 'UserStreamUpdated';
export interface LuckyCatGeoLotteryEventsContext {
  OwnershipTransferred(...parameters: any): EventFilter;
  Paused(...parameters: any): EventFilter;
  PoolToppedUp(...parameters: any): EventFilter;
  RewardClaimed(...parameters: any): EventFilter;
  Unpaused(...parameters: any): EventFilter;
  UserEntered(...parameters: any): EventFilter;
  UserStreamEnded(...parameters: any): EventFilter;
  UserStreamStarted(...parameters: any): EventFilter;
  UserStreamUpdated(...parameters: any): EventFilter;
}
export type LuckyCatGeoLotteryMethodNames =
  | 'COORDINATOR'
  | 'aGold'
  | 'callbackGasLimit'
  | 'claimReward'
  | 'claimedRewards'
  | 'drawRequest'
  | 'drawWinners'
  | 'enterLottery'
  | 'entries'
  | 'geoStream'
  | 'host'
  | 'increasePool'
  | 'initialize'
  | 'ixt'
  | 'keyHash'
  | 'lotteryId'
  | 'lotteryStartedAt'
  | 'luckyCatGeoReward'
  | 'maxEntries'
  | 'merkleRoot'
  | 'moderators'
  | 'onStreamEnded'
  | 'onStreamStarted'
  | 'onStreamUpdated'
  | 'owner'
  | 'paused'
  | 'poolAmounts'
  | 'poolShares'
  | 'rawFulfillRandomWords'
  | 'renounceOwnership'
  | 'requestConfirmations'
  | 'rewardPerTicket'
  | 'setAGOLD'
  | 'setCOORDINATOR'
  | 'setCallbackGasLimit'
  | 'setGeoStream'
  | 'setIXT'
  | 'setKeyHash'
  | 'setLuckyCatGeoReward'
  | 'setMaxEntries'
  | 'setMerkleRoot'
  | 'setModerator'
  | 'setPoolRewards'
  | 'setPoolShares'
  | 'setRequestConfirmations'
  | 'setSubscriptionId'
  | 'setTerritory'
  | 'setTerritoryStaking'
  | 'setTicketPrice'
  | 'start'
  | 'stop'
  | 'subscriptionId'
  | 'territory'
  | 'territoryStaking'
  | 'ticketPrice'
  | 'transferOwnership'
  | 'userAmountStreamed'
  | 'userEntries'
  | 'userFlowActive'
  | 'userLotteryRate'
  | 'userStreamStartedAt'
  | 'userStreamUpdatedAt'
  | 'winningCountry'
  | 'winningLevel'
  | 'winningTier';
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PausedEventEmittedResponse {
  account: string;
}
export interface PoolToppedUpEventEmittedResponse {
  _pool: BigNumberish;
  _amount: BigNumberish;
  _lotteryId: BigNumberish;
}
export interface RewardClaimedEventEmittedResponse {
  _lotteryId: BigNumberish;
  _user: string;
  _rewardFlow: BigNumberish;
}
export interface UnpausedEventEmittedResponse {
  account: string;
}
export interface UserEnteredEventEmittedResponse {
  _user: string;
  _lotteryId: BigNumberish;
  _entries: BigNumberish;
}
export interface UserStreamEndedEventEmittedResponse {
  _user: string;
  _flowRate: BigNumberish;
  _timestamp: BigNumberish;
}
export interface UserStreamStartedEventEmittedResponse {
  _user: string;
  _flowRate: BigNumberish;
  _timestamp: BigNumberish;
}
export interface UserStreamUpdatedEventEmittedResponse {
  _user: string;
  _newFlowRate: BigNumberish;
  _oldFlowRate: BigNumberish;
  _timestamp: BigNumberish;
}
export interface LuckyCatGeoLottery {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  COORDINATOR(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  aGold(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  callbackGasLimit(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _lotteryId Type: uint256, Indexed: false
   * @param merkleProof Type: bytes32[][], Indexed: false
   */
  claimReward(
    _lotteryId: BigNumberish,
    merkleProof: Arrayish[][],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   */
  claimedRewards(
    parameter0: string,
    parameter1: BigNumberish,
    parameter2: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  drawRequest(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  drawWinners(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _entries Type: uint256, Indexed: false
   */
  enterLottery(
    _entries: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  entries(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  geoStream(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  host(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pool Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  increasePool(
    _pool: BigNumberish,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _vrfCoordinator Type: address, Indexed: false
   * @param _keyHash Type: bytes32, Indexed: false
   * @param _subscriptionId Type: uint64, Indexed: false
   */
  initialize(
    _vrfCoordinator: string,
    _keyHash: Arrayish,
    _subscriptionId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  ixt(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  keyHash(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  lotteryId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  lotteryStartedAt(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  luckyCatGeoReward(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  maxEntries(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  merkleRoot(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  moderators(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _flowRate Type: int96, Indexed: false
   */
  onStreamEnded(
    _user: string,
    _flowRate: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _flowRate Type: int96, Indexed: false
   */
  onStreamStarted(
    _user: string,
    _flowRate: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _newFlowRate Type: int96, Indexed: false
   * @param _oldFlowRate Type: int96, Indexed: false
   */
  onStreamUpdated(
    _user: string,
    _newFlowRate: BigNumberish,
    _oldFlowRate: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
  paused(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  poolAmounts(
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
  poolShares(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param requestId Type: uint256, Indexed: false
   * @param randomWords Type: uint256[], Indexed: false
   */
  rawFulfillRandomWords(
    requestId: BigNumberish,
    randomWords: BigNumberish[],
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
  requestConfirmations(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  rewardPerTicket(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _aGold Type: address, Indexed: false
   */
  setAGOLD(
    _aGold: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _coordinator Type: address, Indexed: false
   */
  setCOORDINATOR(
    _coordinator: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _callbackGasLimit Type: uint32, Indexed: false
   */
  setCallbackGasLimit(
    _callbackGasLimit: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _geoStream Type: address, Indexed: false
   */
  setGeoStream(
    _geoStream: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _ixt Type: address, Indexed: false
   */
  setIXT(
    _ixt: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _keyHash Type: bytes32, Indexed: false
   */
  setKeyHash(
    _keyHash: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _luckyCatGeoReward Type: address, Indexed: false
   */
  setLuckyCatGeoReward(
    _luckyCatGeoReward: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newMaxEntries Type: uint256, Indexed: false
   */
  setMaxEntries(
    newMaxEntries: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _lotteryId Type: uint256, Indexed: false
   * @param _merkleRoot Type: bytes32[], Indexed: false
   * @param _pool Type: uint256[], Indexed: false
   */
  setMerkleRoot(
    _lotteryId: BigNumberish,
    _merkleRoot: Arrayish[],
    _pool: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _isModerator Type: bool, Indexed: false
   */
  setModerator(
    _user: string,
    _isModerator: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _lotteryId Type: uint256, Indexed: false
   * @param _rewardAmounts Type: uint256[], Indexed: false
   * @param _pool Type: uint256[], Indexed: false
   */
  setPoolRewards(
    _lotteryId: BigNumberish,
    _rewardAmounts: BigNumberish[],
    _pool: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _poolShares Type: uint16[], Indexed: false
   */
  setPoolShares(
    _poolShares: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _requestConfirmations Type: uint16, Indexed: false
   */
  setRequestConfirmations(
    _requestConfirmations: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _subscriptionId Type: uint64, Indexed: false
   */
  setSubscriptionId(
    _subscriptionId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _territory Type: address, Indexed: false
   */
  setTerritory(
    _territory: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _territoryStaking Type: address, Indexed: false
   */
  setTerritoryStaking(
    _territoryStaking: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newTicketPrice Type: uint256, Indexed: false
   */
  setTicketPrice(
    newTicketPrice: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  start(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  stop(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  subscriptionId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  territory(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  territoryStaking(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  ticketPrice(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  userAmountStreamed(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  userEntries(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  userFlowActive(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  userLotteryRate(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  userStreamStartedAt(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  userStreamUpdatedAt(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  winningCountry(
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
  winningLevel(
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
  winningTier(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
}
