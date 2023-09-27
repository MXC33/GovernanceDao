import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  AssetConverter,
  AssetConverterMethodNames,
  AssetConverterEventsContext,
  AssetConverterEvents
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
export type AssetConverterEvents =
  | 'AssetsConverter__ConversionComplete'
  | 'AssetsConverter__NewRecipe'
  | 'OwnershipTransferred';
export interface AssetConverterEventsContext {
  AssetsConverter__ConversionComplete(...parameters: any): EventFilter;
  AssetsConverter__NewRecipe(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
}
export type AssetConverterMethodNames =
  | 'admins'
  | 'assetManager'
  | 'convertAsset'
  | 'createAssetConversionRecipe'
  | 'deleteAssetConversionRecipe'
  | 'getRecipeFormula'
  | 'initialize'
  | 'nonce'
  | 'owner'
  | 'recipes'
  | 'renounceOwnership'
  | 'setAdmin'
  | 'setAssetManager'
  | 'setRecipePausedState'
  | 'transferOwnership';
export interface AssetsConverter__ConversionCompleteEventEmittedResponse {
  recipeId: BigNumberish;
  amount: BigNumberish;
}
export interface AssetsConverter__NewRecipeEventEmittedResponse {
  fromToken: BigNumberish[];
  toToken: BigNumberish[];
  prices: BigNumberish[];
  id: BigNumberish;
  maxConversionsPerWallet: BigNumberish;
  maxTotalConversions: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface GetRecipeFormulaResponse {
  fromToken: BigNumber[];
  0: BigNumber[];
  toToken: BigNumber[];
  1: BigNumber[];
  prices: BigNumber[];
  2: BigNumber[];
  length: 3;
}
export interface RecipesResponse {
  id: BigNumber;
  0: BigNumber;
  maxConversionsPerWallet: BigNumber;
  1: BigNumber;
  maxTotalConversions: BigNumber;
  2: BigNumber;
  paused: boolean;
  3: boolean;
  length: 4;
}
export interface AssetConverter {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  admins(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
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
   * @param _recipeId Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  convertAsset(
    _recipeId: BigNumberish,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _fromToken Type: uint256[], Indexed: false
   * @param _toToken Type: uint256[], Indexed: false
   * @param _prices Type: uint256[], Indexed: false
   * @param _maxConversionsPerWallet Type: uint256, Indexed: false
   * @param _maxTotalConversions Type: uint256, Indexed: false
   */
  createAssetConversionRecipe(
    _fromToken: BigNumberish[],
    _toToken: BigNumberish[],
    _prices: BigNumberish[],
    _maxConversionsPerWallet: BigNumberish,
    _maxTotalConversions: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _recipeId Type: uint256, Indexed: false
   */
  deleteAssetConversionRecipe(
    _recipeId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _recipeId Type: uint256, Indexed: false
   */
  getRecipeFormula(
    _recipeId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetRecipeFormulaResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  initialize(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  nonce(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   * @param parameter0 Type: uint256, Indexed: false
   */
  recipes(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<RecipesResponse>;
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
   * @param _admin Type: address, Indexed: false
   * @param _shouldBeAdmin Type: bool, Indexed: false
   */
  setAdmin(
    _admin: string,
    _shouldBeAdmin: boolean,
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
   * @param _recipeId Type: uint256, Indexed: false
   * @param _paused Type: bool, Indexed: false
   */
  setRecipePausedState(
    _recipeId: BigNumberish,
    _paused: boolean,
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
