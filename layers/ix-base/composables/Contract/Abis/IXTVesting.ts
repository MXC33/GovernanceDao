import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  IXTVesting,
  IXTVestingMethodNames,
  IXTVestingEventsContext,
  IXTVestingEvents
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
export type IXTVestingEvents = 'Claimed' | 'VestInitialized';
export interface IXTVestingEventsContext {
  Claimed(...parameters: any): EventFilter;
  VestInitialized(...parameters: any): EventFilter;
}
export type IXTVestingMethodNames =
  | 'new'
  | 'RELEASE_PERIOD'
  | 'claim'
  | 'claimInBatch'
  | 'getPendingAmount'
  | 'getPendingAmounts'
  | 'initVesting'
  | 'initVestings'
  | 'pixtToken'
  | 'vestInfos'
  | 'vestLength';
export interface ClaimedEventEmittedResponse {
  beneficiary: string;
  amount: BigNumberish;
}
export interface VestInitializedEventEmittedResponse {
  beneficiary: string;
  forward: string;
  forwardPct: BigNumberish;
  startTime: BigNumberish;
  period: BigNumberish;
  amount: BigNumberish;
  vestId: BigNumberish;
}
export interface VestInfosResponse {
  beneficiary: string;
  0: string;
  period: BigNumber;
  1: BigNumber;
  startTime: BigNumber;
  2: BigNumber;
  forward: string;
  3: string;
  forwardPct: BigNumber;
  4: BigNumber;
  amount: BigNumber;
  5: BigNumber;
  claimed: BigNumber;
  6: BigNumber;
  length: 7;
}
export interface IXTVesting {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param pixtToken_ Type: address, Indexed: false
   */
  'new'(
    pixtToken_: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  RELEASE_PERIOD(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: uint256, Indexed: false
   */
  claim(
    id: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ids Type: uint256[], Indexed: false
   */
  claimInBatch(
    ids: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param id Type: uint256, Indexed: false
   */
  getPendingAmount(
    id: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ids Type: uint256[], Indexed: false
   */
  getPendingAmounts(
    ids: BigNumberish[],
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   * @param startTime Type: uint64, Indexed: false
   * @param period Type: uint64, Indexed: false
   * @param beneficiary Type: address, Indexed: false
   * @param forward Type: address, Indexed: false
   * @param forwardPct Type: uint64, Indexed: false
   */
  initVesting(
    amount: BigNumberish,
    startTime: BigNumberish,
    period: BigNumberish,
    beneficiary: string,
    forward: string,
    forwardPct: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amounts Type: uint256[], Indexed: false
   * @param startTimes Type: uint64[], Indexed: false
   * @param periods Type: uint64[], Indexed: false
   * @param beneficiaries Type: address[], Indexed: false
   * @param forwards Type: address[], Indexed: false
   * @param forwardPcts Type: uint64[], Indexed: false
   */
  initVestings(
    amounts: BigNumberish[],
    startTimes: BigNumberish[],
    periods: BigNumberish[],
    beneficiaries: string[],
    forwards: string[],
    forwardPcts: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pixtToken(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  vestInfos(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<VestInfosResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  vestLength(overrides?: ContractCallOverrides): Promise<BigNumber>;
}
