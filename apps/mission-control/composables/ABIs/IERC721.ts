import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  IERC721,
  IERC721MethodNames,
  IERC721EventsContext,
  IERC721Events
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
export type IERC721Events =
  | 'Approval'
  | 'ApprovalForAll'
  | 'CombinePriceUpdated'
  | 'Combined'
  | 'CombinedWithBurned'
  | 'ModeratorUpdated'
  | 'OwnershipTransferred'
  | 'PIXMinted'
  | 'PackPriceUpdated'
  | 'PaymentTokenUpdated'
  | 'Requested'
  | 'TraderUpdated'
  | 'Transfer'
  | 'TreasuryUpdated';
export interface IERC721EventsContext {
  Approval(...parameters: any): EventFilter;
  ApprovalForAll(...parameters: any): EventFilter;
  CombinePriceUpdated(...parameters: any): EventFilter;
  Combined(...parameters: any): EventFilter;
  CombinedWithBurned(...parameters: any): EventFilter;
  ModeratorUpdated(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PIXMinted(...parameters: any): EventFilter;
  PackPriceUpdated(...parameters: any): EventFilter;
  PaymentTokenUpdated(...parameters: any): EventFilter;
  Requested(...parameters: any): EventFilter;
  TraderUpdated(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
  TreasuryUpdated(...parameters: any): EventFilter;
}
export type IERC721MethodNames =
  | 'approve'
  | 'balanceOf'
  | 'batchMint'
  | 'blacklistedAddresses'
  | 'combine'
  | 'combineCounts'
  | 'combinePrice'
  | 'dropInfos'
  | 'getApproved'
  | 'getInfo'
  | 'getTier'
  | 'initialize'
  | 'isApprovedForAll'
  | 'isDisabledDropForPlayer'
  | 'isTerritory'
  | 'lastTokenId'
  | 'limitForMedium'
  | 'limitForSmall'
  | 'moderators'
  | 'name'
  | 'nonces'
  | 'oracleManager'
  | 'owner'
  | 'ownerOf'
  | 'packIXTPrices'
  | 'packPrices'
  | 'packRequestCounts'
  | 'packRequests'
  | 'packsPurchased'
  | 'paymentTokens'
  | 'pendingPackDropId'
  | 'pendingPackType'
  | 'pixInLand'
  | 'pixInfos'
  | 'pixToken'
  | 'pixesInLand'
  | 'relatedDrops'
  | 'relatedDropsStatus'
  | 'renounceOwnership'
  | 'requestBatchMint'
  | 'requestBatchMintWithIXT'
  | 'safeBatchTransferFrom'
  | 'safeMint'
  | 'safeTransferFrom'
  | 'safeTransferFrom'
  | 'setApprovalForAll'
  | 'setBaseURI'
  | 'setBlacklistedAddress'
  | 'setDropInfo'
  | 'setModerator'
  | 'setPackIXTPrice'
  | 'setPackPrice'
  | 'setPaymentToken'
  | 'setRelationForDrops'
  | 'setTier'
  | 'setTokenForPrice'
  | 'setTrader'
  | 'setTreasury'
  | 'supportsInterface'
  | 'swapManager'
  | 'symbol'
  | 'tiers'
  | 'tokenByIndex'
  | 'tokenForPrice'
  | 'tokenOfOwnerByIndex'
  | 'tokenURI'
  | 'totalSupply'
  | 'traders'
  | 'transferFrom'
  | 'transferOwnership'
  | 'treasury'
  | 'withdraw';
export interface ApprovalEventEmittedResponse {
  owner: string;
  approved: string;
  tokenId: BigNumberish;
}
export interface ApprovalForAllEventEmittedResponse {
  owner: string;
  operator: string;
  approved: boolean;
}
export interface CombinePriceUpdatedEventEmittedResponse {
  price: BigNumberish;
}
export interface CombinedEventEmittedResponse {
  tokenId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface CombinedWithBurnedEventEmittedResponse {
  tokenId: BigNumberish;
  tokenIds: BigNumberish[];
  category: BigNumberish;
  size: BigNumberish;
}
export interface ModeratorUpdatedEventEmittedResponse {
  moderator: string;
  approved: boolean;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PIXMintedEventEmittedResponse {
  account: string;
  tokenId: BigNumberish;
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface PackPriceUpdatedEventEmittedResponse {
  mode: BigNumberish;
  price: BigNumberish;
}
export interface PaymentTokenUpdatedEventEmittedResponse {
  token: string;
  approved: boolean;
}
export interface RequestedEventEmittedResponse {
  dropId: BigNumberish;
  playerId: BigNumberish;
  mode: BigNumberish;
  purchasedPacks: BigNumberish;
  count: BigNumberish;
}
export interface TraderUpdatedEventEmittedResponse {
  trader: string;
  approved: boolean;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  tokenId: BigNumberish;
}
export interface TreasuryUpdatedEventEmittedResponse {
  treasury: string;
  fee: BigNumberish;
}
export interface BatchMintRequest {
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface DropInfosResponse {
  maxCount: BigNumber;
  0: BigNumber;
  requestCount: BigNumber;
  1: BigNumber;
  limitForPlayer: BigNumber;
  2: BigNumber;
  startTime: BigNumber;
  3: BigNumber;
  endTime: BigNumber;
  4: BigNumber;
  length: 5;
}
export interface PixinfoResponse {
  pixId: BigNumber;
  0: BigNumber;
  category: number;
  1: number;
  size: number;
  2: number;
}
export interface PackRequestsResponse {
  playerId: BigNumber;
  0: BigNumber;
  dropId: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface PixInfosResponse {
  pixId: BigNumber;
  0: BigNumber;
  category: number;
  1: number;
  size: number;
  2: number;
  length: 3;
}
export interface SafeMintRequest {
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface SetDropInfoRequest {
  maxCount: BigNumberish;
  requestCount: BigNumberish;
  limitForPlayer: BigNumberish;
  startTime: BigNumberish;
  endTime: BigNumberish;
}
export interface TreasuryResponse {
  treasury: string;
  0: string;
  fee: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface IERC721 {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  balanceOf(
    owner: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param infos Type: tuple[], Indexed: false
   */
  batchMint(
    to: string,
    infos: BatchMintRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  blacklistedAddresses(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenIds Type: uint256[], Indexed: false
   * @param signature Type: bytes, Indexed: false
   */
  combine(
    tokenIds: BigNumberish[],
    signature: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint8, Indexed: false
   */
  combineCounts(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  combinePrice(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  dropInfos(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<DropInfosResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getApproved(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getInfo(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<PixinfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getTier(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pixt Type: address, Indexed: false
   * @param _tokenForPrice Type: address, Indexed: false
   */
  initialize(
    pixt: string,
    _tokenForPrice: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param playerId Type: uint256, Indexed: false
   * @param dropId Type: uint256, Indexed: false
   */
  isDisabledDropForPlayer(
    playerId: BigNumberish,
    dropId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  isTerritory(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  lastTokenId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  limitForMedium(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  limitForSmall(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   */
  name(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  nonces(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  oracleManager(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param tokenId Type: uint256, Indexed: false
   */
  ownerOf(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  packIXTPrices(
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
  packPrices(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  packRequestCounts(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  packRequests(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<PackRequestsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  packsPurchased(
    parameter0: BigNumberish,
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
  paymentTokens(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  pendingPackDropId(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  pendingPackType(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bool, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  pixInLand(
    parameter0: boolean,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  pixInfos(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<PixInfosResponse>;
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
   * @param tokenIds Type: uint256[], Indexed: false
   */
  pixesInLand(
    tokenIds: BigNumberish[],
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
  relatedDrops(
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
  relatedDropsStatus(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
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
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param dropId Type: uint256, Indexed: false
   * @param playerId Type: uint256, Indexed: false
   * @param mode Type: uint256, Indexed: false
   * @param count Type: uint256, Indexed: false
   */
  requestBatchMint(
    token: string,
    dropId: BigNumberish,
    playerId: BigNumberish,
    mode: BigNumberish,
    count: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param dropId Type: uint256, Indexed: false
   * @param playerId Type: uint256, Indexed: false
   * @param mode Type: uint256, Indexed: false
   * @param count Type: uint256, Indexed: false
   */
  requestBatchMintWithIXT(
    dropId: BigNumberish,
    playerId: BigNumberish,
    mode: BigNumberish,
    count: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenIds Type: uint256[], Indexed: false
   */
  safeBatchTransferFrom(
    from: string,
    to: string,
    tokenIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param info Type: tuple, Indexed: false
   */
  safeMint(
    to: string,
    info: SafeMintRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param baseURI_ Type: string, Indexed: false
   */
  setBaseURI(
    baseURI_: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param blacklisted Type: bool, Indexed: false
   */
  setBlacklistedAddress(
    account: string,
    blacklisted: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param dropId Type: uint256, Indexed: false
   * @param drop Type: tuple, Indexed: false
   */
  setDropInfo(
    dropId: BigNumberish,
    drop: SetDropInfoRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param moderator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setModerator(
    moderator: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param mode Type: uint256, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  setPackIXTPrice(
    mode: BigNumberish,
    price: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param mode Type: uint256, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  setPackPrice(
    mode: BigNumberish,
    price: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setPaymentToken(
    token: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param drop1 Type: uint256, Indexed: false
   * @param drop2 Type: uint256, Indexed: false
   */
  setRelationForDrops(
    drop1: BigNumberish,
    drop2: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param category Type: uint8, Indexed: false
   * @param size Type: uint8, Indexed: false
   * @param tier Type: uint256, Indexed: false
   */
  setTier(
    category: BigNumberish,
    size: BigNumberish,
    tier: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenForPrice Type: address, Indexed: false
   */
  setTokenForPrice(
    _tokenForPrice: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param trader Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setTrader(
    trader: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _treasury Type: address, Indexed: false
   * @param _fee Type: uint256, Indexed: false
   */
  setTreasury(
    _treasury: string,
    _fee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(
    interfaceId: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  swapManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint8, Indexed: false
   * @param parameter1 Type: uint8, Indexed: false
   */
  tiers(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  tokenByIndex(
    index: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  tokenForPrice(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param index Type: uint256, Indexed: false
   */
  tokenOfOwnerByIndex(
    owner: string,
    index: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  traders(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
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
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  treasury(overrides?: ContractCallOverrides): Promise<TreasuryResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokens Type: address[], Indexed: false
   */
  withdraw(
    tokens: string[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
