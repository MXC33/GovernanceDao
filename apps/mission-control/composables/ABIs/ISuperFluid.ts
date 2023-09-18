import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  ISuperFluid,
  ISuperFluidMethodNames,
  ISuperFluidEventsContext,
  ISuperFluidEvents
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
export type ISuperFluidEvents =
  | 'AgreementClassRegistered'
  | 'AgreementClassUpdated'
  | 'AppRegistered'
  | 'GovernanceReplaced'
  | 'Jail'
  | 'SuperTokenFactoryUpdated'
  | 'SuperTokenLogicUpdated';
export interface ISuperFluidEventsContext {
  AgreementClassRegistered(...parameters: any): EventFilter;
  AgreementClassUpdated(...parameters: any): EventFilter;
  AppRegistered(...parameters: any): EventFilter;
  GovernanceReplaced(...parameters: any): EventFilter;
  Jail(...parameters: any): EventFilter;
  SuperTokenFactoryUpdated(...parameters: any): EventFilter;
  SuperTokenLogicUpdated(...parameters: any): EventFilter;
}
export type ISuperFluidMethodNames =
  | 'addToAgreementClassesBitmap'
  | 'allowCompositeApp'
  | 'appCallbackPop'
  | 'appCallbackPush'
  | 'batchCall'
  | 'callAgreement'
  | 'callAgreementWithContext'
  | 'callAppAction'
  | 'callAppActionWithContext'
  | 'callAppAfterCallback'
  | 'callAppBeforeCallback'
  | 'ctxUseCredit'
  | 'decodeCtx'
  | 'forwardBatchCall'
  | 'getAgreementClass'
  | 'getAppCallbackLevel'
  | 'getAppManifest'
  | 'getGovernance'
  | 'getNow'
  | 'getSuperTokenFactory'
  | 'getSuperTokenFactoryLogic'
  | 'isAgreementClassListed'
  | 'isAgreementTypeListed'
  | 'isApp'
  | 'isAppJailed'
  | 'isCompositeAppAllowed'
  | 'isCtxValid'
  | 'jailApp'
  | 'mapAgreementClasses'
  | 'registerAgreementClass'
  | 'registerApp'
  | 'registerAppByFactory'
  | 'registerAppWithKey'
  | 'removeFromAgreementClassesBitmap'
  | 'replaceGovernance'
  | 'updateAgreementClass'
  | 'updateSuperTokenFactory'
  | 'updateSuperTokenLogic';
