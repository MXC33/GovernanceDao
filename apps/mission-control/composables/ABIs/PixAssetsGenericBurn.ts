import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  PixAssetsGenericBurn,
  PixAssetsGenericBurnMethodNames,
  PixAssetsGenericBurnEventsContext,
  PixAssetsGenericBurnEvents
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
export type PixAssetsGenericBurnEvents =
  | 'AvatarClaimed'
  | 'CategoryCreated'
  | 'CategoryDeleted'
  | 'CategoryEligibilitySet'
  | 'ContentAmountsUpdated'
  | 'ContentsUpdated'
  | 'OwnershipTransferred'
  | 'PIXAssetsSet'
  | 'PackOpened'
  | 'RewardGranted'
  | 'TokenWhitelisted';
export interface PixAssetsGenericBurnEventsContext {
  AvatarClaimed(...parameters: any): EventFilter;
  CategoryCreated(...parameters: any): EventFilter;
  CategoryDeleted(...parameters: any): EventFilter;
  CategoryEligibilitySet(...parameters: any): EventFilter;
  ContentAmountsUpdated(...parameters: any): EventFilter;
  ContentsUpdated(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PIXAssetsSet(...parameters: any): EventFilter;
  PackOpened(...parameters: any): EventFilter;
  RewardGranted(...parameters: any): EventFilter;
  TokenWhitelisted(...parameters: any): EventFilter;
}
export type PixAssetsGenericBurnMethodNames =
  | 'burnPack'
  | 'claimAvatar'
  | 'createContentCategory'
  | 'deleteContentCategory'
  | 'fulfillRandomWords'
  | 'getAvatarClaimStatus'
  | 'getContentCategories'
  | 'initialize'
  | 'owner'
  | 'renounceOwnership'
  | 's_tokenCategories'
  | 's_tokenCategoryIds'
  | 's_tokenEligibility'
  | 'setAvatarPack'
  | 'setContentAmounts'
  | 'setContentEligibility'
  | 'setContentLarge'
  | 'setContentLargeWeights'
  | 'setContents'
  | 'setGovernance'
  | 'setMaxDraws'
  | 'setPixAssets'
  | 'setTokenBurnLimit'
  | 'setVRFOracle'
  | 'transferOwnership'
  | 'whitelistToken';
export interface AvatarClaimedEventEmittedResponse {
  _address: string;
  _pack: string;
  _tokenId: BigNumberish;
  _amount: BigNumberish;
}
export interface CategoryCreatedEventEmittedResponse {
  _tokenId: BigNumberish;
  _categoryId: BigNumberish;
}
export interface CategoryDeletedEventEmittedResponse {
  _tokenId: BigNumberish;
  _categoryId: BigNumberish;
}
export interface CategoryEligibilitySetEventEmittedResponse {
  _tokenId: BigNumberish;
  _categoryId: BigNumberish;
  _provider: string;
}
export interface ContentAmountsUpdatedEventEmittedResponse {
  _tokenId: BigNumberish;
  _categoryId: BigNumberish;
  _amounts: BigNumberish[];
  _weights: BigNumberish[];
}
export interface ContentsUpdatedEventEmittedResponse {
  _tokenId: BigNumberish;
  _contentCategory: BigNumberish;
  _tokens: string[];
  _tokenIds: BigNumberish[];
  _amounts: BigNumberish[];
  _weights: BigNumberish[];
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PIXAssetsSetEventEmittedResponse {
  _address: string;
}
export interface PackOpenedEventEmittedResponse {
  _opener: string;
  _tokenId: BigNumberish;
  _numPacks: BigNumberish;
}
export interface RewardGrantedEventEmittedResponse {
  _token: string;
  _tokenId: BigNumberish;
  _amount: BigNumberish;
}
export interface TokenWhitelistedEventEmittedResponse {
  _tokenId: BigNumberish;
  _isWhitelisted: boolean;
}
export interface _categoriesResponse {
  id: BigNumber;
  0: BigNumber;
  contentAmountsTotalWeight: BigNumber;
  1: BigNumber;
  contentsTotalWeight: BigNumber;
  2: BigNumber;
  contentAmounts: BigNumber[];
  3: BigNumber[];
  contentAmountsWeights: BigNumber[];
  4: BigNumber[];
  tokenAmounts: BigNumber[];
  5: BigNumber[];
  tokenWeights: BigNumber[];
  6: BigNumber[];
  tokens: string[];
  7: string[];
  tokenIds: BigNumber[];
  8: BigNumber[];
}
export interface S_tokenCategoriesResponse {
  id: BigNumber;
  0: BigNumber;
  contentAmountsTotalWeight: BigNumber;
  1: BigNumber;
  contentsTotalWeight: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface PixAssetsGenericBurn {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _amount Type: uint32, Indexed: false
   * @param _optInConditionals Type: bool, Indexed: false
   */
  burnPack(
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _optInConditionals: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  claimAvatar(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  createContentCategory(
    _tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _categoryId Type: uint256, Indexed: false
   */
  deleteContentCategory(
    _tokenId: BigNumberish,
    _categoryId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * @param _user Type: address, Indexed: false
   */
  getAvatarClaimStatus(
    _user: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  getContentCategories(
    _tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<_categoriesResponse[]>;
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
  owner(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param parameter1 Type: uint256, Indexed: false
   */
  s_tokenCategories(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<S_tokenCategoriesResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  s_tokenCategoryIds(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  s_tokenEligibility(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _avatarPack Type: address, Indexed: false
   */
  setAvatarPack(
    _avatarPack: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _categoryId Type: uint256, Indexed: false
   * @param _amounts Type: uint256[], Indexed: false
   * @param _weights Type: uint256[], Indexed: false
   */
  setContentAmounts(
    _tokenId: BigNumberish,
    _categoryId: BigNumberish,
    _amounts: BigNumberish[],
    _weights: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _categoryId Type: uint256, Indexed: false
   * @param _conditionalProvider Type: address, Indexed: false
   */
  setContentEligibility(
    _tokenId: BigNumberish,
    _categoryId: BigNumberish,
    _conditionalProvider: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _categoryId Type: uint256, Indexed: false
   * @param _tokens Type: address, Indexed: false
   * @param _tokenIds Type: uint256, Indexed: false
   * @param _amounts Type: uint256, Indexed: false
   * @param _weights Type: uint256, Indexed: false
   */
  setContentLarge(
    _tokenId: BigNumberish,
    _categoryId: BigNumberish,
    _tokens: string,
    _tokenIds: BigNumberish,
    _amounts: BigNumberish,
    _weights: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _categoryId Type: uint256, Indexed: false
   */
  setContentLargeWeights(
    _tokenId: BigNumberish,
    _categoryId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _categoryId Type: uint256, Indexed: false
   * @param _tokens Type: address[], Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _amounts Type: uint256[], Indexed: false
   * @param _weights Type: uint256[], Indexed: false
   */
  setContents(
    _tokenId: BigNumberish,
    _categoryId: BigNumberish,
    _tokens: string[],
    _tokenIds: BigNumberish[],
    _amounts: BigNumberish[],
    _weights: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _governance Type: address, Indexed: false
   */
  setGovernance(
    _governance: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _maxDraws Type: uint32, Indexed: false
   */
  setMaxDraws(
    _tokenId: BigNumberish,
    _maxDraws: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixAssets Type: address, Indexed: false
   */
  setPixAssets(
    _pixAssets: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _limit Type: uint256, Indexed: false
   */
  setTokenBurnLimit(
    _tokenId: BigNumberish,
    _limit: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _vrfOracle Type: address, Indexed: false
   */
  setVRFOracle(
    _vrfOracle: string,
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
   * @param _tokenId Type: uint256, Indexed: false
   * @param _isWhitelisted Type: bool, Indexed: false
   */
  whitelistToken(
    _tokenId: BigNumberish,
    _isWhitelisted: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
