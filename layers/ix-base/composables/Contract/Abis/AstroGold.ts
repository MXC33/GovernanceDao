import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  AstroGold,
  AstroGoldMethodNames,
  AstroGoldEventsContext,
  AstroGoldEvents
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
export type AstroGoldEvents =
  | 'AgreementCreated'
  | 'AgreementLiquidated'
  | 'AgreementLiquidatedBy'
  | 'AgreementLiquidatedV2'
  | 'AgreementStateUpdated'
  | 'AgreementTerminated'
  | 'AgreementUpdated'
  | 'Approval'
  | 'AuthorizedOperator'
  | 'Bailout'
  | 'Burned'
  | 'CodeUpdated'
  | 'ConstantInflowNFTCreated'
  | 'ConstantOutflowNFTCreated'
  | 'Initialized'
  | 'Minted'
  | 'PoolAdminNFTCreated'
  | 'PoolMemberNFTCreated'
  | 'RevokedOperator'
  | 'Sent'
  | 'TokenDowngraded'
  | 'TokenUpgraded'
  | 'Transfer';
export interface AstroGoldEventsContext {
  AgreementCreated(...parameters: any): EventFilter;
  AgreementLiquidated(...parameters: any): EventFilter;
  AgreementLiquidatedBy(...parameters: any): EventFilter;
  AgreementLiquidatedV2(...parameters: any): EventFilter;
  AgreementStateUpdated(...parameters: any): EventFilter;
  AgreementTerminated(...parameters: any): EventFilter;
  AgreementUpdated(...parameters: any): EventFilter;
  Approval(...parameters: any): EventFilter;
  AuthorizedOperator(...parameters: any): EventFilter;
  Bailout(...parameters: any): EventFilter;
  Burned(...parameters: any): EventFilter;
  CodeUpdated(...parameters: any): EventFilter;
  ConstantInflowNFTCreated(...parameters: any): EventFilter;
  ConstantOutflowNFTCreated(...parameters: any): EventFilter;
  Initialized(...parameters: any): EventFilter;
  Minted(...parameters: any): EventFilter;
  PoolAdminNFTCreated(...parameters: any): EventFilter;
  PoolMemberNFTCreated(...parameters: any): EventFilter;
  RevokedOperator(...parameters: any): EventFilter;
  Sent(...parameters: any): EventFilter;
  TokenDowngraded(...parameters: any): EventFilter;
  TokenUpgraded(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
}
export type AstroGoldMethodNames =
  | 'new'
  | 'CONSTANT_INFLOW_NFT'
  | 'CONSTANT_OUTFLOW_NFT'
  | 'POOL_ADMIN_NFT'
  | 'POOL_MEMBER_NFT'
  | 'allowance'
  | 'approve'
  | 'authorizeOperator'
  | 'balanceOf'
  | 'burn'
  | 'castrate'
  | 'createAgreement'
  | 'decimals'
  | 'decreaseAllowance'
  | 'defaultOperators'
  | 'downgrade'
  | 'downgradeTo'
  | 'getAccountActiveAgreements'
  | 'getAgreementData'
  | 'getAgreementStateSlot'
  | 'getCodeAddress'
  | 'getHost'
  | 'getUnderlyingToken'
  | 'granularity'
  | 'increaseAllowance'
  | 'initialize'
  | 'isAccountCritical'
  | 'isAccountCriticalNow'
  | 'isAccountSolvent'
  | 'isAccountSolventNow'
  | 'isOperatorFor'
  | 'makeLiquidationPayoutsV2'
  | 'name'
  | 'operationApprove'
  | 'operationDecreaseAllowance'
  | 'operationDowngrade'
  | 'operationIncreaseAllowance'
  | 'operationSend'
  | 'operationTransferFrom'
  | 'operationUpgrade'
  | 'operatorBurn'
  | 'operatorSend'
  | 'proxiableUUID'
  | 'realtimeBalanceOf'
  | 'realtimeBalanceOfNow'
  | 'revokeOperator'
  | 'selfApproveFor'
  | 'selfBurn'
  | 'selfMint'
  | 'selfTransferFrom'
  | 'send'
  | 'settleBalance'
  | 'symbol'
  | 'terminateAgreement'
  | 'totalSupply'
  | 'transfer'
  | 'transferAll'
  | 'transferFrom'
  | 'updateAgreementData'
  | 'updateAgreementStateSlot'
  | 'updateCode'
  | 'upgrade'
  | 'upgradeTo';
export interface AgreementCreatedEventEmittedResponse {
  agreementClass: string;
  id: Arrayish;
  data: Arrayish[];
}
export interface AgreementLiquidatedEventEmittedResponse {
  agreementClass: string;
  id: Arrayish;
  penaltyAccount: string;
  rewardAccount: string;
  rewardAmount: BigNumberish;
}
export interface AgreementLiquidatedByEventEmittedResponse {
  liquidatorAccount: string;
  agreementClass: string;
  id: Arrayish;
  penaltyAccount: string;
  bondAccount: string;
  rewardAmount: BigNumberish;
  bailoutAmount: BigNumberish;
}
export interface AgreementLiquidatedV2EventEmittedResponse {
  agreementClass: string;
  id: Arrayish;
  liquidatorAccount: string;
  targetAccount: string;
  rewardAmountReceiver: string;
  rewardAmount: BigNumberish;
  targetAccountBalanceDelta: BigNumberish;
  liquidationTypeData: Arrayish;
}
export interface AgreementStateUpdatedEventEmittedResponse {
  agreementClass: string;
  account: string;
  slotId: BigNumberish;
}
export interface AgreementTerminatedEventEmittedResponse {
  agreementClass: string;
  id: Arrayish;
}
export interface AgreementUpdatedEventEmittedResponse {
  agreementClass: string;
  id: Arrayish;
  data: Arrayish[];
}
export interface ApprovalEventEmittedResponse {
  owner: string;
  spender: string;
  value: BigNumberish;
}
export interface AuthorizedOperatorEventEmittedResponse {
  operator: string;
  tokenHolder: string;
}
export interface BailoutEventEmittedResponse {
  bailoutAccount: string;
  bailoutAmount: BigNumberish;
}
export interface BurnedEventEmittedResponse {
  operator: string;
  from: string;
  amount: BigNumberish;
  data: Arrayish;
  operatorData: Arrayish;
}
export interface CodeUpdatedEventEmittedResponse {
  uuid: Arrayish;
  codeAddress: string;
}
export interface ConstantInflowNFTCreatedEventEmittedResponse {
  constantInflowNFT: string;
}
export interface ConstantOutflowNFTCreatedEventEmittedResponse {
  constantOutflowNFT: string;
}
export interface InitializedEventEmittedResponse {
  version: BigNumberish;
}
export interface MintedEventEmittedResponse {
  operator: string;
  to: string;
  amount: BigNumberish;
  data: Arrayish;
  operatorData: Arrayish;
}
export interface PoolAdminNFTCreatedEventEmittedResponse {
  poolAdminNFT: string;
}
export interface PoolMemberNFTCreatedEventEmittedResponse {
  poolMemberNFT: string;
}
export interface RevokedOperatorEventEmittedResponse {
  operator: string;
  tokenHolder: string;
}
export interface SentEventEmittedResponse {
  operator: string;
  from: string;
  to: string;
  amount: BigNumberish;
  data: Arrayish;
  operatorData: Arrayish;
}
export interface TokenDowngradedEventEmittedResponse {
  account: string;
  amount: BigNumberish;
}
export interface TokenUpgradedEventEmittedResponse {
  account: string;
  amount: BigNumberish;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  value: BigNumberish;
}
export interface RealtimeBalanceOfResponse {
  availableBalance: BigNumber;
  0: BigNumber;
  deposit: BigNumber;
  1: BigNumber;
  owedDeposit: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface RealtimeBalanceOfNowResponse {
  availableBalance: BigNumber;
  0: BigNumber;
  deposit: BigNumber;
  1: BigNumber;
  owedDeposit: BigNumber;
  2: BigNumber;
  timestamp: BigNumber;
  3: BigNumber;
  length: 4;
}
export interface AstroGold {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param host Type: address, Indexed: false
   * @param constantOutflowNFT Type: address, Indexed: false
   * @param constantInflowNFT Type: address, Indexed: false
   * @param poolAdminNFT Type: address, Indexed: false
   * @param poolMemberNFT Type: address, Indexed: false
   */
  'new'(
    host: string,
    constantOutflowNFT: string,
    constantInflowNFT: string,
    poolAdminNFT: string,
    poolMemberNFT: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  CONSTANT_INFLOW_NFT(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  CONSTANT_OUTFLOW_NFT(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  POOL_ADMIN_NFT(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  POOL_MEMBER_NFT(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   */
  allowance(
    account: string,
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
   * @param operator Type: address, Indexed: false
   */
  authorizeOperator(
    operator: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * @param amount Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  burn(
    amount: BigNumberish,
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  castrate(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: bytes32, Indexed: false
   * @param data Type: bytes32[], Indexed: false
   */
  createAgreement(
    id: Arrayish,
    data: Arrayish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
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
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  defaultOperators(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  downgrade(
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  downgradeTo(
    to: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  getAccountActiveAgreements(
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param agreementClass Type: address, Indexed: false
   * @param id Type: bytes32, Indexed: false
   * @param dataLength Type: uint256, Indexed: false
   */
  getAgreementData(
    agreementClass: string,
    id: Arrayish,
    dataLength: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param agreementClass Type: address, Indexed: false
   * @param account Type: address, Indexed: false
   * @param slotId Type: uint256, Indexed: false
   * @param dataLength Type: uint256, Indexed: false
   */
  getAgreementStateSlot(
    agreementClass: string,
    account: string,
    slotId: BigNumberish,
    dataLength: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCodeAddress(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getHost(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getUnderlyingToken(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  granularity(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   * @param underlyingToken Type: address, Indexed: false
   * @param underlyingDecimals Type: uint8, Indexed: false
   * @param n Type: string, Indexed: false
   * @param s Type: string, Indexed: false
   */
  initialize(
    underlyingToken: string,
    underlyingDecimals: BigNumberish,
    n: string,
    s: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   */
  isAccountCritical(
    account: string,
    timestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  isAccountCriticalNow(
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   */
  isAccountSolvent(
    account: string,
    timestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  isAccountSolventNow(
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param tokenHolder Type: address, Indexed: false
   */
  isOperatorFor(
    operator: string,
    tokenHolder: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: bytes32, Indexed: false
   * @param liquidationTypeData Type: bytes, Indexed: false
   * @param liquidatorAccount Type: address, Indexed: false
   * @param useDefaultRewardAccount Type: bool, Indexed: false
   * @param targetAccount Type: address, Indexed: false
   * @param rewardAmount Type: uint256, Indexed: false
   * @param targetAccountBalanceDelta Type: int256, Indexed: false
   */
  makeLiquidationPayoutsV2(
    id: Arrayish,
    liquidationTypeData: Arrayish,
    liquidatorAccount: string,
    useDefaultRewardAccount: boolean,
    targetAccount: string,
    rewardAmount: BigNumberish,
    targetAccountBalanceDelta: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  operationApprove(
    account: string,
    spender: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param subtractedValue Type: uint256, Indexed: false
   */
  operationDecreaseAllowance(
    account: string,
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  operationDowngrade(
    account: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param addedValue Type: uint256, Indexed: false
   */
  operationIncreaseAllowance(
    account: string,
    spender: string,
    addedValue: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param userData Type: bytes, Indexed: false
   */
  operationSend(
    spender: string,
    recipient: string,
    amount: BigNumberish,
    userData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  operationTransferFrom(
    account: string,
    spender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  operationUpgrade(
    account: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   * @param operatorData Type: bytes, Indexed: false
   */
  operatorBurn(
    account: string,
    amount: BigNumberish,
    data: Arrayish,
    operatorData: Arrayish,
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
   * @param data Type: bytes, Indexed: false
   * @param operatorData Type: bytes, Indexed: false
   */
  operatorSend(
    sender: string,
    recipient: string,
    amount: BigNumberish,
    data: Arrayish,
    operatorData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  proxiableUUID(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param timestamp Type: uint256, Indexed: false
   */
  realtimeBalanceOf(
    account: string,
    timestamp: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<RealtimeBalanceOfResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  realtimeBalanceOfNow(
    account: string,
    overrides?: ContractCallOverrides
  ): Promise<RealtimeBalanceOfNowResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   */
  revokeOperator(
    operator: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  selfApproveFor(
    account: string,
    spender: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param userData Type: bytes, Indexed: false
   */
  selfBurn(
    account: string,
    amount: BigNumberish,
    userData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param userData Type: bytes, Indexed: false
   */
  selfMint(
    account: string,
    amount: BigNumberish,
    userData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param holder Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  selfTransferFrom(
    holder: string,
    spender: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  send(
    recipient: string,
    amount: BigNumberish,
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param delta Type: int256, Indexed: false
   */
  settleBalance(
    account: string,
    delta: BigNumberish,
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: bytes32, Indexed: false
   * @param dataLength Type: uint256, Indexed: false
   */
  terminateAgreement(
    id: Arrayish,
    dataLength: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * @param recipient Type: address, Indexed: false
   */
  transferAll(
    recipient: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param holder Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  transferFrom(
    holder: string,
    recipient: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: bytes32, Indexed: false
   * @param data Type: bytes32[], Indexed: false
   */
  updateAgreementData(
    id: Arrayish,
    data: Arrayish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param account Type: address, Indexed: false
   * @param slotId Type: uint256, Indexed: false
   * @param slotData Type: bytes32[], Indexed: false
   */
  updateAgreementStateSlot(
    account: string,
    slotId: BigNumberish,
    slotData: Arrayish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newAddress Type: address, Indexed: false
   */
  updateCode(
    newAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  upgrade(
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  upgradeTo(
    to: string,
    amount: BigNumberish,
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
