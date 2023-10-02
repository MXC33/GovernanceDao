import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  GravityGrade,
  GravityGradeMethodNames,
  GravityGradeEventsContext,
  GravityGradeEvents
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
export type GravityGradeEvents =
  | 'ApprovalForAll'
  | 'BeneficiariesUpdated'
  | 'OwnershipTransferred'
  | 'PaymentCurrenciesRevoked'
  | 'PaymentCurrenciesSet'
  | 'SaleDeleted'
  | 'SaleInfoUpdated'
  | 'SaleState'
  | 'TransferBatch'
  | 'TransferSingle'
  | 'URI';
export interface GravityGradeEventsContext {
  ApprovalForAll(...parameters: any): EventFilter;
  BeneficiariesUpdated(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PaymentCurrenciesRevoked(...parameters: any): EventFilter;
  PaymentCurrenciesSet(...parameters: any): EventFilter;
  SaleDeleted(...parameters: any): EventFilter;
  SaleInfoUpdated(...parameters: any): EventFilter;
  SaleState(...parameters: any): EventFilter;
  TransferBatch(...parameters: any): EventFilter;
  TransferSingle(...parameters: any): EventFilter;
  URI(...parameters: any): EventFilter;
}
export type GravityGradeMethodNames =
  | 'ADDRESS_ZERO'
  | 'MAXIMUM_BASIS_POINTS'
  | 'addBulkDiscount'
  | 'addOwnershipDiscount'
  | 'airdrop'
  | 'balanceOf'
  | 'balanceOfBatch'
  | 'burn'
  | 'buyPacks'
  | 'calculateDiscountedPackPrice'
  | 'createNewSale'
  | 'deleteSale'
  | 'getBeneficiaries'
  | 'getModerator'
  | 'getSale'
  | 'getSaleId'
  | 'getSaleStatus'
  | 'getTrusted'
  | 'initialize'
  | 'isApprovedForAll'
  | 'modifySale'
  | 'name'
  | 'onTransakOne'
  | 'owner'
  | 'removePaymentCurrencies'
  | 'renounceOwnership'
  | 'safeBatchTransferFrom'
  | 'safeTransferFrom'
  | 'setAllowedPaymentCurrencies'
  | 'setApprovalForAll'
  | 'setFeeWalletsAndPercentages'
  | 'setModerator'
  | 'setName'
  | 'setOracleManager'
  | 'setSaleState'
  | 'setSwapManager'
  | 'setSymbol'
  | 'setTokenUri'
  | 'setTrusted'
  | 'supportsInterface'
  | 'symbol'
  | 'transferOwnership'
  | 'uri'
  | 'withdraw';
export interface ApprovalForAllEventEmittedResponse {
  account: string;
  operator: string;
  approved: boolean;
}
export interface BeneficiariesUpdatedEventEmittedResponse {
  beneficiaries: string[];
  basisPoints: BigNumberish[];
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PaymentCurrenciesRevokedEventEmittedResponse {
  saleId: BigNumberish;
  currencyAddresses: string[];
}
export interface PaymentCurrenciesSetEventEmittedResponse {
  saleId: BigNumberish;
  currencyAddresses: string[];
}
export interface SaleDeletedEventEmittedResponse {
  saleId: BigNumberish;
}
export interface SaleInfoUpdatedEventEmittedResponse {
  saleId: BigNumberish;
  tokenId: BigNumberish;
  salePrice: BigNumberish;
  totalSupply: BigNumberish;
  userCap: BigNumberish;
  defaultCurrency: string;
}
export interface SaleStateEventEmittedResponse {
  saleId: BigNumberish;
  isPaused: boolean;
}
export interface TransferBatchEventEmittedResponse {
  operator: string;
  from: string;
  to: string;
  ids: BigNumberish[];
  values: BigNumberish[];
}
export interface TransferSingleEventEmittedResponse {
  operator: string;
  from: string;
  to: string;
  id: BigNumberish;
  value: BigNumberish;
}
export interface URIEventEmittedResponse {
  value: string;
  id: BigNumberish;
}
export interface AddOwnershipDiscountRequest {
  tokenType: BigNumberish;
  tokenAddress: string;
  tokenId: BigNumberish;
  basisPoints: BigNumberish;
}
export interface DiscountsResponse {
  originalPrice: BigNumber;
  0: BigNumber;
  discountedPrice: BigNumber;
  1: BigNumber;
  purchaseQuantity: BigNumber;
  2: BigNumber;
  tokenAddress: string;
  3: string;
}
export interface BeneficiariesResponse {
  feeBps: BigNumber[];
  0: BigNumber[];
  beneficiary: string[];
  1: string[];
}
export interface SaleResponse {
  saleId: BigNumber;
  0: BigNumber;
  tokenId: BigNumber;
  1: BigNumber;
  salePrice: BigNumber;
  2: BigNumber;
  totalSupply: BigNumber;
  3: BigNumber;
  userCap: BigNumber;
  4: BigNumber;
  defaultCurrency: string;
  5: string;
  profitState: boolean;
  6: boolean;
}
export interface GravityGrade {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  ADDRESS_ZERO(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAXIMUM_BASIS_POINTS(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   * @param _breakpoint Type: uint256, Indexed: false
   * @param _basisPoints Type: uint256, Indexed: false
   */
  addBulkDiscount(
    _saleId: BigNumberish,
    _breakpoint: BigNumberish,
    _basisPoints: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   * @param _info Type: tuple, Indexed: false
   */
  addOwnershipDiscount(
    _saleId: BigNumberish,
    _info: AddOwnershipDiscountRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _recipients Type: address[], Indexed: false
   * @param _tokenIds Type: uint256[], Indexed: false
   * @param _amounts Type: uint256[], Indexed: false
   */
  airdrop(
    _recipients: string[],
    _tokenIds: BigNumberish[],
    _amounts: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   */
  balanceOf(
    account: string,
    id: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param accounts Type: address[], Indexed: false
   * @param ids Type: uint256[], Indexed: false
   */
  balanceOfBatch(
    accounts: string[],
    ids: BigNumberish[],
    overrides?: ContractCallOverrides
  ): Promise<BigNumber[]>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  burn(
    _from: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   * @param _numPurchases Type: uint256, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _tokenAddress Type: address, Indexed: false
   * @param _currency Type: address, Indexed: false
   */
  buyPacks(
    _saleId: BigNumberish,
    _numPurchases: BigNumberish,
    _tokenId: BigNumberish,
    _tokenAddress: string,
    _currency: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   * @param _numPurchases Type: uint256, Indexed: false
   * @param _currency Type: address, Indexed: false
   * @param _tokenAddress Type: address, Indexed: false
   */
  calculateDiscountedPackPrice(
    _saleId: BigNumberish,
    _numPurchases: BigNumberish,
    _currency: string,
    _tokenAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _salePrice Type: uint256, Indexed: false
   * @param _totalSupplyAmountToSell Type: uint256, Indexed: false
   * @param _userCap Type: uint256, Indexed: false
   * @param _defaultCurrency Type: address, Indexed: false
   * @param _profitState Type: bool, Indexed: false
   */
  createNewSale(
    _tokenId: BigNumberish,
    _salePrice: BigNumberish,
    _totalSupplyAmountToSell: BigNumberish,
    _userCap: BigNumberish,
    _defaultCurrency: string,
    _profitState: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   */
  deleteSale(
    _saleId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getBeneficiaries(
    overrides?: ContractCallOverrides
  ): Promise<BeneficiariesResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getModerator(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   */
  getSale(
    _saleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<SaleResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getSaleId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   */
  getSaleStatus(
    _saleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _trusted Type: address, Indexed: false
   */
  getTrusted(
    _trusted: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _name Type: string, Indexed: false
   * @param _symbol Type: string, Indexed: false
   */
  initialize(
    _name: string,
    _symbol: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  isApprovedForAll(
    account: string,
    operator: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   * @param _salePrice Type: uint256, Indexed: false
   * @param _totalSupplyAmountToSell Type: uint256, Indexed: false
   * @param _userCap Type: uint256, Indexed: false
   * @param _defaultCurrency Type: address, Indexed: false
   * @param _profitState Type: bool, Indexed: false
   */
  modifySale(
    _saleId: BigNumberish,
    _salePrice: BigNumberish,
    _totalSupplyAmountToSell: BigNumberish,
    _userCap: BigNumberish,
    _defaultCurrency: string,
    _profitState: boolean,
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
   * @param _buyer Type: address, Indexed: false
   * @param _paymentToken Type: address, Indexed: false
   * @param _numPurchases Type: uint256, Indexed: false
   * @param _saleId Type: uint256, Indexed: false
   */
  onTransakOne(
    _buyer: string,
    _paymentToken: string,
    _numPurchases: BigNumberish,
    _saleId: BigNumberish,
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
   * @param _saleId Type: uint256, Indexed: false
   * @param _currencyAddresses Type: address[], Indexed: false
   */
  removePaymentCurrencies(
    _saleId: BigNumberish,
    _currencyAddresses: string[],
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
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param ids Type: uint256[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  safeBatchTransferFrom(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   * @param _currencyAddresses Type: address[], Indexed: false
   */
  setAllowedPaymentCurrencies(
    _saleId: BigNumberish,
    _currencyAddresses: string[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
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
   * @param _walletAddresses Type: address[], Indexed: false
   * @param _feeBps Type: uint256[], Indexed: false
   */
  setFeeWalletsAndPercentages(
    _walletAddresses: string[],
    _feeBps: BigNumberish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _moderatorAddress Type: address, Indexed: false
   */
  setModerator(
    _moderatorAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _name Type: string, Indexed: false
   */
  setName(
    _name: string,
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
   * @param _saleId Type: uint256, Indexed: false
   * @param _paused Type: bool, Indexed: false
   */
  setSaleState(
    _saleId: BigNumberish,
    _paused: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _swapManager Type: address, Indexed: false
   */
  setSwapManager(
    _swapManager: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _symbol Type: string, Indexed: false
   */
  setSymbol(
    _symbol: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   * @param _uri Type: string, Indexed: false
   */
  setTokenUri(
    _tokenId: BigNumberish,
    _uri: string,
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
   * @param _tokenId Type: uint256, Indexed: false
   */
  uri(
    _tokenId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _currency Type: address, Indexed: false
   */
  withdraw(
    _walletAddress: string,
    _currency: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
