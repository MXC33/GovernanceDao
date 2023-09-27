import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  UsdcContract,
  UsdcContractMethodNames,
  UsdcContractEventsContext,
  UsdcContractEvents
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
export type UsdcContractEvents =
  | 'Approval'
  | 'AuthorizationCanceled'
  | 'AuthorizationUsed'
  | 'Blacklisted'
  | 'MetaTransactionExecuted'
  | 'Pause'
  | 'RescuerChanged'
  | 'RoleAdminChanged'
  | 'RoleGranted'
  | 'RoleRevoked'
  | 'Transfer'
  | 'UnBlacklisted'
  | 'Unpause';
export interface UsdcContractEventsContext {
  Approval(...parameters: any): EventFilter;
  AuthorizationCanceled(...parameters: any): EventFilter;
  AuthorizationUsed(...parameters: any): EventFilter;
  Blacklisted(...parameters: any): EventFilter;
  MetaTransactionExecuted(...parameters: any): EventFilter;
  Pause(...parameters: any): EventFilter;
  RescuerChanged(...parameters: any): EventFilter;
  RoleAdminChanged(...parameters: any): EventFilter;
  RoleGranted(...parameters: any): EventFilter;
  RoleRevoked(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
  UnBlacklisted(...parameters: any): EventFilter;
  Unpause(...parameters: any): EventFilter;
}
export type UsdcContractMethodNames =
  | 'APPROVE_WITH_AUTHORIZATION_TYPEHASH'
  | 'BLACKLISTER_ROLE'
  | 'CANCEL_AUTHORIZATION_TYPEHASH'
  | 'DECREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH'
  | 'DEFAULT_ADMIN_ROLE'
  | 'DEPOSITOR_ROLE'
  | 'DOMAIN_SEPARATOR'
  | 'EIP712_VERSION'
  | 'INCREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH'
  | 'META_TRANSACTION_TYPEHASH'
  | 'PAUSER_ROLE'
  | 'PERMIT_TYPEHASH'
  | 'RESCUER_ROLE'
  | 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH'
  | 'WITHDRAW_WITH_AUTHORIZATION_TYPEHASH'
  | 'allowance'
  | 'approve'
  | 'approveWithAuthorization'
  | 'authorizationState'
  | 'balanceOf'
  | 'blacklist'
  | 'blacklisters'
  | 'cancelAuthorization'
  | 'decimals'
  | 'decreaseAllowance'
  | 'decreaseAllowanceWithAuthorization'
  | 'deposit'
  | 'executeMetaTransaction'
  | 'getRoleAdmin'
  | 'getRoleMember'
  | 'getRoleMemberCount'
  | 'grantRole'
  | 'hasRole'
  | 'increaseAllowance'
  | 'increaseAllowanceWithAuthorization'
  | 'initialize'
  | 'initialized'
  | 'isBlacklisted'
  | 'name'
  | 'nonces'
  | 'pause'
  | 'paused'
  | 'pausers'
  | 'permit'
  | 'renounceRole'
  | 'rescueERC20'
  | 'rescuers'
  | 'revokeRole'
  | 'symbol'
  | 'totalSupply'
  | 'transfer'
  | 'transferFrom'
  | 'transferWithAuthorization'
  | 'unBlacklist'
  | 'unpause'
  | 'updateMetadata'
  | 'withdraw'
  | 'withdrawWithAuthorization';
export interface ApprovalEventEmittedResponse {
  owner: string;
  spender: string;
  value: BigNumberish;
}
export interface AuthorizationCanceledEventEmittedResponse {
  authorizer: string;
  nonce: Arrayish;
}
export interface AuthorizationUsedEventEmittedResponse {
  authorizer: string;
  nonce: Arrayish;
}
export interface BlacklistedEventEmittedResponse {
  account: string;
}
export interface MetaTransactionExecutedEventEmittedResponse {
  userAddress: string;
  relayerAddress: string;
  functionSignature: Arrayish;
}
export interface RescuerChangedEventEmittedResponse {
  newRescuer: string;
}
export interface RoleAdminChangedEventEmittedResponse {
  role: Arrayish;
  previousAdminRole: Arrayish;
  newAdminRole: Arrayish;
}
export interface RoleGrantedEventEmittedResponse {
  role: Arrayish;
  account: string;
  sender: string;
}
export interface RoleRevokedEventEmittedResponse {
  role: Arrayish;
  account: string;
  sender: string;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  value: BigNumberish;
}
export interface UnBlacklistedEventEmittedResponse {
  account: string;
}
export interface UsdcContract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  APPROVE_WITH_AUTHORIZATION_TYPEHASH(
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  BLACKLISTER_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  CANCEL_AUTHORIZATION_TYPEHASH(
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DECREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH(
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DEFAULT_ADMIN_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DEPOSITOR_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DOMAIN_SEPARATOR(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  EIP712_VERSION(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  INCREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH(
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  META_TRANSACTION_TYPEHASH(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PAUSER_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PERMIT_TYPEHASH(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  RESCUER_ROLE(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  TRANSFER_WITH_AUTHORIZATION_TYPEHASH(
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  WITHDRAW_WITH_AUTHORIZATION_TYPEHASH(
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   */
  allowance(
    owner: string,
    spender: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  approve(
    spender: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param validAfter Type: uint256, Indexed: false
   * @param validBefore Type: uint256, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  approveWithAuthorization(
    owner: string,
    spender: string,
    value: BigNumberish,
    validAfter: BigNumberish,
    validBefore: BigNumberish,
    nonce: Arrayish,
    v: BigNumberish,
    r: Arrayish,
    s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param authorizer Type: address, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   */
  authorizationState(
    authorizer: string,
    nonce: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  balanceOf(
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   */
  blacklist(
    account: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  blacklisters(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param authorizer Type: address, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  cancelAuthorization(
    authorizer: string,
    nonce: Arrayish,
    v: BigNumberish,
    r: Arrayish,
    s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param subtractedValue Type: uint256, Indexed: false
   */
  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param decrement Type: uint256, Indexed: false
   * @param validAfter Type: uint256, Indexed: false
   * @param validBefore Type: uint256, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  decreaseAllowanceWithAuthorization(
    owner: string,
    spender: string,
    decrement: BigNumberish,
    validAfter: BigNumberish,
    validBefore: BigNumberish,
    nonce: Arrayish,
    v: BigNumberish,
    r: Arrayish,
    s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param user Type: address, Indexed: false
   * @param depositData Type: bytes, Indexed: false
   */
  deposit(
    user: string,
    depositData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param userAddress Type: address, Indexed: false
   * @param functionSignature Type: bytes, Indexed: false
   * @param sigR Type: bytes32, Indexed: false
   * @param sigS Type: bytes32, Indexed: false
   * @param sigV Type: uint8, Indexed: false
   */
  executeMetaTransaction(
    userAddress: string,
    functionSignature: Arrayish,
    sigR: Arrayish,
    sigS: Arrayish,
    sigV: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   */
  getRoleAdmin(
    role: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param index Type: uint256, Indexed: false
   */
  getRoleMember(
    role: Arrayish,
    index: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   */
  getRoleMemberCount(
    role: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  grantRole(
    role: Arrayish,
    account: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  hasRole(
    role: Arrayish,
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param addedValue Type: uint256, Indexed: false
   */
  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param increment Type: uint256, Indexed: false
   * @param validAfter Type: uint256, Indexed: false
   * @param validBefore Type: uint256, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  increaseAllowanceWithAuthorization(
    owner: string,
    spender: string,
    increment: BigNumberish,
    validAfter: BigNumberish,
    validBefore: BigNumberish,
    nonce: Arrayish,
    v: BigNumberish,
    r: Arrayish,
    s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newName Type: string, Indexed: false
   * @param newSymbol Type: string, Indexed: false
   * @param newDecimals Type: uint8, Indexed: false
   * @param childChainManager Type: address, Indexed: false
   */
  initialize(
    newName: string,
    newSymbol: string,
    newDecimals: BigNumberish,
    childChainManager: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  initialized(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  isBlacklisted(
    account: string,
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
   * @param owner Type: address, Indexed: false
   */
  nonces(owner: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  pause(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  paused(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pausers(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  permit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: Arrayish,
    s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  renounceRole(
    role: Arrayish,
    account: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenContract Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  rescueERC20(
    tokenContract: string,
    to: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  rescuers(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  revokeRole(
    role: Arrayish,
    account: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  transfer(
    recipient: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sender Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  transferFrom(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param validAfter Type: uint256, Indexed: false
   * @param validBefore Type: uint256, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  transferWithAuthorization(
    from: string,
    to: string,
    value: BigNumberish,
    validAfter: BigNumberish,
    validBefore: BigNumberish,
    nonce: Arrayish,
    v: BigNumberish,
    r: Arrayish,
    s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   */
  unBlacklist(
    account: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  unpause(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newName Type: string, Indexed: false
   * @param newSymbol Type: string, Indexed: false
   */
  updateMetadata(
    newName: string,
    newSymbol: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  withdraw(
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param validAfter Type: uint256, Indexed: false
   * @param validBefore Type: uint256, Indexed: false
   * @param nonce Type: bytes32, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  withdrawWithAuthorization(
    owner: string,
    value: BigNumberish,
    validAfter: BigNumberish,
    validBefore: BigNumberish,
    nonce: Arrayish,
    v: BigNumberish,
    r: Arrayish,
    s: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
