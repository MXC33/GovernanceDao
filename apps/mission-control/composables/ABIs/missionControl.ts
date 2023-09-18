import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  MissionControl,
  MissionControlMethodNames,
  MissionControlEventsContext,
  MissionControlEvents
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
export type MissionControlEvents =
  | 'LootCrateFound'
  | 'MintSet'
  | 'NFTPlaced'
  | 'NFTRemoved'
  | 'OwnershipTransferred'
  | 'RadiusSet'
  | 'Raid'
  | 'WhitelistSet';
export interface MissionControlEventsContext {
  LootCrateFound(...parameters: any): EventFilter;
  MintSet(...parameters: any): EventFilter;
  NFTPlaced(...parameters: any): EventFilter;
  NFTRemoved(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  RadiusSet(...parameters: any): EventFilter;
  Raid(...parameters: any): EventFilter;
  WhitelistSet(...parameters: any): EventFilter;
}
export type MissionControlMethodNames =
  | 'addCoords'
  | 'checkLastUpdated'
  | 'checkStakedOnTile'
  | 'checkTile'
  | 'collectFromTiles'
  | 'collectFromTilesAndRemove'
  | 'coords'
  | 'enableSignature'
  | 'initialize'
  | 'nonces'
  | 'notifyRaided'
  | 'owner'
  | 'paused'
  | 'placeNFT'
  | 'placeNFTs'
  | 'removeNFT'
  | 'removeNFTs'
  | 'renounceOwnership'
  | 'setMint'
  | 'setRadius'
  | 'setRaidParams'
  | 'setRaidSigner'
  | 'setSignature'
  | 'setStakeableAlias'
  | 'setWhitelist'
  | 'timeLeft'
  | 'transferOwnership';
export interface LootCrateFoundEventEmittedResponse {
  user: string;
}
export interface MintSetEventEmittedResponse {
  newMint: string;
}
export interface NFTPlacedEventEmittedResponse {
  user: string;
  tokenAddress: string;
  tokenId: BigNumberish;
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface NFTRemovedEventEmittedResponse {
  user: string;
  tokenAddress: string;
  underlyingAddress: string;
  tokenId: BigNumberish;
  underlyingTokenId: BigNumberish;
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface RadiusSetEventEmittedResponse {
  newRadius: BigNumberish;
}
export interface RaidEventEmittedResponse {
  defender: string;
  raidId: BigNumberish;
  booty: BigNumberish;
  timeStamp: BigNumberish;
}
export interface WhitelistSetEventEmittedResponse {
  token: string;
  whitelisted: boolean;
}
export interface AddCoordsRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface _baseResponse {
  stakeable: string;
  0: string;
  tokenId: BigNumber;
  1: BigNumber;
  nonce: BigNumber;
  2: BigNumber;
}
export interface _topResponse {
  stakeable: string;
  0: string;
  tokenId: BigNumber;
  1: BigNumber;
  nonce: BigNumber;
  2: BigNumber;
}
export interface CheckStakedOnTileResponse {
  _base: _baseResponse;
  0: _baseResponse;
  _top: _topResponse;
  1: _topResponse;
  length: 2;
}
export interface CheckTileResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface CollectFromTilesRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface CoordsResponse {
  x: BigNumber;
  0: BigNumber;
  y: BigNumber;
  1: BigNumber;
  z: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface NotifyRaidedRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface PlaceNFTsRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
  tokenId: BigNumberish;
  tokenAddress: string;
}
export interface RemoveNFTsRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
  tokenId: BigNumberish;
  tokenAddress: string;
}
export interface MissionControl {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _coords Type: tuple[], Indexed: false
   */
  addCoords(
    _coords: AddCoordsRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param _z Type: int256, Indexed: false
   */
  checkLastUpdated(
    _user: string,
    _x: BigNumberish,
    _y: BigNumberish,
    _z: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param _z Type: int256, Indexed: false
   */
  checkStakedOnTile(
    _user: string,
    _x: BigNumberish,
    _y: BigNumberish,
    _z: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CheckStakedOnTileResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param _z Type: int256, Indexed: false
   */
  checkTile(
    _user: string,
    _x: BigNumberish,
    _y: BigNumberish,
    _z: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CheckTileResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _orders Type: tuple[], Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  collectFromTiles(
    _orders: CollectFromTilesRequest[],
    _v: BigNumberish,
    _r: Arrayish,
    _s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  collectFromTilesAndRemove(
    _v: BigNumberish,
    _r: Arrayish,
    _s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  coords(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<CoordsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  enableSignature(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _radius Type: uint256, Indexed: false
   * @param _mint Type: address, Indexed: false
   */
  initialize(
    _radius: BigNumberish,
    _mint: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _defender Type: address, Indexed: false
   * @param _timestamp Type: uint256, Indexed: false
   * @param _raidId Type: uint256, Indexed: false
   * @param _orders Type: tuple[], Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  notifyRaided(
    _defender: string,
    _timestamp: BigNumberish,
    _raidId: BigNumberish,
    _orders: NotifyRaidedRequest[],
    _v: BigNumberish,
    _r: Arrayish,
    _s: Arrayish,
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
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param _z Type: int256, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _tokenAddress Type: address, Indexed: false
   */
  placeNFT(
    _x: BigNumberish,
    _y: BigNumberish,
    _z: BigNumberish,
    _tokenId: BigNumberish,
    _tokenAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _placeOrders Type: tuple[], Indexed: false
   */
  placeNFTs(
    _placeOrders: PlaceNFTsRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param _z Type: int256, Indexed: false
   */
  removeNFT(
    _x: BigNumberish,
    _y: BigNumberish,
    _z: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _placeOrders Type: tuple[], Indexed: false
   */
  removeNFTs(
    _placeOrders: RemoveNFTsRequest[],
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
   * @param _mint Type: address, Indexed: false
   */
  setMint(
    _mint: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _radius Type: uint256, Indexed: false
   */
  setRadius(
    _radius: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _timeout Type: int256, Indexed: false
   */
  setRaidParams(
    _timeout: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _address Type: address, Indexed: false
   * @param _isSigner Type: bool, Indexed: false
   */
  setRaidSigner(
    _address: string,
    _isSigner: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _requiresSignature Type: bool, Indexed: false
   */
  setSignature(
    _requiresSignature: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _token Type: address, Indexed: false
   * @param _alias Type: address, Indexed: false
   */
  setStakeableAlias(
    _token: string,
    _alias: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _token Type: address, Indexed: false
   * @param _whitelisted Type: bool, Indexed: false
   */
  setWhitelist(
    _token: string,
    _whitelisted: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param _z Type: int256, Indexed: false
   */
  timeLeft(
    _user: string,
    _x: BigNumberish,
    _y: BigNumberish,
    _z: BigNumberish,
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
}
