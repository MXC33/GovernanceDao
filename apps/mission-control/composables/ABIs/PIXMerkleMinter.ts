import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  PIXMerkleMinter,
  PIXMerkleMinterMethodNames,
  PIXMerkleMinterEventsContext,
  PIXMerkleMinterEvents
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
export type PIXMerkleMinterEvents = 'OwnershipTransferred';
export interface PIXMerkleMinterEventsContext {
  OwnershipTransferred(...parameters: any): EventFilter;
}
export type PIXMerkleMinterMethodNames =
  | 'alternativeAddresses'
  | 'alternativeToOwnerAddress'
  | 'delegateMinters'
  | 'disableProof'
  | 'initialize'
  | 'leafUsed'
  | 'merkleRoots'
  | 'mintByProof'
  | 'mintByProofInBatch'
  | 'mintToNewOwner'
  | 'mintToNewOwnerInBatch'
  | 'moderator'
  | 'owner'
  | 'pix'
  | 'renounceOwnership'
  | 'setAlternativeAddress'
  | 'setDelegateMinter'
  | 'setMerkleRoot'
  | 'setModerator'
  | 'transferOwnership';
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface DisableProofRequest {
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface MintByProofRequest {
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface MintByProofInBatchRequest {
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface MintToNewOwnerRequest {
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface MintToNewOwnerInBatchRequest {
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface PIXMerkleMinter {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  alternativeAddresses(
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
  alternativeToOwnerAddress(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  delegateMinters(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param info Type: tuple, Indexed: false
   * @param merkleRoot Type: bytes32, Indexed: false
   * @param merkleProofs Type: bytes32[], Indexed: false
   */
  disableProof(
    to: string,
    info: DisableProofRequest,
    merkleRoot: Arrayish,
    merkleProofs: Arrayish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pix Type: address, Indexed: false
   */
  initialize(
    _pix: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  leafUsed(
    parameter0: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  merkleRoots(
    parameter0: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param info Type: tuple, Indexed: false
   * @param merkleRoot Type: bytes32, Indexed: false
   * @param merkleProofs Type: bytes32[], Indexed: false
   */
  mintByProof(
    to: string,
    info: MintByProofRequest,
    merkleRoot: Arrayish,
    merkleProofs: Arrayish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param info Type: tuple[], Indexed: false
   * @param merkleRoot Type: bytes32[], Indexed: false
   * @param merkleProofs Type: bytes32[][], Indexed: false
   */
  mintByProofInBatch(
    to: string,
    info: MintByProofInBatchRequest[],
    merkleRoot: Arrayish[],
    merkleProofs: Arrayish[][],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param destination Type: address, Indexed: false
   * @param oldOwner Type: address, Indexed: false
   * @param info Type: tuple, Indexed: false
   * @param merkleRoot Type: bytes32, Indexed: false
   * @param merkleProofs Type: bytes32[], Indexed: false
   */
  mintToNewOwner(
    destination: string,
    oldOwner: string,
    info: MintToNewOwnerRequest,
    merkleRoot: Arrayish,
    merkleProofs: Arrayish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param destination Type: address, Indexed: false
   * @param oldOwner Type: address, Indexed: false
   * @param info Type: tuple[], Indexed: false
   * @param merkleRoot Type: bytes32[], Indexed: false
   * @param merkleProofs Type: bytes32[][], Indexed: false
   */
  mintToNewOwnerInBatch(
    destination: string,
    oldOwner: string,
    info: MintToNewOwnerInBatchRequest[],
    merkleRoot: Arrayish[],
    merkleProofs: Arrayish[][],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  moderator(overrides?: ContractCallOverrides): Promise<string>;
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
  pix(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param original Type: address, Indexed: false
   * @param alternative Type: address, Indexed: false
   * @param toSet Type: bool, Indexed: false
   */
  setAlternativeAddress(
    original: string,
    alternative: string,
    toSet: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _minter Type: address, Indexed: false
   * @param enabled Type: bool, Indexed: false
   */
  setDelegateMinter(
    _minter: string,
    enabled: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _merkleRoot Type: bytes32, Indexed: false
   * @param add Type: bool, Indexed: false
   */
  setMerkleRoot(
    _merkleRoot: Arrayish,
    add: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param mod Type: address, Indexed: false
   */
  setModerator(
    mod: string,
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
