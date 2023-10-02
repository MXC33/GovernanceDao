import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  MissionControlStream,
  MissionControlStreamMethodNames,
  MissionControlStreamEventsContext,
  MissionControlStreamEvents
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
export type MissionControlStreamEvents =
  | 'Initialized'
  | 'OwnershipTransferred'
  | 'TerminationCallReverted';
export interface MissionControlStreamEventsContext {
  Initialized(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  TerminationCallReverted(...parameters: any): EventFilter;
}
export type MissionControlStreamMethodNames =
  | 'acceptedToken1'
  | 'acceptedToken2'
  | 'afterAgreementCreated'
  | 'afterAgreementTerminated'
  | 'afterAgreementUpdated'
  | 'approve'
  | 'beforeAgreementCreated'
  | 'beforeAgreementTerminated'
  | 'beforeAgreementUpdated'
  | 'cfa'
  | 'createRentTilesGenesis'
  | 'crosschainServices'
  | 'getFlowRate'
  | 'host'
  | 'initialize'
  | 'missionControl'
  | 'owner'
  | 'renounceOwnership'
  | 'setCrosschainServices'
  | 'setMissionControl'
  | 'transferOwnership';
export interface InitializedEventEmittedResponse {
  version: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface TerminationCallRevertedEventEmittedResponse {
  sender: string;
}
export interface CreateRentTilesGenesisRequest {
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface MissionControlStream {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  acceptedToken1(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  acceptedToken2(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param superToken Type: address, Indexed: false
   * @param agreementClass Type: address, Indexed: false
   * @param parameter2 Type: bytes32, Indexed: false
   * @param agreementData Type: bytes, Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  afterAgreementCreated(
    superToken: string,
    agreementClass: string,
    parameter2: Arrayish,
    agreementData: Arrayish,
    parameter4: Arrayish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param superToken Type: address, Indexed: false
   * @param agreementClass Type: address, Indexed: false
   * @param parameter2 Type: bytes32, Indexed: false
   * @param agreementData Type: bytes, Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  afterAgreementTerminated(
    superToken: string,
    agreementClass: string,
    parameter2: Arrayish,
    agreementData: Arrayish,
    parameter4: Arrayish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param superToken Type: address, Indexed: false
   * @param agreementClass Type: address, Indexed: false
   * @param parameter2 Type: bytes32, Indexed: false
   * @param parameter3 Type: bytes, Indexed: false
   * @param cbdata Type: bytes, Indexed: false
   * @param ctx Type: bytes, Indexed: false
   */
  afterAgreementUpdated(
    superToken: string,
    agreementClass: string,
    parameter2: Arrayish,
    parameter3: Arrayish,
    cbdata: Arrayish,
    ctx: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param superToken Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  approve(
    superToken: string,
    to: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: bytes32, Indexed: false
   * @param parameter3 Type: bytes, Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  beforeAgreementCreated(
    parameter0: string,
    parameter1: string,
    parameter2: Arrayish,
    parameter3: Arrayish,
    parameter4: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: bytes32, Indexed: false
   * @param parameter3 Type: bytes, Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  beforeAgreementTerminated(
    parameter0: string,
    parameter1: string,
    parameter2: Arrayish,
    parameter3: Arrayish,
    parameter4: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param superToken Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: bytes32, Indexed: false
   * @param agreementData Type: bytes, Indexed: false
   * @param parameter4 Type: bytes, Indexed: false
   */
  beforeAgreementUpdated(
    superToken: string,
    parameter1: string,
    parameter2: Arrayish,
    agreementData: Arrayish,
    parameter4: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  cfa(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param addTiles Type: tuple[], Indexed: false
   */
  createRentTilesGenesis(
    addTiles: CreateRentTilesGenesisRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  crosschainServices(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param superToken Type: address, Indexed: false
   * @param player Type: address, Indexed: false
   */
  getFlowRate(
    superToken: string,
    player: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  host(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _host Type: address, Indexed: false
   * @param _acceptedToken1 Type: address, Indexed: false
   * @param _acceptedToken2 Type: address, Indexed: false
   * @param _missionControl Type: address, Indexed: false
   */
  initialize(
    _host: string,
    _acceptedToken1: string,
    _acceptedToken2: string,
    _missionControl: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  missionControl(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param _missionControl Type: address, Indexed: false
   */
  setMissionControl(
    _missionControl: string,
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
