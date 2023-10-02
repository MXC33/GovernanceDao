import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  IConstantFlowAgreement,
  IConstantFlowAgreementMethodNames,
  IConstantFlowAgreementEventsContext,
  IConstantFlowAgreementEvents
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
export type IConstantFlowAgreementEvents =
  | 'FlowOperatorUpdated'
  | 'FlowUpdated'
  | 'FlowUpdatedExtension';
export interface IConstantFlowAgreementEventsContext {
  FlowOperatorUpdated(...parameters: any): EventFilter;
  FlowUpdated(...parameters: any): EventFilter;
  FlowUpdatedExtension(...parameters: any): EventFilter;
}
export type IConstantFlowAgreementMethodNames =
  | 'agreementType'
  | 'authorizeFlowOperatorWithFullControl'
  | 'createFlow'
  | 'createFlowByOperator'
  | 'deleteFlow'
  | 'deleteFlowByOperator'
  | 'getAccountFlowInfo'
  | 'getDepositRequiredForFlowRate'
  | 'getFlow'
  | 'getFlowByID'
  | 'getFlowOperatorData'
  | 'getFlowOperatorDataByID'
  | 'getMaximumFlowRateFromDeposit'
  | 'getNetFlow'
  | 'isPatricianPeriod'
  | 'isPatricianPeriodNow'
  | 'realtimeBalanceOf'
  | 'revokeFlowOperatorWithFullControl'
  | 'updateFlow'
  | 'updateFlowByOperator'
  | 'updateFlowOperatorPermissions';
export interface FlowOperatorUpdatedEventEmittedResponse {
  token: string;
  sender: string;
  flowOperator: string;
  permissions: BigNumberish;
  flowRateAllowance: BigNumberish;
}
export interface FlowUpdatedEventEmittedResponse {
  token: string;
  sender: string;
  receiver: string;
  flowRate: BigNumberish;
  totalSenderFlowRate: BigNumberish;
  totalReceiverFlowRate: BigNumberish;
  userData: Arrayish;
}
export interface FlowUpdatedExtensionEventEmittedResponse {
  flowOperator: string;
  deposit: BigNumberish;
}
export interface GetAccountFlowInfoResponse {
  timestamp: BigNumber;
  0: BigNumber;
  flowRate: BigNumber;
  1: BigNumber;
  deposit: BigNumber;
  2: BigNumber;
  owedDeposit: BigNumber;
  3: BigNumber;
  length: 4;
}
export interface GetFlowResponse {
  timestamp: BigNumber;
  0: BigNumber;
  flowRate: BigNumber;
  1: BigNumber;
  deposit: BigNumber;
  2: BigNumber;
  owedDeposit: BigNumber;
  3: BigNumber;
  length: 4;
}
export interface GetFlowByIDResponse {
  timestamp: BigNumber;
  0: BigNumber;
  flowRate: BigNumber;
  1: BigNumber;
  deposit: BigNumber;
  2: BigNumber;
  owedDeposit: BigNumber;
  3: BigNumber;
  length: 4;
}
export interface GetFlowOperatorDataResponse {
  flowOperatorId: string;
  0: string;
  permissions: number;
  1: number;
  flowRateAllowance: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface GetFlowOperatorDataByIDResponse {
  permissions: number;
  0: number;
  flowRateAllowance: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface IsPatricianPeriodNowResponse {
  isCurrentlyPatricianPeriod: boolean;
  0: boolean;
  timestamp: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface RealtimeBalanceOfResponse {
  dynamicBalance: BigNumber;
  0: BigNumber;
  deposit: BigNumber;
  1: BigNumber;
  owedDeposit: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface IConstantFlowAgreement {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  agreementType(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param flowOperator Type: address, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  authorizeFlowOperatorWithFullControl(
    token: string,
    flowOperator: string,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param receiver Type: address, Indexed: false
   * @param flowRate Type: int96, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  createFlow(
    token: string,
    receiver: string,
    flowRate: BigNumberish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param sender Type: address, Indexed: false
   * @param receiver Type: address, Indexed: false
   * @param flowRate Type: int96, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  createFlowByOperator(
    token: string,
    sender: string,
    receiver: string,
    flowRate: BigNumberish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param sender Type: address, Indexed: false
   * @param receiver Type: address, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  deleteFlow(
    token: string,
    sender: string,
    receiver: string,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param sender Type: address, Indexed: false
   * @param receiver Type: address, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  deleteFlowByOperator(
    token: string,
    sender: string,
    receiver: string,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param account Type: address, Indexed: false
   */
  getAccountFlowInfo(
    token: string,
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<GetAccountFlowInfoResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param flowRate Type: int96, Indexed: false
   */
  getDepositRequiredForFlowRate(
    token: string,
    flowRate: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param sender Type: address, Indexed: false
   * @param receiver Type: address, Indexed: false
   */
  getFlow(
    token: string,
    sender: string,
    receiver: string,
    overrides?: ContractCallOverrides
  ): Promise<GetFlowResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param agreementId Type: bytes32, Indexed: false
   */
  getFlowByID(
    token: string,
    agreementId: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<GetFlowByIDResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param sender Type: address, Indexed: false
   * @param flowOperator Type: address, Indexed: false
   */
  getFlowOperatorData(
    token: string,
    sender: string,
    flowOperator: string,
    overrides?: ContractCallOverrides
  ): Promise<GetFlowOperatorDataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param flowOperatorId Type: bytes32, Indexed: false
   */
  getFlowOperatorDataByID(
    token: string,
    flowOperatorId: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<GetFlowOperatorDataByIDResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param deposit Type: uint256, Indexed: false
   */
  getMaximumFlowRateFromDeposit(
    token: string,
    deposit: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param account Type: address, Indexed: false
   */
  getNetFlow(
    token: string,
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param account Type: address, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   */
  isPatricianPeriod(
    token: string,
    account: string,
    timestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param account Type: address, Indexed: false
   */
  isPatricianPeriodNow(
    token: string,
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<IsPatricianPeriodNowResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   * @param account Type: address, Indexed: false
   * @param time Type: uint256, Indexed: false
   */
  realtimeBalanceOf(
    token: string,
    account: string,
    time: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<RealtimeBalanceOfResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param flowOperator Type: address, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  revokeFlowOperatorWithFullControl(
    token: string,
    flowOperator: string,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param receiver Type: address, Indexed: false
   * @param flowRate Type: int96, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  updateFlow(
    token: string,
    receiver: string,
    flowRate: BigNumberish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param sender Type: address, Indexed: false
   * @param receiver Type: address, Indexed: false
   * @param flowRate Type: int96, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  updateFlowByOperator(
    token: string,
    sender: string,
    receiver: string,
    flowRate: BigNumberish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param flowOperator Type: address, Indexed: false
   * @param permissions Type: uint8, Indexed: false
   * @param flowRateAllowance Type: int96, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  updateFlowOperatorPermissions(
    token: string,
    flowOperator: string,
    permissions: BigNumberish,
    flowRateAllowance: BigNumberish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
