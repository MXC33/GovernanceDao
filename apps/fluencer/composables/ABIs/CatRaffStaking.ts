import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  CatRaffStaking,
  CatRaffStakingMethodNames,
  CatRaffStakingEventsContext,
  CatRaffStakingEvents
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
export type CatRaffStakingEvents =
  | 'DrawRequested'
  | 'OwnershipTransferred'
  | 'Paused'
  | 'PrizeAdded'
  | 'PrizeClaimed'
  | 'ResultDrawn'
  | 'TicketsAdded'
  | 'TicketsWithdrawn'
  | 'Unpaused';
export interface CatRaffStakingEventsContext {
  DrawRequested(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  Paused(...parameters: any): EventFilter;
  PrizeAdded(...parameters: any): EventFilter;
  PrizeClaimed(...parameters: any): EventFilter;
  ResultDrawn(...parameters: any): EventFilter;
  TicketsAdded(...parameters: any): EventFilter;
  TicketsWithdrawn(...parameters: any): EventFilter;
  Unpaused(...parameters: any): EventFilter;
}
export type CatRaffStakingMethodNames =
  | 'new'
  | 'COORDINATOR'
  | 'POOL_PERCENT'
  | 'SECONDS_PER_WEEK'
  | 'addOldTickets'
  | 'addPrize'
  | 'addTickets'
  | 'callbackGasLimit'
  | 'claimPrize'
  | 'draw'
  | 'drawRequests'
  | 'drawable'
  | 'firstWeek'
  | 'getCurrentWeek'
  | 'keeper'
  | 'keyHash'
  | 'numWords'
  | 'owner'
  | 'pastTicketsOf'
  | 'pause'
  | 'paused'
  | 'pixToken'
  | 'prizes'
  | 'rawFulfillRandomWords'
  | 'renounceOwnership'
  | 'requestConfirmations'
  | 'setCallbackGasLimit'
  | 'setKeeper'
  | 'setKeyHash'
  | 'setPoolPercent'
  | 'setRequestConfirmations'
  | 'setTreasury'
  | 'setWeeklyPrize'
  | 'subscriptionId'
  | 'ticketPrice'
  | 'ticketsOf'
  | 'ticketsOf'
  | 'transferOwnership'
  | 'treasury'
  | 'unpause'
  | 'weeklyPrize'
  | 'weeklyTickets'
  | 'weeklyWinners'
  | 'winnings'
  | 'withdrawOldTickets';
export interface DrawRequestedEventEmittedResponse {
  requestID: BigNumberish;
  week: BigNumberish;
  tickets: BigNumberish;
  prize: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PausedEventEmittedResponse {
  account: string;
}
export interface PrizeAddedEventEmittedResponse {
  week: BigNumberish;
  amount: BigNumberish;
  timestamp: BigNumberish;
}
export interface PrizeClaimedEventEmittedResponse {
  player: string;
  prize: BigNumberish;
}
export interface ResultDrawnEventEmittedResponse {
  week: BigNumberish;
}
export interface TicketsAddedEventEmittedResponse {
  week: BigNumberish;
  player: string;
  tickets: BigNumberish;
  timestamp: BigNumberish;
}
export interface TicketsWithdrawnEventEmittedResponse {
  week: BigNumberish;
  player: string;
  tickets: BigNumberish;
}
export interface UnpausedEventEmittedResponse {
  account: string;
}
export interface WeeklyTicketsResponse {
  prize: BigNumber;
  0: BigNumber;
  totalTickets: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface WinningsResponse {
  result0: string[];
  0: string[];
  result1: BigNumber[];
  1: BigNumber[];
  length: 2;
}
export interface CatRaffStaking {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _pixToken Type: address, Indexed: false
   * @param _treasury Type: address, Indexed: false
   * @param _ticketPrice Type: uint256, Indexed: false
   * @param _weeklyPrize Type: uint256, Indexed: false
   * @param _vrfCoordinator Type: address, Indexed: false
   * @param _keyHash Type: bytes32, Indexed: false
   * @param _subscriptionId Type: uint64, Indexed: false
   */
  'new'(
    _pixToken: string,
    _treasury: string,
    _ticketPrice: BigNumberish,
    _weeklyPrize: BigNumberish,
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
  COORDINATOR(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  POOL_PERCENT(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  SECONDS_PER_WEEK(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _week Type: uint256, Indexed: false
   * @param _tickets Type: uint256, Indexed: false
   * @param _max Type: bool, Indexed: false
   */
  addOldTickets(
    _week: BigNumberish,
    _tickets: BigNumberish,
    _max: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _prize Type: uint256, Indexed: false
   */
  addPrize(
    _prize: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tickets Type: uint256, Indexed: false
   */
  addTickets(
    _tickets: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   */
  claimPrize(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _week Type: uint256, Indexed: false
   */
  draw(
    _week: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  drawRequests(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _week Type: uint256, Indexed: false
   */
  drawable(
    _week: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  firstWeek(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentWeek(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  keeper(overrides?: ContractCallOverrides): Promise<string>;
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
  numWords(overrides?: ContractCallOverrides): Promise<number>;
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
   * @param _player Type: address, Indexed: false
   */
  pastTicketsOf(
    _player: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  pause(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   */
  pixToken(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  prizes(
    parameter0: string,
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
   * @param _keeper Type: address, Indexed: false
   */
  setKeeper(
    _keeper: string,
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
   * @param _poolPercent Type: uint8[5], Indexed: false
   */
  setPoolPercent(
    _poolPercent: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ],
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
   * @param _treasury Type: address, Indexed: false
   */
  setTreasury(
    _treasury: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _weeklyPrize Type: uint256, Indexed: false
   */
  setWeeklyPrize(
    _weeklyPrize: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
  ticketPrice(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _week Type: uint256, Indexed: false
   * @param _player Type: address, Indexed: false
   */
  ticketsOf(
    _week: BigNumberish,
    _player: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _player Type: address, Indexed: false
   */
  ticketsOf(
    _player: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
   */
  treasury(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  unpause(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  weeklyPrize(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  weeklyTickets(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<WeeklyTicketsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  weeklyWinners(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _week Type: uint256, Indexed: false
   */
  winnings(
    _week: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<WinningsResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _week Type: uint256, Indexed: false
   * @param _tickets Type: uint256, Indexed: false
   * @param _max Type: bool, Indexed: false
   */
  withdrawOldTickets(
    _week: BigNumberish,
    _tickets: BigNumberish,
    _max: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
