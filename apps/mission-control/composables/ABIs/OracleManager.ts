import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  OracleManager,
  OracleManagerMethodNames,
  OracleManagerEventsContext,
  OracleManagerEvents
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
export type OracleManagerEvents =
  | 'OracleRegistered'
  | 'OracleRemoved'
  | 'OwnershipTransferred'
  | 'StableRegistered'
  | 'StableRemoved';
export interface OracleManagerEventsContext {
  OracleRegistered(...parameters: any): EventFilter;
  OracleRemoved(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  StableRegistered(...parameters: any): EventFilter;
  StableRemoved(...parameters: any): EventFilter;
}
export type OracleManagerMethodNames =
  | 'getAmountOut'
  | 'getAmountOutView'
  | 'initialize'
  | 'oracles'
  | 'owner'
  | 'registerOracle'
  | 'registerStable'
  | 'removeOracle'
  | 'removeStable'
  | 'renounceOwnership'
  | 'stables'
  | 'transferOwnership';
export interface OracleRegisteredEventEmittedResponse {
  token0: string;
  token1: string;
  oracle: string;
}
export interface OracleRemovedEventEmittedResponse {
  token0: string;
  token1: string;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface StableRegisteredEventEmittedResponse {
  token0: string;
  token1: string;
}
export interface StableRemovedEventEmittedResponse {
  token0: string;
  token1: string;
}
export interface OracleManager {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param srcToken Type: address, Indexed: false
   * @param dstToken Type: address, Indexed: false
   * @param amountIn Type: uint256, Indexed: false
   */
  getAmountOut(
    srcToken: string,
    dstToken: string,
    amountIn: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param srcToken Type: address, Indexed: false
   * @param dstToken Type: address, Indexed: false
   * @param amountIn Type: uint256, Indexed: false
   */
  getAmountOutView(
    srcToken: string,
    dstToken: string,
    amountIn: BigNumberish,
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
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  oracles(
    parameter0: string,
    parameter1: string,
    overrides?: ContractCallOverrides
  ): Promise<string>;
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
   * @param token0 Type: address, Indexed: false
   * @param token1 Type: address, Indexed: false
   * @param oracle Type: address, Indexed: false
   */
  registerOracle(
    token0: string,
    token1: string,
    oracle: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token0 Type: address, Indexed: false
   * @param token1 Type: address, Indexed: false
   */
  registerStable(
    token0: string,
    token1: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token0 Type: address, Indexed: false
   * @param token1 Type: address, Indexed: false
   */
  removeOracle(
    token0: string,
    token1: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token0 Type: address, Indexed: false
   * @param token1 Type: address, Indexed: false
   */
  removeStable(
    token0: string,
    token1: string,
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
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  stables(
    parameter0: string,
    parameter1: string,
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
}
