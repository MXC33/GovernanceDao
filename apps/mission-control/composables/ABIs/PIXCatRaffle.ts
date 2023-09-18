import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  PIXCatRaffle,
  PIXCatRaffleMethodNames,
  PIXCatRaffleEventsContext,
  PIXCatRaffleEvents
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
export type PIXCatRaffleEvents =
  | 'OwnershipTransferred'
  | 'Paused'
  | 'RaffleClaimed'
  | 'RaffleDeleted'
  | 'RaffleDrawn'
  | 'RaffleEntered'
  | 'RaffleRegistered'
  | 'RaffleSetPaused'
  | 'RaffleUpdated'
  | 'Unpaused';
export interface PIXCatRaffleEventsContext {
  OwnershipTransferred(...parameters: any): EventFilter;
  Paused(...parameters: any): EventFilter;
  RaffleClaimed(...parameters: any): EventFilter;
  RaffleDeleted(...parameters: any): EventFilter;
  RaffleDrawn(...parameters: any): EventFilter;
  RaffleEntered(...parameters: any): EventFilter;
  RaffleRegistered(...parameters: any): EventFilter;
  RaffleSetPaused(...parameters: any): EventFilter;
  RaffleUpdated(...parameters: any): EventFilter;
  Unpaused(...parameters: any): EventFilter;
}
export type PIXCatRaffleMethodNames =
  | 'COORDINATOR'
  | 'callbackGasLimit'
  | 'canDraw'
  | 'claimRewards'
  | 'claimed'
  | 'cumulativeEntries'
  | 'deleteRaffle'
  | 'drawWinners'
  | 'enterRaffle'
  | 'erc1155Treasury'
  | 'erc721Treasury'
  | 'gcd'
  | 'getActiveRaffles'
  | 'getAllWinningAddresses'
  | 'getCumulativeEntries'
  | 'getPastRaffles'
  | 'getRaffle'
  | 'getUpcomingRaffles'
  | 'getWinningAddress'
  | 'initialize'
  | 'keyHash'
  | 'landmark'
  | 'moderators'
  | 'multiplier'
  | 'owner'
  | 'paused'
  | 'raffleDrawn'
  | 'raffleId'
  | 'raffleSeed'
  | 'raffles'
  | 'rawFulfillRandomWords'
  | 'registerRaffle'
  | 'renounceOwnership'
  | 'requestConfirmations'
  | 'setERC1155Treasury'
  | 'setERC721Treasury'
  | 'setModerator'
  | 'setPaused'
  | 'setTicket'
  | 'shifter'
  | 'subscriptionId'
  | 'ticket'
  | 'transferOwnership'
  | 'updateRaffle'
  | 'userRaffleEntries';
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PausedEventEmittedResponse {
  account: string;
}
export interface RaffleClaimedEventEmittedResponse {
  _player: string;
}
export interface RaffleDeletedEventEmittedResponse {
  _raffleId: BigNumberish;
}
export interface RaffleDrawnEventEmittedResponse {
  _raffleId: BigNumberish;
}
export interface RaffleEnteredEventEmittedResponse {
  _raffleId: BigNumberish;
  _player: string;
}
export interface RaffleRegisteredEventEmittedResponse {
  _raffleId: BigNumberish;
}
export interface RaffleSetPausedEventEmittedResponse {
  _raffleId: BigNumberish;
  _isPaused: boolean;
}
export interface RaffleUpdatedEventEmittedResponse {
  _raffleId: BigNumberish;
}
export interface UnpausedEventEmittedResponse {
  account: string;
}
export interface _activeRafflesResponse {
  ticketId: BigNumber;
  0: BigNumber;
  prizeAddress: string;
  1: string;
  prizeType: number;
  2: number;
  prizeIds: BigNumber[];
  3: BigNumber[];
  prizeAmounts: BigNumber[];
  4: BigNumber[];
  totalPrizes: BigNumber;
  5: BigNumber;
  totalEntries: BigNumber;
  6: BigNumber;
  userMinEntries: BigNumber;
  7: BigNumber;
  userMaxEntries: BigNumber;
  8: BigNumber;
  startTime: BigNumber;
  9: BigNumber;
  duration: BigNumber;
  10: BigNumber;
  raffleTreasury: string;
  11: string;
  paused: boolean;
  12: boolean;
  isDrawn: boolean;
  13: boolean;
  raffleId: BigNumber;
  14: BigNumber;
  entries: BigNumber;
  15: BigNumber;
}
export interface _pastRafflesResponse {
  ticketId: BigNumber;
  0: BigNumber;
  prizeAddress: string;
  1: string;
  prizeType: number;
  2: number;
  prizeIds: BigNumber[];
  3: BigNumber[];
  prizeAmounts: BigNumber[];
  4: BigNumber[];
  totalPrizes: BigNumber;
  5: BigNumber;
  totalEntries: BigNumber;
  6: BigNumber;
  userMinEntries: BigNumber;
  7: BigNumber;
  userMaxEntries: BigNumber;
  8: BigNumber;
  startTime: BigNumber;
  9: BigNumber;
  duration: BigNumber;
  10: BigNumber;
  raffleTreasury: string;
  11: string;
  paused: boolean;
  12: boolean;
  isDrawn: boolean;
  13: boolean;
  raffleId: BigNumber;
  14: BigNumber;
  entries: BigNumber;
  15: BigNumber;
}
export interface RaffleResponse {
  ticketId: BigNumber;
  0: BigNumber;
  prizeAddress: string;
  1: string;
  prizeType: number;
  2: number;
  prizeIds: BigNumber[];
  3: BigNumber[];
  prizeAmounts: BigNumber[];
  4: BigNumber[];
  totalPrizes: BigNumber;
  5: BigNumber;
  totalEntries: BigNumber;
  6: BigNumber;
  userMinEntries: BigNumber;
  7: BigNumber;
  userMaxEntries: BigNumber;
  8: BigNumber;
  startTime: BigNumber;
  9: BigNumber;
  duration: BigNumber;
  10: BigNumber;
  raffleTreasury: string;
  11: string;
  paused: boolean;
  12: boolean;
  isDrawn: boolean;
  13: boolean;
  raffleId: BigNumber;
  14: BigNumber;
  entries: BigNumber;
  15: BigNumber;
}
export interface _upcomingRafflesResponse {
  ticketId: BigNumber;
  0: BigNumber;
  prizeAddress: string;
  1: string;
  prizeType: number;
  2: number;
  prizeIds: BigNumber[];
  3: BigNumber[];
  prizeAmounts: BigNumber[];
  4: BigNumber[];
  totalPrizes: BigNumber;
  5: BigNumber;
  totalEntries: BigNumber;
  6: BigNumber;
  userMinEntries: BigNumber;
  7: BigNumber;
  userMaxEntries: BigNumber;
  8: BigNumber;
  startTime: BigNumber;
  9: BigNumber;
  duration: BigNumber;
  10: BigNumber;
  raffleTreasury: string;
  11: string;
  paused: boolean;
  12: boolean;
  isDrawn: boolean;
  13: boolean;
  raffleId: BigNumber;
  14: BigNumber;
  entries: BigNumber;
  15: BigNumber;
}
export interface RafflesResponse {
  ticketId: BigNumber;
  0: BigNumber;
  prizeAddress: string;
  1: string;
  prizeType: number;
  2: number;
  totalPrizes: BigNumber;
  3: BigNumber;
  totalEntries: BigNumber;
  4: BigNumber;
  userMinEntries: BigNumber;
  5: BigNumber;
  userMaxEntries: BigNumber;
  6: BigNumber;
  startTime: BigNumber;
  7: BigNumber;
  duration: BigNumber;
  8: BigNumber;
  raffleTreasury: string;
  9: string;
  paused: boolean;
  10: boolean;
  isDrawn: boolean;
  11: boolean;
  raffleId: BigNumber;
  12: BigNumber;
  entries: BigNumber;
  13: BigNumber;
  length: 14;
}
export interface RegisterRaffleRequest {
  ticketId: BigNumberish;
  prizeAddress: string;
  prizeType: BigNumberish;
  prizeIds: BigNumberish[];
  prizeAmounts: BigNumberish[];
  totalPrizes: BigNumberish;
  totalEntries: BigNumberish;
  userMinEntries: BigNumberish;
  userMaxEntries: BigNumberish;
  startTime: BigNumberish;
  duration: BigNumberish;
  raffleTreasury: string;
}
export interface UpdateRaffleRequest {
  ticketId: BigNumberish;
  prizeAddress: string;
  prizeType: BigNumberish;
  prizeIds: BigNumberish[];
  prizeAmounts: BigNumberish[];
  totalPrizes: BigNumberish;
  totalEntries: BigNumberish;
  userMinEntries: BigNumberish;
  userMaxEntries: BigNumberish;
  startTime: BigNumberish;
  duration: BigNumberish;
  raffleTreasury: string;
}
export interface PIXCatRaffle {
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
  callbackGasLimit(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   */
  canDraw(
    _raffleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   * @param _prizeIds Type: uint256[], Indexed: false
   */
  claimRewards(
    _raffleId: BigNumberish,
    _prizeIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  claimed(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  cumulativeEntries(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   */
  deleteRaffle(
    _raffleId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   */
  drawWinners(
    _raffleId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   * @param _numTickets Type: uint256, Indexed: false
   */
  enterRaffle(
    _raffleId: BigNumberish,
    _numTickets: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  erc1155Treasury(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  erc721Treasury(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param a Type: uint256, Indexed: false
   * @param b Type: uint256, Indexed: false
   */
  gcd(
    a: BigNumberish,
    b: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getActiveRaffles(
    overrides?: ContractCallOverrides
  ): Promise<_activeRafflesResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   */
  getAllWinningAddresses(
    _raffleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   */
  getCumulativeEntries(
    _raffleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getPastRaffles(
    overrides?: ContractCallOverrides
  ): Promise<_pastRafflesResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   */
  getRaffle(
    _raffleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<RaffleResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getUpcomingRaffles(
    overrides?: ContractCallOverrides
  ): Promise<_upcomingRafflesResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   * @param _prizeId Type: uint256, Indexed: false
   */
  getWinningAddress(
    _raffleId: BigNumberish,
    _prizeId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _landmark Type: address, Indexed: false
   * @param _ticket Type: address, Indexed: false
   * @param _vrfCoordinator Type: address, Indexed: false
   * @param _keyHash Type: bytes32, Indexed: false
   * @param _subscriptionId Type: uint64, Indexed: false
   */
  initialize(
    _landmark: string,
    _ticket: string,
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
  keyHash(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  landmark(overrides?: ContractCallOverrides): Promise<string>;
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
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  multiplier(
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
  paused(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  raffleDrawn(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  raffleId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  raffleSeed(
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
  raffles(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<RafflesResponse>;
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
   * @param r Type: tuple, Indexed: false
   */
  registerRaffle(
    r: RegisterRaffleRequest,
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
   * @param _treasury Type: address, Indexed: false
   */
  setERC1155Treasury(
    _treasury: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _treasury Type: address, Indexed: false
   */
  setERC721Treasury(
    _treasury: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _mod Type: address, Indexed: false
   * @param _isMod Type: bool, Indexed: false
   */
  setModerator(
    _mod: string,
    _isMod: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   * @param _isPaused Type: bool, Indexed: false
   */
  setPaused(
    _raffleId: BigNumberish,
    _isPaused: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _ticket Type: address, Indexed: false
   */
  setTicket(
    _ticket: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  shifter(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
  ticket(overrides?: ContractCallOverrides): Promise<string>;
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _raffleId Type: uint256, Indexed: false
   * @param r Type: tuple, Indexed: false
   */
  updateRaffle(
    _raffleId: BigNumberish,
    r: UpdateRaffleRequest,
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
  userRaffleEntries(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
}
