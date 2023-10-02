import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  LootChestOpener,
  LootChestOpenerMethodNames,
  LootChestOpenerEventsContext,
  LootChestOpenerEvents
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
export type LootChestOpenerEvents = 'ChestOpened' | 'OwnershipTransferred';
export interface LootChestOpenerEventsContext {
  ChestOpened(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
}
export type LootChestOpenerMethodNames =
  | 'chestTokenId'
  | 'initialize'
  | 'openChests'
  | 'owner'
  | 'pixAssets'
  | 'renounceOwnership'
  | 'transferOwnership'
  | 'updateProbabilities';
export interface ChestOpenedEventEmittedResponse {
  _opener: string;
  _contentIds: BigNumberish[];
  _contentAmounts: BigNumberish[];
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface LootChestOpener {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  chestTokenId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixAssets Type: address, Indexed: false
   * @param _rewardAssetIds Type: uint256[], Indexed: false
   * @param _rewardAssetAmounts Type: uint256[], Indexed: false
   * @param _assetWeights Type: uint256[], Indexed: false
   * @param _contentAmounts Type: uint256[], Indexed: false
   * @param _contentWeights Type: uint256[], Indexed: false
   */
  initialize(
    _pixAssets: string,
    _rewardAssetIds: BigNumberish[],
    _rewardAssetAmounts: BigNumberish[],
    _assetWeights: BigNumberish[],
    _contentAmounts: BigNumberish[],
    _contentWeights: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _numChests Type: uint256, Indexed: false
   */
  openChests(
    _numChests: BigNumberish,
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
  pixAssets(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param _rewardAssetIds Type: uint256[], Indexed: false
   * @param _rewardAssetAmounts Type: uint256[], Indexed: false
   * @param _assetWeights Type: uint256[], Indexed: false
   * @param _contentAmounts Type: uint256[], Indexed: false
   * @param _contentWeights Type: uint256[], Indexed: false
   */
  updateProbabilities(
    _rewardAssetIds: BigNumberish[],
    _rewardAssetAmounts: BigNumberish[],
    _assetWeights: BigNumberish[],
    _contentAmounts: BigNumberish[],
    _contentWeights: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