export interface AgreementClassRegisteredEventEmittedResponse {
  agreementType: Arrayish;
  code: string;
}
export interface AgreementClassUpdatedEventEmittedResponse {
  agreementType: Arrayish;
  code: string;
}
export interface AppRegisteredEventEmittedResponse {
  app: string;
}
export interface GovernanceReplacedEventEmittedResponse {
  oldGov: string;
  newGov: string;
}
export interface JailEventEmittedResponse {
  app: string;
  reason: BigNumberish;
}
export interface SuperTokenFactoryUpdatedEventEmittedResponse {
  newFactory: string;
}
export interface SuperTokenLogicUpdatedEventEmittedResponse {
  token: string;
  code: string;
}
export interface BatchCallRequest {
  operationType: BigNumberish;
  target: string;
  data: Arrayish;
}
export interface ContextResponse {
  appCallbackLevel: number;
  0: number;
  callType: number;
  1: number;
  timestamp: BigNumber;
  2: BigNumber;
  msgSender: string;
  3: string;
  agreementSelector: string;
  4: string;
  userData: string;
  5: string;
  appCreditGranted: BigNumber;
  6: BigNumber;
  appCreditWantedDeprecated: BigNumber;
  7: BigNumber;
  appCreditUsed: BigNumber;
  8: BigNumber;
  appAddress: string;
  9: string;
  appCreditToken: string;
  10: string;
}
export interface ForwardBatchCallRequest {
  operationType: BigNumberish;
  target: string;
  data: Arrayish;
}
export interface GetAppManifestResponse {
  isSuperApp: boolean;
  0: boolean;
  isJailed: boolean;
  1: boolean;
  noopMask: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface ISuperFluid {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param bitmap Type: uint256, Indexed: false
   * @param agreementType Type: bytes32, Indexed: false
   */
  addToAgreementClassesBitmap(
    bitmap: BigNumberish,
    agreementType: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param targetApp Type: address, Indexed: false
   */
  allowCompositeApp(
    targetApp: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ctx Type: bytes, Indexed: false
   * @param appCreditUsedDelta Type: int256, Indexed: false
   */
  appCallbackPop(
    ctx: Arrayish,
    appCreditUsedDelta: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ctx Type: bytes, Indexed: false
   * @param app Type: address, Indexed: false
   * @param appCreditGranted Type: uint256, Indexed: false
   * @param appCreditUsed Type: int256, Indexed: false
   * @param appCreditToken Type: address, Indexed: false
   */
  appCallbackPush(
    ctx: Arrayish,
    app: string,
    appCreditGranted: BigNumberish,
    appCreditUsed: BigNumberish,
    appCreditToken: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operations Type: tuple[], Indexed: false
   */
  batchCall(
    operations: BatchCallRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param agreementClass Type: address, Indexed: false
   * @param callData Type: bytes, Indexed: false
   * @param userData Type: bytes, Indexed: false
   */
  callAgreement(
    agreementClass: string,
    callData: Arrayish,
    userData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param agreementClass Type: address, Indexed: false
   * @param callData Type: bytes, Indexed: false
   * @param userData Type: bytes, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  callAgreementWithContext(
    agreementClass: string,
    callData: Arrayish,
    userData: Arrayish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param app Type: address, Indexed: false
   * @param callData Type: bytes, Indexed: false
   */
  callAppAction(
    app: string,
    callData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param app Type: address, Indexed: false
   * @param callData Type: bytes, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  callAppActionWithContext(
    app: string,
    callData: Arrayish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param app Type: address, Indexed: false
   * @param callData Type: bytes, Indexed: false
   * @param isTermination Type: bool, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  callAppAfterCallback(
    app: string,
    callData: Arrayish,
    isTermination: boolean,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param app Type: address, Indexed: false
   * @param callData Type: bytes, Indexed: false
   * @param isTermination Type: bool, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  callAppBeforeCallback(
    app: string,
    callData: Arrayish,
    isTermination: boolean,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ctx Type: bytes, Indexed: false
   * @param appCreditUsedMore Type: int256, Indexed: false
   */
  ctxUseCredit(
    ctx: Arrayish,
    appCreditUsedMore: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param ctx Type: bytes, Indexed: false
   */
  decodeCtx(
    ctx: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<ContextResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operations Type: tuple[], Indexed: false
   */
  forwardBatchCall(
    operations: ForwardBatchCallRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param agreementType Type: bytes32, Indexed: false
   */
  getAgreementClass(
    agreementType: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param app Type: address, Indexed: false
   */
  getAppCallbackLevel(
    app: string,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param app Type: address, Indexed: false
   */
  getAppManifest(
    app: string,
    overrides?: ContractCallOverrides
  ): Promise<GetAppManifestResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getGovernance(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getNow(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getSuperTokenFactory(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getSuperTokenFactoryLogic(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param agreementClass Type: address, Indexed: false
   */
  isAgreementClassListed(
    agreementClass: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param agreementType Type: bytes32, Indexed: false
   */
  isAgreementTypeListed(
    agreementType: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param app Type: address, Indexed: false
   */
  isApp(app: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param app Type: address, Indexed: false
   */
  isAppJailed(app: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param app Type: address, Indexed: false
   * @param targetApp Type: address, Indexed: false
   */
  isCompositeAppAllowed(
    app: string,
    targetApp: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param ctx Type: bytes, Indexed: false
   */
  isCtxValid(
    ctx: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param ctx Type: bytes, Indexed: false
   * @param app Type: address, Indexed: false
   * @param reason Type: uint256, Indexed: false
   */
  jailApp(
    ctx: Arrayish,
    app: string,
    reason: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param bitmap Type: uint256, Indexed: false
   */
  mapAgreementClasses(
    bitmap: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param agreementClassLogic Type: address, Indexed: false
   */
  registerAgreementClass(
    agreementClassLogic: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param configWord Type: uint256, Indexed: false
   */
  registerApp(
    configWord: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param app Type: address, Indexed: false
   * @param configWord Type: uint256, Indexed: false
   */
  registerAppByFactory(
    app: string,
    configWord: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param configWord Type: uint256, Indexed: false
   * @param registrationKey Type: string, Indexed: false
   */
  registerAppWithKey(
    configWord: BigNumberish,
    registrationKey: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param bitmap Type: uint256, Indexed: false
   * @param agreementType Type: bytes32, Indexed: false
   */
  removeFromAgreementClassesBitmap(
    bitmap: BigNumberish,
    agreementType: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newGov Type: address, Indexed: false
   */
  replaceGovernance(
    newGov: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param agreementClassLogic Type: address, Indexed: false
   */
  updateAgreementClass(
    agreementClassLogic: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newFactory Type: address, Indexed: false
   */
  updateSuperTokenFactory(
    newFactory: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  updateSuperTokenLogic(
    token: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
