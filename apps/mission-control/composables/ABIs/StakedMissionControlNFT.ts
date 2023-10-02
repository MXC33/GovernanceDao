import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  StakedMissionControlNFT,
  StakedMissionControlNFTMethodNames,
  StakedMissionControlNFTEventsContext,
  StakedMissionControlNFTEvents
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
export type StakedMissionControlNFTEvents =
  | 'OwnershipTransferred'
  | 'TokenStaked'
  | 'TokenUnstaked'
  | 'TokensWhitelisted'
  | 'UnstakeProviderSet';
export interface StakedMissionControlNFTEventsContext {
  OwnershipTransferred(...parameters: any): EventFilter;
  TokenStaked(...parameters: any): EventFilter;
  TokenUnstaked(...parameters: any): EventFilter;
  TokensWhitelisted(...parameters: any): EventFilter;
  UnstakeProviderSet(...parameters: any): EventFilter;
}
export type StakedMissionControlNFTMethodNames =
  | 'getUserStakedAt'
  | 'getUserStakedBalance'
  | 'initialize'
  | 'onERC1155BatchReceived'
  | 'onERC1155Received'
  | 'onERC721Received'
  | 'owner'
  | 'renounceOwnership'
  | 'setUnstakeProvider'
  | 'stakeManyNonFungible'
  | 'stakeManySemiFungible'
  | 'stakeNonFungible'
  | 'stakeSemiFungible'
  | 'supportsInterface'
  | 'tokenWhitelisted'
  | 'transferOwnership'
  | 'unlockProvider'
  | 'unstake'
  | 'unstakeMany'
  | 'userStaked'
  | 'whitelistTokens';
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface TokenStakedEventEmittedResponse {
  tokenAddress: string;
  tokenId: BigNumberish;
  amount: BigNumberish;
  user: string;
}
export interface TokenUnstakedEventEmittedResponse {
  tokenAddress: string;
  tokenId: BigNumberish;
  amount: BigNumberish;
  user: string;
}
export interface TokensWhitelistedEventEmittedResponse {
  tokenAddress: string;
  tokenIds: BigNumberish[];
}
export interface UnstakeProviderSetEventEmittedResponse {
  tokenAddress: string;
  tokenIds: BigNumberish[];
  provider: string;
}
export interface UserStakedResponse {
  amount: BigNumber;
  0: BigNumber;
  lockedAt: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface StakedMissionControlNFT {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _tokenAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  getUserStakedAt(
    _user: string,
    _tokenAddress: string,
    _tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _user Type: address, Indexed: false
   * @param _tokenAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  getUserStakedBalance(
    _user: string,
    _tokenAddress: string,
    _tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256[], Indexed: false
   * @param parameter3 Type: uint256[], Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  onERC1155BatchReceived(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish[],
    parameter3: BigNumberish[],
    parameter4: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   * @param parameter3 Type: uint256, Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  onERC1155Received(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    parameter3: BigNumberish,
    parameter4: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   * @param parameter3 Type: bytes, Indexed: false
   */
  onERC721Received(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    parameter3: Arrayish,
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenAddress Type: address, Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _provider Type: address, Indexed: false
   */
  setUnstakeProvider(
    _tokenAddress: string,
    _tokenIds: BigNumberish[],
    _provider: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _tokenAddresses Type: address[], Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _relayerFee Type: uint256, Indexed: false
   */
  stakeManyNonFungible(
    _tokenAddresses: string[],
    _tokenIds: BigNumberish[],
    _relayerFee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _tokenAddresses Type: address[], Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _amounts Type: uint256[], Indexed: false
   * @param _relayerFee Type: uint256, Indexed: false
   */
  stakeManySemiFungible(
    _tokenAddresses: string[],
    _tokenIds: BigNumberish[],
    _amounts: BigNumberish[],
    _relayerFee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _tokenAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _relayerFee Type: uint256, Indexed: false
   */
  stakeNonFungible(
    _tokenAddress: string,
    _tokenId: BigNumberish,
    _relayerFee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _tokenAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   * @param _relayerFee Type: uint256, Indexed: false
   */
  stakeSemiFungible(
    _tokenAddress: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _relayerFee: BigNumberish,
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
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  tokenWhitelisted(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
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
  unlockProvider(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _tokenAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   * @param _relayerFee Type: uint256, Indexed: false
   */
  unstake(
    _tokenAddress: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _relayerFee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _tokenAddresses Type: address[], Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _amounts Type: uint256[], Indexed: false
   * @param _relayerFee Type: uint256, Indexed: false
   */
  unstakeMany(
    _tokenAddresses: string[],
    _tokenIds: BigNumberish[],
    _amounts: BigNumberish[],
    _relayerFee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   */
  userStaked(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<UserStakedResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenAddress Type: address, Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param isWhitelisted Type: bool, Indexed: false
   */
  whitelistTokens(
    _tokenAddress: string,
    _tokenIds: BigNumberish[],
    isWhitelisted: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
