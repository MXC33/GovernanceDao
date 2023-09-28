import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  I1155StoreGeneric,
  I1155StoreGenericMethodNames,
  I1155StoreGenericEventsContext,
  I1155StoreGenericEvents
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
export type I1155StoreGenericEvents =
  | 'BulkDiscountAdded'
  | 'CurrenciesWhitelisted'
  | 'OwnershipDiscountAdded'
  | 'OwnershipTransferred'
  | 'PaperCurrencySet'
  | 'SaleBonusSet'
  | 'SaleCreated'
  | 'SaleDeleted'
  | 'SaleModified'
  | 'SaleStateSet'
  | 'SetERC1155PaymentPrices'
  | 'TokenBought'
  | 'Withdrawal';
export interface I1155StoreGenericEventsContext {
  BulkDiscountAdded(...parameters: any): EventFilter;
  CurrenciesWhitelisted(...parameters: any): EventFilter;
  OwnershipDiscountAdded(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  PaperCurrencySet(...parameters: any): EventFilter;
  SaleBonusSet(...parameters: any): EventFilter;
  SaleCreated(...parameters: any): EventFilter;
  SaleDeleted(...parameters: any): EventFilter;
  SaleModified(...parameters: any): EventFilter;
  SaleStateSet(...parameters: any): EventFilter;
  SetERC1155PaymentPrices(...parameters: any): EventFilter;
  TokenBought(...parameters: any): EventFilter;
  Withdrawal(...parameters: any): EventFilter;
}
export type I1155StoreGenericMethodNames =
  | 'MAXIMUM_BASIS_POINTS'
  | '_calculateDiscountedPrice'
  | 'beneficiaryWithdraw'
  | 'buyTokens'
  | 'buyTokensWithERC1155'
  | 'buyTokensWithSignature'
  | 'createSale'
  | 'deleteSale'
  | 'getBeneficiaries'
  | 'getOwnershipDiscounts'
  | 'getSaleInfo'
  | 'initialize'
  | 'modifySale'
  | 'nonces'
  | 'onERC1155BatchReceived'
  | 'onERC1155Received'
  | 'onPaper'
  | 'owner'
  | 'paperKeyManager'
  | 'preSale'
  | 'publicSale'
  | 'registerPaperKey'
  | 'renounceOwnership'
  | 's_ERC1155PaymentTokenAddress'
  | 's_ERC1155tokenPaymentPrices'
  | 's_bulkDiscountBasisPoints'
  | 's_bulkDiscountBreakpoints'
  | 's_isBeneficiary'
  | 's_moderator'
  | 's_oracle'
  | 's_ownershipDiscounts'
  | 's_paperCurrency'
  | 's_perPlayerSold'
  | 's_saleBonuses'
  | 's_saleId'
  | 's_saleStatus'
  | 's_sales'
  | 's_sold'
  | 's_swapManager'
  | 's_tokenDonor'
  | 's_trustedAddresses'
  | 's_whitelistedCurrencies'
  | 'setDonor'
  | 'setERC1155PaymentPrices'
  | 'setFeeWalletsAndPercentages'
  | 'setModerator'
  | 'setOracleManager'
  | 'setPaperCurrency'
  | 'setPaperKeyManager'
  | 'setSaleBonuses'
  | 'setSaleState'
  | 'setSigner'
  | 'setSwapManager'
  | 'supportsInterface'
  | 'toggleState'
  | 'tokenClaimable'
  | 'transferOwnership'
  | 'whitelistCurrencies'
  | 'withdraw'
  | 'withdrawERC1155token';
export interface BulkDiscountAddedEventEmittedResponse {
  _saleId: BigNumberish;
  _breakpoint: BigNumberish;
  _basisPoints: BigNumberish;
}
export interface CurrenciesWhitelistedEventEmittedResponse {
  _saleId: BigNumberish;
  _currencyAddresses: string[];
}
export interface OwnershipDiscountAddedEventEmittedResponse {
  _saleId: BigNumberish;
  _info: _infoRequest;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PaperCurrencySetEventEmittedResponse {
  _paperCurrency: string;
}
export interface SaleBonusSetEventEmittedResponse {
  _saleBonuses: string;
}
export interface SaleCreatedEventEmittedResponse {
  _token: string;
  _tokenId: BigNumberish;
  _unitSize: BigNumberish;
  _totalUnitSupply: BigNumberish;
  _unitPrice: BigNumberish;
  _unitsPerUser: BigNumberish;
  _defaultCurrency: string;
  _profitState: boolean;
  _adminSupplied: boolean;
}
export interface SaleDeletedEventEmittedResponse {
  _saleId: BigNumberish;
}
export interface SaleModifiedEventEmittedResponse {
  _saleId: BigNumberish;
  _unitSize: BigNumberish;
  _totalUnitSupply: BigNumberish;
  _unitPrice: BigNumberish;
  _unitsPerUser: BigNumberish;
  _defaultCurrency: string;
  _profitState: boolean;
}
export interface SaleStateSetEventEmittedResponse {
  _saleId: BigNumberish;
  _paused: boolean;
}
export interface SetERC1155PaymentPricesEventEmittedResponse {
  _saleId: BigNumberish;
  _erc1155TokenIds: BigNumberish[];
  _erc1155TokenPrices: BigNumberish[];
}
export interface TokenBoughtEventEmittedResponse {
  _saleId: BigNumberish;
  _numPurchases: BigNumberish;
  _tokenId: BigNumberish;
  _tokenAddress: string;
  _currency: string;
  _optInBonuses: boolean;
  _optInCategories: boolean;
  _buyer: string;
}
export interface WithdrawalEventEmittedResponse {
  _walletAddress: string;
  _currency: string;
}
export interface BeneficiariesResponse {
  feeBps: BigNumber[];
  0: BigNumber[];
  beneficiary: string[];
  1: string[];
}
export interface OwnershipdiscountResponse {
  tokenType: number;
  0: number;
  tokenAddress: string;
  1: string;
  tokenId: BigNumber;
  2: BigNumber;
  basisPoints: BigNumber;
  3: BigNumber;
}
export interface SaleResponse {
  token: string;
  0: string;
  tokenId: BigNumber;
  1: BigNumber;
  unitSize: BigNumber;
  2: BigNumber;
  totalUnitSupply: BigNumber;
  3: BigNumber;
  unitPrice: BigNumber;
  4: BigNumber;
  unitsPerUser: BigNumber;
  5: BigNumber;
  defaultCurrency: string;
  6: string;
  profitState: boolean;
  7: boolean;
  paused: boolean;
  8: boolean;
  adminSupplied: boolean;
  9: boolean;
}
export interface S_ownershipDiscountsResponse {
  tokenType: number;
  0: number;
  tokenAddress: string;
  1: string;
  tokenId: BigNumber;
  2: BigNumber;
  basisPoints: BigNumber;
  3: BigNumber;
  length: 4;
}
export interface S_salesResponse {
  token: string;
  0: string;
  tokenId: BigNumber;
  1: BigNumber;
  unitSize: BigNumber;
  2: BigNumber;
  totalUnitSupply: BigNumber;
  3: BigNumber;
  unitPrice: BigNumber;
  4: BigNumber;
  unitsPerUser: BigNumber;
  5: BigNumber;
  defaultCurrency: string;
  6: string;
  profitState: boolean;
  7: boolean;
  paused: boolean;
  8: boolean;
  adminSupplied: boolean;
  9: boolean;
  length: 10;
}
export interface I1155StoreGeneric {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAXIMUM_BASIS_POINTS(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param _bps Type: uint256, Indexed: false
   * @param _salePrice Type: uint256, Indexed: false
   */
  _calculateDiscountedPrice(
    _bps: BigNumberish,
    _salePrice: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _currency Type: address, Indexed: false
   */
  beneficiaryWithdraw(
    _currency: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param buyer Type: address, Indexed: false
   * @param tokenAddressRebate Type: address, Indexed: false
   * @param tokenIdRebate Type: uint256, Indexed: false
   * @param numPurchases Type: uint256, Indexed: false
   * @param saleId Type: uint256, Indexed: false
   * @param _currency Type: address, Indexed: false
   * @param _optInBonuses Type: bool, Indexed: false
   * @param _optInCategories Type: bool, Indexed: false
   */
  buyTokens(
    buyer: string,
    tokenAddressRebate: string,
    tokenIdRebate: BigNumberish,
    numPurchases: BigNumberish,
    saleId: BigNumberish,
    _currency: string,
    _optInBonuses: boolean,
    _optInCategories: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param buyer Type: address, Indexed: false
   * @param tokenAddressRebate Type: address, Indexed: false
   * @param tokenIdRebate Type: uint256, Indexed: false
   * @param numPurchases Type: uint256, Indexed: false
   * @param saleId Type: uint256, Indexed: false
   * @param _currency Type: address, Indexed: false
   * @param _optInBonuses Type: bool, Indexed: false
   * @param _optInCategories Type: bool, Indexed: false
   * @param _erc1155PaymentTokenId Type: uint256, Indexed: false
   */
  buyTokensWithERC1155(
    buyer: string,
    tokenAddressRebate: string,
    tokenIdRebate: BigNumberish,
    numPurchases: BigNumberish,
    saleId: BigNumberish,
    _currency: string,
    _optInBonuses: boolean,
    _optInCategories: boolean,
    _erc1155PaymentTokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param buyer Type: address, Indexed: false
   * @param tokenAddressRebate Type: address, Indexed: false
   * @param tokenIdRebate Type: uint256, Indexed: false
   * @param numPurchases Type: uint256, Indexed: false
   * @param saleId Type: uint256, Indexed: false
   * @param _currency Type: address, Indexed: false
   * @param _optInBonuses Type: bool, Indexed: false
   * @param _optInCategories Type: bool, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  buyTokensWithSignature(
    buyer: string,
    tokenAddressRebate: string,
    tokenIdRebate: BigNumberish,
    numPurchases: BigNumberish,
    saleId: BigNumberish,
    _currency: string,
    _optInBonuses: boolean,
    _optInCategories: boolean,
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
   * @param _token Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _unitSize Type: uint256, Indexed: false
   * @param _totalUnitSupply Type: uint256, Indexed: false
   * @param _unitPrice Type: uint256, Indexed: false
   * @param _unitsPerUser Type: uint256, Indexed: false
   * @param _defaultCurrency Type: address, Indexed: false
   * @param _profitState Type: bool, Indexed: false
   * @param _adminSupplied Type: bool, Indexed: false
   */
  createSale(
    _token: string,
    _tokenId: BigNumberish,
    _unitSize: BigNumberish,
    _totalUnitSupply: BigNumberish,
    _unitPrice: BigNumberish,
    _unitsPerUser: BigNumberish,
    _defaultCurrency: string,
    _profitState: boolean,
    _adminSupplied: boolean,
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
   * @param _saleId Type: uint256, Indexed: false
   */
  getOwnershipDiscounts(
    _saleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<OwnershipdiscountResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _id Type: uint256, Indexed: false
   */
  getSaleInfo(
    _id: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<SaleResponse>;
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   * @param _unitSize Type: uint256, Indexed: false
   * @param _totalUnitSupply Type: uint256, Indexed: false
   * @param _unitPrice Type: uint256, Indexed: false
   * @param _unitsPerUser Type: uint256, Indexed: false
   * @param _defaultCurrency Type: address, Indexed: false
   * @param _profitState Type: bool, Indexed: false
   */
  modifySale(
    _saleId: BigNumberish,
    _unitSize: BigNumberish,
    _totalUnitSupply: BigNumberish,
    _unitPrice: BigNumberish,
    _unitsPerUser: BigNumberish,
    _defaultCurrency: string,
    _profitState: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  nonces(
    parameter0: string,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param ids Type: uint256[], Indexed: false
   * @param values Type: uint256[], Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  onERC1155BatchReceived(
    operator: string,
    from: string,
    ids: BigNumberish[],
    values: BigNumberish[],
    data: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  onERC1155Received(
    operator: string,
    from: string,
    id: BigNumberish,
    value: BigNumberish,
    data: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param buyer Type: address, Indexed: false
   * @param tokenAddressRebate Type: address, Indexed: false
   * @param tokenIdRebate Type: uint256, Indexed: false
   * @param numPurchases Type: uint256, Indexed: false
   * @param saleId Type: uint256, Indexed: false
   */
  onPaper(
    buyer: string,
    tokenAddressRebate: string,
    tokenIdRebate: BigNumberish,
    numPurchases: BigNumberish,
    saleId: BigNumberish,
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
   */
  paperKeyManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  preSale(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  publicSale(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _paperKey Type: address, Indexed: false
   */
  registerPaperKey(
    _paperKey: string,
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
   * @param parameter0 Type: uint256, Indexed: false
   */
  s_ERC1155PaymentTokenAddress(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  s_ERC1155tokenPaymentPrices(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  s_bulkDiscountBasisPoints(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  s_bulkDiscountBreakpoints(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  s_isBeneficiary(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_moderator(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_oracle(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  s_ownershipDiscounts(
    parameter0: BigNumberish,
    parameter1: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<S_ownershipDiscountsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_paperCurrency(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  s_perPlayerSold(
    parameter0: BigNumberish,
    parameter1: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_saleBonuses(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_saleId(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  s_saleStatus(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  s_sales(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<S_salesResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  s_sold(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_swapManager(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  s_tokenDonor(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  s_trustedAddresses(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  s_whitelistedCurrencies(
    parameter0: BigNumberish,
    parameter1: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _donor Type: address, Indexed: false
   */
  setDonor(
    _donor: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   * @param _ERC1155PaymentAddress Type: address, Indexed: false
   * @param _erc1155PaymentTokenIds Type: uint256[], Indexed: false
   * @param _erc1155PaymentPrices Type: uint256[], Indexed: false
   */
  setERC1155PaymentPrices(
    _saleId: BigNumberish,
    _ERC1155PaymentAddress: string,
    _erc1155PaymentTokenIds: BigNumberish[],
    _erc1155PaymentPrices: BigNumberish[],
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
   * @param _paperCurrency Type: address, Indexed: false
   */
  setPaperCurrency(
    _paperCurrency: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _paperKey Type: address, Indexed: false
   */
  setPaperKeyManager(
    _paperKey: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleBonuses Type: address, Indexed: false
   */
  setSaleBonuses(
    _saleBonuses: string,
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
   * @param _signer Type: address, Indexed: false
   */
  setSigner(
    _signer: string,
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _saleId Type: uint256, Indexed: false
   */
  toggleState(
    _saleId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _buyer Type: address, Indexed: false
   * @param _tokenAddressRebate Type: address, Indexed: false
   * @param _tokenIdRebate Type: uint256, Indexed: false
   * @param _numPurchases Type: uint256, Indexed: false
   * @param _saleId Type: uint256, Indexed: false
   */
  tokenClaimable(
    _buyer: string,
    _tokenAddressRebate: string,
    _tokenIdRebate: BigNumberish,
    _numPurchases: BigNumberish,
    _saleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
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
   * @param _saleId Type: uint256, Indexed: false
   * @param _currencyAddresses Type: address[], Indexed: false
   */
  whitelistCurrencies(
    _saleId: BigNumberish,
    _currencyAddresses: string[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _currency Type: address, Indexed: false
   */
  withdraw(
    _walletAddress: string,
    _currency: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _walletAddress Type: address, Indexed: false
   * @param _tokenAddress Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  withdrawERC1155token(
    _walletAddress: string,
    _tokenAddress: string,
    _tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
