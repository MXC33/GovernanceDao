import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  GravityGradeBurn,
  GravityGradeBurnMethodNames,
  GravityGradeBurnEventsContext,
  GravityGradeBurnEvents
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
export type GravityGradeBurnEvents =
  | 'GG_Drop3_MysteryBox'
  | 'GG_Drop3_PackBurned'
  | 'OwnershipTransferred'
  | 'PackOpened'
  | 'Paused'
  | 'Unpaused';
export interface GravityGradeBurnEventsContext {
  GG_Drop3_MysteryBox(...parameters: any): EventFilter;
  GG_Drop3_PackBurned(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PackOpened(...parameters: any): EventFilter;
  Paused(...parameters: any): EventFilter;
  Unpaused(...parameters: any): EventFilter;
}
export type GravityGradeBurnMethodNames =
  | 'burnPack'
  | 'initialize'
  | 'owner'
  | 'paused'
  | 'renounceOwnership'
  | 'setAssetManager'
  | 'setGravityGrade'
  | 'setPackDistribution'
  | 'start'
  | 'stop'
  | 'transferOwnership';
export interface GG_Drop3_MysteryBoxEventEmittedResponse {
  _player: string;
  _tokenIds: BigNumberish[];
  _amounts: BigNumberish[];
}
export interface GG_Drop3_PackBurnedEventEmittedResponse {
  _player: string;
  _tokenId: BigNumberish;
  _numPacks: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PackOpenedEventEmittedResponse {
  _opener: string;
  _tokenId: BigNumberish;
  _numPacks: BigNumberish;
}
export interface PausedEventEmittedResponse {
  account: string;
}
export interface UnpausedEventEmittedResponse {
  account: string;
}
export interface GravityGradeBurn {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  burnPack(
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _probas Type: uint256[5], Indexed: false
   */
  initialize(
    _probas: [
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
   * @param _erc1155 Type: address, Indexed: false
   */
  setGravityGrade(
    _erc1155: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _nonCumProbabilities Type: uint256[5], Indexed: false
   */
  setPackDistribution(
    _nonCumProbabilities: [
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
