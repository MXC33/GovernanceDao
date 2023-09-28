import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  MissionControlv2,
  MissionControlv2MethodNames,
  MissionControlv2EventsContext,
  MissionControlv2Events
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
export type MissionControlv2Events =
  | 'LootCrateFound'
  | 'MintSet'
  | 'NFTPlaced'
  | 'NFTRemoved'
  | 'OwnershipTransferred'
  | 'RadiusSet'
  | 'Raid'
  | 'WhitelistSet';
export interface MissionControlv2EventsContext {
  LootCrateFound(...parameters: any): EventFilter;
  MintSet(...parameters: any): EventFilter;
  NFTPlaced(...parameters: any): EventFilter;
  NFTRemoved(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  RadiusSet(...parameters: any): EventFilter;
  Raid(...parameters: any): EventFilter;
  WhitelistSet(...parameters: any): EventFilter;
}
export type MissionControlv2MethodNames =
  | 'allowedRadius'
  | 'checkLastUpdated'
  | 'checkStakedOnTile'
  | 'checkTile'
  | 'collectFromTiles'
  | 'createRentTiles'
  | 'deleteRentTiles'
  | 'enableSignature'
  | 'getAllowedRadius'
  | 'getTileRentalInfo'
  | 'getTileRequirements'
  | 'getUserRentals'
  | 'initialize'
  | 'nonces'
  | 'owner'
  | 'placeNFTs'
  | 'removeNFTs'
  | 'renounceOwnership'
  | 'setAGold'
  | 'setAGoldLite'
  | 'setCrosschainServices'
  | 'setMint'
  | 'setMissionControlStaking'
  | 'setRadius'
  | 'setRaidSigner'
  | 'setSignature'
  | 'setStreamer'
  | 'setTileContractLockProvider'
  | 'setTileContracts'
  | 'setTileRequirements'
  | 'setWhitelist'
  | 'streamer'
  | 'tileRentalInfo'
  | 'tileRequirements'
  | 'tiles'
  | 'timeLeft'
  | 'toggleTile'
  | 'transferOwnership'
  | 'updateRentTiles'
  | 'userTilesPaused'
  | 'whiteList';
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
}
export interface NFTRemovedEventEmittedResponse {
  user: string;
  tokenAddress: string;
  underlyingAddress: string;
  tokenId: BigNumberish;
  underlyingTokenId: BigNumberish;
  x: BigNumberish;
  y: BigNumberish;
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
export interface _baseResponse {
  stakeable: string;
  0: string;
  tokenId: BigNumber;
  1: BigNumber;
  nonce: BigNumber;
  2: BigNumber;
}
export interface _top1Response {
  stakeable: string;
  0: string;
  tokenId: BigNumber;
  1: BigNumber;
  nonce: BigNumber;
  2: BigNumber;
}
export interface _top2Response {
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
  _top1: _top1Response;
  1: _top1Response;
  _top2: _top2Response;
  2: _top2Response;
  length: 3;
}
export interface CheckTileRequest {
  user: string;
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface OutResponse {
  bottomAmount: BigNumber;
  0: BigNumber;
  bottomId: BigNumber;
  1: BigNumber;
  topAmount1: BigNumber;
  2: BigNumber;
  topId1: BigNumber;
  3: BigNumber;
  topAmount2: BigNumber;
  4: BigNumber;
  topId2: BigNumber;
  5: BigNumber;
}
export interface CollectFromTilesRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface CreateRentTilesRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface _infoResponse {
  isRented: boolean;
  0: boolean;
  pausedAt: BigNumber;
  1: BigNumber;
  rentalToken: string;
  2: string;
}
export interface _requirementsResponse {
  price: BigNumber;
  0: BigNumber;
  tileContractId: BigNumber;
  1: BigNumber;
}
export interface _ordersResponse {
  x: BigNumber;
  0: BigNumber;
  y: BigNumber;
  1: BigNumber;
  z: BigNumber;
  2: BigNumber;
}
export interface OrderRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface PlaceNFTsRequest {
  order: OrderRequest;
  tokenId: BigNumberish;
  tokenAddress: string;
}
export interface RemoveNFTsRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface TileRentalInfoResponse {
  isRented: boolean;
  0: boolean;
  pausedAt: BigNumber;
  1: BigNumber;
  rentalToken: string;
  2: string;
  length: 3;
}
export interface TileRequirementsResponse {
  price: BigNumber;
  0: BigNumber;
  tileContractId: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface TilesResponse {
  stakeable: string;
  0: string;
  tokenId: BigNumber;
  1: BigNumber;
  nonce: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface TimeLeftResponse {
  _timeLeftBottom: BigNumber;
  0: BigNumber;
  _timeLeftTop1: BigNumber;
  1: BigNumber;
  _timeLeftTop2: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface UpdateRentTilesRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface MissionControlv2 {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  allowedRadius(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param _z Type: int256, Indexed: false
   * @param _position Type: uint256, Indexed: false
   */
  checkLastUpdated(
    _user: string,
    _x: BigNumberish,
    _y: BigNumberish,
    _z: BigNumberish,
    _position: BigNumberish,
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
   * @param args Type: tuple, Indexed: false
   */
  checkTile(
    args: CheckTileRequest,
    overrides?: ContractCallOverrides
  ): Promise<OutResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _orders Type: tuple[], Indexed: false
   * @param _positions Type: uint256[], Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  collectFromTiles(
    _orders: CollectFromTilesRequest[],
    _positions: BigNumberish[],
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
   * @param _supertoken Type: address, Indexed: false
   * @param _renter Type: address, Indexed: false
   * @param _order Type: tuple[], Indexed: false
   * @param _flowRate Type: int96, Indexed: false
   */
  createRentTiles(
    _supertoken: string,
    _renter: string,
    _order: CreateRentTilesRequest[],
    _flowRate: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _supertoken Type: address, Indexed: false
   * @param _renter Type: address, Indexed: false
   */
  deleteRentTiles(
    _supertoken: string,
    _renter: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  enableSignature(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllowedRadius(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   */
  getTileRentalInfo(
    _user: string,
    _x: BigNumberish,
    _y: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<_infoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   */
  getTileRequirements(
    _x: BigNumberish,
    _y: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<_requirementsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _renter Type: address, Indexed: false
   * @param _supertoken Type: address, Indexed: false
   */
  getUserRentals(
    _renter: string,
    _supertoken: string,
    overrides?: ContractCallOverrides
  ): Promise<_ordersResponse[]>;
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
   * @param _orders Type: tuple[], Indexed: false
   * @param _positions Type: uint256[], Indexed: false
   * @param _v Type: uint8, Indexed: false
   * @param _r Type: bytes32, Indexed: false
   * @param _s Type: bytes32, Indexed: false
   */
  removeNFTs(
    _orders: RemoveNFTsRequest[],
    _positions: BigNumberish[],
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
   */
  renounceOwnership(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _aGold Type: address, Indexed: false
   */
  setAGold(
    _aGold: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _aGoldLite Type: address, Indexed: false
   */
  setAGoldLite(
    _aGoldLite: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _crosschainServices Type: address, Indexed: false
   */
  setCrosschainServices(
    _crosschainServices: string,
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
   * @param _staking Type: address, Indexed: false
   */
  setMissionControlStaking(
    _staking: string,
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
   * @param _streamer Type: address, Indexed: false
   */
  setStreamer(
    _streamer: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tileContractLockProvider Type: address, Indexed: false
   */
  setTileContractLockProvider(
    _tileContractLockProvider: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tileContracts Type: address, Indexed: false
   */
  setTileContracts(
    _tileContracts: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param _price Type: uint256, Indexed: false
   * @param _tileContractId Type: uint256, Indexed: false
   */
  setTileRequirements(
    _x: BigNumberish,
    _y: BigNumberish,
    _price: BigNumberish,
    _tileContractId: BigNumberish,
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
   */
  streamer(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: int256, Indexed: false
   * @param parameter2 Type: int256, Indexed: false
   */
  tileRentalInfo(
    parameter0: string,
    parameter1: BigNumberish,
    parameter2: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<TileRentalInfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: int256, Indexed: false
   * @param parameter1 Type: int256, Indexed: false
   */
  tileRequirements(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<TileRequirementsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: int256, Indexed: false
   * @param parameter2 Type: int256, Indexed: false
   * @param parameter3 Type: uint256, Indexed: false
   */
  tiles(
    parameter0: string,
    parameter1: BigNumberish,
    parameter2: BigNumberish,
    parameter3: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<TilesResponse>;
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
  ): Promise<TimeLeftResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _renter Type: address, Indexed: false
   * @param _x Type: int256, Indexed: false
   * @param _y Type: int256, Indexed: false
   * @param rad Type: uint256, Indexed: false
   * @param _shouldPause Type: bool, Indexed: false
   */
  toggleTile(
    _renter: string,
    _x: BigNumberish,
    _y: BigNumberish,
    rad: BigNumberish,
    _shouldPause: boolean,
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
   * @param _supertoken Type: address, Indexed: false
   * @param _renter Type: address, Indexed: false
   * @param _order Type: tuple[], Indexed: false
   * @param _removeTiles Type: tuple[], Indexed: false
   * @param _oldFlowRate Type: int96, Indexed: false
   * @param _flowRate Type: int96, Indexed: false
   */
  updateRentTiles(
    _supertoken: string,
    _renter: string,
    _order: UpdateRentTilesRequest[],
    _removeTiles: UpdateRentTilesRequest[],
    _oldFlowRate: BigNumberish,
    _flowRate: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  userTilesPaused(
    parameter0: string,
    parameter1: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  whiteList(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
}
