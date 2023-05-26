import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  Seaport,
  SeaportMethodNames,
  SeaportEventsContext,
  SeaportEvents
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
export type SeaportEvents =
  | 'CounterIncremented'
  | 'OrderCancelled'
  | 'OrderFulfilled'
  | 'OrderValidated';
export interface SeaportEventsContext {
  CounterIncremented(...parameters: any): EventFilter;
  OrderCancelled(...parameters: any): EventFilter;
  OrderFulfilled(...parameters: any): EventFilter;
  OrderValidated(...parameters: any): EventFilter;
}
export type SeaportMethodNames =
  | 'new'
  | 'cancel'
  | 'fulfillAdvancedOrder'
  | 'fulfillAvailableAdvancedOrders'
  | 'fulfillAvailableOrders'
  | 'fulfillBasicOrder'
  | 'fulfillOrder'
  | 'getCounter'
  | 'getOrderHash'
  | 'getOrderStatus'
  | 'incrementCounter'
  | 'information'
  | 'matchAdvancedOrders'
  | 'matchOrders'
  | 'name'
  | 'owner'
  | 'pixMerkleMinter'
  | 'setMerkleMinter'
  | 'validate';
export interface CounterIncrementedEventEmittedResponse {
  newCounter: BigNumberish;
  offerer: string;
}
export interface OrderCancelledEventEmittedResponse {
  orderHash: Arrayish;
  offerer: string;
  zone: string;
}
export interface OrderFulfilledEventEmittedResponse {
  orderHash: Arrayish;
  offerer: string;
  zone: string;
  recipient: string;
  offer: OfferRequest[];
  consideration: ConsiderationRequest[];
}
export interface OrderValidatedEventEmittedResponse {
  orderHash: Arrayish;
  offerer: string;
  zone: string;
}
export interface OfferRequest {
  itemType: BigNumberish;
  token: string;
  identifierOrCriteria: BigNumberish;
  startAmount: BigNumberish;
  endAmount: BigNumberish;
  pixHash: Arrayish;
}
export interface ConsiderationRequest {
  itemType: BigNumberish;
  token: string;
  identifierOrCriteria: BigNumberish;
  startAmount: BigNumberish;
  endAmount: BigNumberish;
  recipient: string;
}
export interface CancelRequest {
  offerer: string;
  zone: string;
  offer: OfferRequest[];
  consideration: ConsiderationRequest[];
  orderType: BigNumberish;
  startTime: BigNumberish;
  endTime: BigNumberish;
  zoneHash: Arrayish;
  salt: BigNumberish;
  conduitKey: Arrayish;
  counter: BigNumberish;
}
export interface ParametersRequestRequest {
  itemType: BigNumberish;
  token: string;
  identifierOrCriteria: BigNumberish;
  startAmount: BigNumberish;
  endAmount: BigNumberish;
  pixHash: Arrayish;
}
export interface FulfillAdvancedOrderRequest {
  parameters: ParametersRequest;
  numerator: BigNumberish;
  denominator: BigNumberish;
  signature: Arrayish;
  extraData: Arrayish;
}
export interface MerklePixInfoRequest {
  pixId: BigNumberish;
  category: BigNumberish;
  size: BigNumberish;
}
export interface FulfillAvailableAdvancedOrdersRequest {
  parameters: ParametersRequest;
  numerator: BigNumberish;
  denominator: BigNumberish;
  signature: Arrayish;
  extraData: Arrayish;
}
export interface FulfillAvailableOrdersRequest {
  parameters: ParametersRequest;
  signature: Arrayish;
}
export interface AdditionalRecipientsRequest {
  amount: BigNumberish;
  recipient: string;
}
export interface FulfillBasicOrderRequest {
  considerationToken: string;
  considerationIdentifier: BigNumberish;
  considerationAmount: BigNumberish;
  offerer: string;
  zone: string;
  offerToken: string;
  offerIdentifier: BigNumberish;
  offerAmount: BigNumberish;
  basicOrderType: BigNumberish;
  startTime: BigNumberish;
  endTime: BigNumberish;
  zoneHash: Arrayish;
  salt: BigNumberish;
  offererConduitKey: Arrayish;
  fulfillerConduitKey: Arrayish;
  totalOriginalAdditionalRecipients: BigNumberish;
  additionalRecipients: AdditionalRecipientsRequest[];
  signature: Arrayish;
}
export interface FulfillOrderRequest {
  parameters: ParametersRequest;
  signature: Arrayish;
}
export interface GetOrderHashRequest {
  offerer: string;
  zone: string;
  offer: OfferRequest[];
  consideration: ConsiderationRequest[];
  orderType: BigNumberish;
  startTime: BigNumberish;
  endTime: BigNumberish;
  zoneHash: Arrayish;
  salt: BigNumberish;
  conduitKey: Arrayish;
  counter: BigNumberish;
}
export interface GetOrderStatusResponse {
  isValidated: boolean;
  0: boolean;
  isCancelled: boolean;
  1: boolean;
  totalFilled: BigNumber;
  2: BigNumber;
  totalSize: BigNumber;
  3: BigNumber;
  length: 4;
}
export interface InformationResponse {
  version: string;
  0: string;
  domainSeparator: string;
  1: string;
  conduitController: string;
  2: string;
  length: 3;
}
export interface MatchAdvancedOrdersRequest {
  parameters: ParametersRequest;
  numerator: BigNumberish;
  denominator: BigNumberish;
  signature: Arrayish;
  extraData: Arrayish;
}
export interface OfferComponentsRequest {
  orderIndex: BigNumberish;
  itemIndex: BigNumberish;
}
export interface ConsiderationComponentsRequest {
  orderIndex: BigNumberish;
  itemIndex: BigNumberish;
}
export interface ItemResponse {
  itemType: number;
  0: ItemResponse;
  token: string;
  1: ItemResponse;
  identifier: BigNumber;
  2: ItemResponse;
  amount: BigNumber;
  3: ItemResponse;
  recipient: string;
  4: ItemResponse;
}
export interface ExecutionsResponse {
  item: ItemResponse;
  0: ItemResponse;
  offerer: string;
  1: string;
  conduitKey: string;
  2: string;
}
export interface MatchOrdersRequest {
  parameters: ParametersRequest;
  signature: Arrayish;
}
export interface ValidateRequest {
  parameters: ParametersRequest;
  signature: Arrayish;
}
export interface Seaport {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param conduitController Type: address, Indexed: false
   */
  'new'(
    conduitController: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param orders Type: tuple[], Indexed: false
   */
  cancel(
    orders: CancelRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param advancedOrder Type: tuple, Indexed: false
   * @param criteriaResolvers Type: tuple[], Indexed: false
   * @param fulfillerConduitKey Type: bytes32, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param pixMerkleParam Type: tuple, Indexed: false
   */
  fulfillAdvancedOrder(
    advancedOrder: FulfillAdvancedOrderRequest,
    criteriaResolvers: FulfillAdvancedOrderRequest[],
    fulfillerConduitKey: Arrayish,
    recipient: string,
    pixMerkleParam: FulfillAdvancedOrderRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param advancedOrders Type: tuple[], Indexed: false
   * @param criteriaResolvers Type: tuple[], Indexed: false
   * @param offerFulfillments Type: tuple[][], Indexed: false
   * @param considerationFulfillments Type: tuple[][], Indexed: false
   * @param fulfillerConduitKey Type: bytes32, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param maximumFulfilled Type: uint256, Indexed: false
   */
  fulfillAvailableAdvancedOrders(
    advancedOrders: FulfillAvailableAdvancedOrdersRequest[],
    criteriaResolvers: FulfillAvailableAdvancedOrdersRequest[],
    offerFulfillments: FulfillAvailableAdvancedOrdersRequest[],
    considerationFulfillments: FulfillAvailableAdvancedOrdersRequest[],
    fulfillerConduitKey: Arrayish,
    recipient: string,
    maximumFulfilled: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param orders Type: tuple[], Indexed: false
   * @param offerFulfillments Type: tuple[][], Indexed: false
   * @param considerationFulfillments Type: tuple[][], Indexed: false
   * @param fulfillerConduitKey Type: bytes32, Indexed: false
   * @param maximumFulfilled Type: uint256, Indexed: false
   */
  fulfillAvailableOrders(
    orders: FulfillAvailableOrdersRequest[],
    offerFulfillments: FulfillAvailableOrdersRequest[],
    considerationFulfillments: FulfillAvailableOrdersRequest[],
    fulfillerConduitKey: Arrayish,
    maximumFulfilled: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param parameters Type: tuple, Indexed: false
   */
  fulfillBasicOrder(
    parameters: FulfillBasicOrderRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param order Type: tuple, Indexed: false
   * @param fulfillerConduitKey Type: bytes32, Indexed: false
   * @param pixMerkleParam Type: tuple, Indexed: false
   */
  fulfillOrder(
    order: FulfillOrderRequest,
    fulfillerConduitKey: Arrayish,
    pixMerkleParam: FulfillOrderRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param offerer Type: address, Indexed: false
   */
  getCounter(
    offerer: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param order Type: tuple, Indexed: false
   */
  getOrderHash(
    order: GetOrderHashRequest,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param orderHash Type: bytes32, Indexed: false
   */
  getOrderStatus(
    orderHash: Arrayish,
    overrides?: ContractCallOverrides
  ): Promise<GetOrderStatusResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  incrementCounter(
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  information(overrides?: ContractCallOverrides): Promise<InformationResponse>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param advancedOrders Type: tuple[], Indexed: false
   * @param criteriaResolvers Type: tuple[], Indexed: false
   * @param fulfillments Type: tuple[], Indexed: false
   */
  matchAdvancedOrders(
    advancedOrders: MatchAdvancedOrdersRequest[],
    criteriaResolvers: MatchAdvancedOrdersRequest[],
    fulfillments: MatchAdvancedOrdersRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param orders Type: tuple[], Indexed: false
   * @param fulfillments Type: tuple[], Indexed: false
   */
  matchOrders(
    orders: MatchOrdersRequest[],
    fulfillments: MatchOrdersRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>;
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
  pixMerkleMinter(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _pixMerkleMinter Type: address, Indexed: false
   */
  setMerkleMinter(
    _pixMerkleMinter: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param orders Type: tuple[], Indexed: false
   */
  validate(
    orders: ValidateRequest[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
