import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  Rover,
  RoverMethodNames,
  RoverEventsContext,
  RoverEvents
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
export type RoverEvents =
  | 'Approval'
  | 'ApprovalForAll'
  | 'Breakdown'
  | 'Named'
  | 'NewRover'
  | 'NewSkin'
  | 'OwnershipTransferred'
  | 'Repaired'
  | 'Transfer';
export interface RoverEventsContext {
  Approval(...parameters: any): EventFilter;
  ApprovalForAll(...parameters: any): EventFilter;
  Breakdown(...parameters: any): EventFilter;
  Named(...parameters: any): EventFilter;
  NewRover(...parameters: any): EventFilter;
  NewSkin(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  Repaired(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
}
export type RoverMethodNames =
  | 'COORDINATOR'
  | 'IXT'
  | 'USDT'
  | 'acSkinPrices'
  | 'addSkin'
  | 'addUri'
  | 'airdrop'
  | 'approve'
  | 'astroCredits'
  | 'balanceOf'
  | 'breakdown'
  | 'burn'
  | 'crosschainServices'
  | 'description'
  | 'getApproved'
  | 'getNamePrice'
  | 'getPurchasePrice'
  | 'getRepairPrice'
  | 'getSkinPrice'
  | 'getTokensOfOwner'
  | 'initialize'
  | 'isApprovedForAll'
  | 'ixtSkinPrices'
  | 'missionControl'
  | 'name'
  | 'onERC1155BatchReceived'
  | 'onERC1155Received'
  | 'owner'
  | 'ownerOf'
  | 'purchaseUSDTprice'
  | 'purchaseWithIXT'
  | 'purchaseWithMatic'
  | 'purchaseWithUSDT'
  | 'rawFulfillRandomWords'
  | 'renounceOwnership'
  | 'repairBatchAC'
  | 'repairBatchIXT'
  | 'repairBatchYGenesis'
  | 'roverAdapter'
  | 'roverHelper'
  | 'rovers'
  | 's_requests'
  | 'safeTransferFrom'
  | 'safeTransferFrom'
  | 'saleOpen'
  | 'setApprovalForAll'
  | 'setAstroCredits'
  | 'setCallbackGasLimit'
  | 'setCrosschain'
  | 'setKeyHash'
  | 'setMissionControl'
  | 'setNamePrice'
  | 'setNameWithAC'
  | 'setNameWithIXT'
  | 'setOracleManager'
  | 'setPurchaseUSDTprice'
  | 'setRepairPrice'
  | 'setRequestConfirmations'
  | 'setRoverAdapter'
  | 'setRoverHelper'
  | 'setSaleOpen'
  | 'setSkinPrice'
  | 'setSubscriptionId'
  | 'setTrusted'
  | 'supportsInterface'
  | 'symbol'
  | 'tokenByIndex'
  | 'tokenOfOwnerByIndex'
  | 'tokenURI'
  | 'tokensOfOwner'
  | 'totalSupply'
  | 'transferFrom'
  | 'transferOwnership'
  | 'trustedBatchMint'
  | 'trustedMint'
  | 'upgradeSkinAC'
  | 'upgradeSkinIXT'
  | 'uris'
  | 'withdraw';
export interface ApprovalEventEmittedResponse {
  owner: string;
  approved: string;
  tokenId: BigNumberish;
}
export interface ApprovalForAllEventEmittedResponse {
  owner: string;
  operator: string;
  approved: boolean;
}
export interface BreakdownEventEmittedResponse {
  tokenId: BigNumberish;
  to: BigNumberish;
}
export interface NamedEventEmittedResponse {
  tokenId: BigNumberish;
  name: string;
}
export interface NewRoverEventEmittedResponse {
  to: string;
  tokenId: BigNumberish;
  color: BigNumberish;
}
export interface NewSkinEventEmittedResponse {
  tokenId: BigNumberish;
  _skin: BigNumberish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface RepairedEventEmittedResponse {
  tokenId: BigNumberish;
  status: BigNumberish;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  tokenId: BigNumberish;
}
export interface RepairBatchYGenesisRequest {
  tokenId: BigNumberish;
  x: BigNumberish;
  y: BigNumberish;
  z: BigNumberish;
}
export interface RoversResponse {
  name: string;
  0: string;
  color: number;
  1: number;
  status: number;
  2: number;
  skin: BigNumber;
  3: BigNumber;
  length: 4;
}
export interface Rover {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  COORDINATOR(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  IXT(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  USDT(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  acSkinPrices(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uri Type: string, Indexed: false
   * @param ixtPrice Type: uint256, Indexed: false
   * @param acPrice Type: uint256, Indexed: false
   */
  addSkin(
    uri: string,
    ixtPrice: BigNumberish,
    acPrice: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uri Type: string, Indexed: false
   */
  addUri(
    uri: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _receipients Type: address[], Indexed: false
   * @param _colours Type: uint256[], Indexed: false
   */
  airdrop(
    _receipients: string[],
    _colours: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  astroCredits(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  balanceOf(
    owner: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param to Type: uint256, Indexed: false
   */
  breakdown(
    tokenId: BigNumberish,
    to: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  burn(
    tokenId: BigNumberish,
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
   * @param color Type: uint8, Indexed: false
   */
  description(
    color: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getApproved(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _payToken Type: uint8, Indexed: false
   */
  getNamePrice(
    _payToken: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _payToken Type: uint8, Indexed: false
   */
  getPurchasePrice(
    _payToken: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _payToken Type: uint8, Indexed: false
   * @param _roverStatus Type: uint8, Indexed: false
   */
  getRepairPrice(
    _payToken: BigNumberish,
    _roverStatus: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _payToken Type: uint8, Indexed: false
   * @param _skinId Type: uint256, Indexed: false
   */
  getSkinPrice(
    _payToken: BigNumberish,
    _skinId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  getTokensOfOwner(
    owner: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param uri Type: string, Indexed: false
   * @param _missionControl Type: address, Indexed: false
   * @param _s_oracle Type: address, Indexed: false
   * @param _vrfCoordinator Type: address, Indexed: false
   * @param _USDT Type: address, Indexed: false
   * @param _IXT Type: address, Indexed: false
   * @param _astroCredits Type: address, Indexed: false
   * @param _acTokenId Type: uint256, Indexed: false
   */
  initialize(
    uri: string,
    _missionControl: string,
    _s_oracle: string,
    _vrfCoordinator: string,
    _USDT: string,
    _IXT: string,
    _astroCredits: string,
    _acTokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  ixtSkinPrices(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
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
  name(overrides?: ContractCallOverrides): Promise<string>;
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
   * @param tokenId Type: uint256, Indexed: false
   */
  ownerOf(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  purchaseUSDTprice(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint32, Indexed: false
   */
  purchaseWithIXT(
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param amount Type: uint32, Indexed: false
   */
  purchaseWithMatic(
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint32, Indexed: false
   */
  purchaseWithUSDT(
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param requestId Type: uint256, Indexed: false
   * @param randomWords Type: uint256[], Indexed: false
   */
  rawFulfillRandomWords(
    requestId: BigNumberish,
    randomWords: BigNumberish[],
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
   * @param _tokenIds Type: uint256[], Indexed: false
   */
  repairBatchAC(
    _tokenIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenIds Type: uint256[], Indexed: false
   */
  repairBatchIXT(
    _tokenIds: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param repairs Type: tuple[], Indexed: false
   */
  repairBatchYGenesis(
    repairs: RepairBatchYGenesisRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  roverAdapter(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  roverHelper(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  rovers(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<RoversResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  s_requests(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  saleOpen(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _astroCredits Type: address, Indexed: false
   */
  setAstroCredits(
    _astroCredits: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _callbackGasLimit Type: uint32, Indexed: false
   */
  setCallbackGasLimit(
    _callbackGasLimit: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _crosschain Type: address, Indexed: false
   */
  setCrosschain(
    _crosschain: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _keyHash Type: bytes32, Indexed: false
   */
  setKeyHash(
    _keyHash: Arrayish,
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
   * @param _payToken Type: uint8, Indexed: false
   * @param _newPrice Type: uint256, Indexed: false
   */
  setNamePrice(
    _payToken: BigNumberish,
    _newPrice: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param name Type: string, Indexed: false
   */
  setNameWithAC(
    tokenId: BigNumberish,
    name: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param name Type: string, Indexed: false
   */
  setNameWithIXT(
    tokenId: BigNumberish,
    name: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _oracleManager Type: address, Indexed: false
   */
  setOracleManager(
    _oracleManager: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _purchaseUSDTprice Type: uint256, Indexed: false
   */
  setPurchaseUSDTprice(
    _purchaseUSDTprice: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _payToken Type: uint8, Indexed: false
   * @param _roverStatus Type: uint8, Indexed: false
   * @param _newPrice Type: uint256, Indexed: false
   */
  setRepairPrice(
    _payToken: BigNumberish,
    _roverStatus: BigNumberish,
    _newPrice: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _requestConfirmations Type: uint16, Indexed: false
   */
  setRequestConfirmations(
    _requestConfirmations: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _stakeable Type: address, Indexed: false
   */
  setRoverAdapter(
    _stakeable: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _roverHelper Type: address, Indexed: false
   */
  setRoverHelper(
    _roverHelper: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleOpen Type: bool, Indexed: false
   */
  setSaleOpen(
    _saleOpen: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _payToken Type: uint8, Indexed: false
   * @param _skinId Type: uint256, Indexed: false
   * @param _newPrice Type: uint256, Indexed: false
   */
  setSkinPrice(
    _payToken: BigNumberish,
    _skinId: BigNumberish,
    _newPrice: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _subscriptionId Type: uint64, Indexed: false
   */
  setSubscriptionId(
    _subscriptionId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _trusted Type: address, Indexed: false
   * @param _isTrusted Type: bool, Indexed: false
   */
  setTrusted(
    _trusted: string,
    _isTrusted: boolean,
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
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  tokenByIndex(
    index: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param index Type: uint256, Indexed: false
   */
  tokenOfOwnerByIndex(
    owner: string,
    index: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  tokensOfOwner(
    _owner: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
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
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
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
   * @param _to Type: address, Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _amounts Type: uint256[], Indexed: false
   */
  trustedBatchMint(
    _to: string,
    _tokenIds: BigNumberish[],
    _amounts: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  trustedMint(
    _to: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param _skin Type: uint256, Indexed: false
   */
  upgradeSkinAC(
    tokenId: BigNumberish,
    _skin: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param _skin Type: uint256, Indexed: false
   */
  upgradeSkinIXT(
    tokenId: BigNumberish,
    _skin: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  uris(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  withdraw(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
