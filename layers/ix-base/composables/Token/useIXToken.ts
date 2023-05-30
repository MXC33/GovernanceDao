import { CHAIN_NET_ADDRESS } from "~/composables/Contract/useWallet";
import { seaportAdress } from "~/composables/Contract/WalletAddresses";
import { ConsiderationItem } from "@ix/marketplace/composables/useAssetContracts";

export interface IXTokenAttribute {
  value: string
  trait_type: string
}

export interface IXTokenParent {
  id: string
  name: string
  slug: string
  parent_id: any
}


export interface IXToken {
  _index: string
  collection: string
  network: string
  token_id: number
  type: number
  nft_type: number
  reference: any
  image: string
  thumbnail: string
  icon: string
  video: string
  name: string
  slug: any
  attributes: IXTokenAttribute[]
  sale_price: number
  higher_bid_price: number
  parent: IXTokenParent
  my_shares: number
  bid: Bid
  lowest_sale: LowestSale
}

export interface SingleItemData extends IXToken {
  sale_id: number
  sale_price: number
  sale_timestamp: number
  sale_endtime: number
  sold_timestamp: number
  sold_price: number
  description?: string,
  higher_bid_price: number
  higher_bid_bidder_id: number
  higher_bid_message: string
  bidders: string
  sellers: string
  bids: Bid[]
  sales: Sale[]
  shares: number
  is_favorite: boolean
  favorite_count: number
}

export interface Bid {
  bidder_id: number
  quantity: number
  bidder_username: string
  price: number
  due_date: number
  message: string
}

export interface LowestSale {
  endtime: number
  message: string
  player_id: number
  player_username: string
  player_wallet: string
  price: number
  quantity: number
  sale_id: number
  timestamp: number
}

export interface Sale {
  sale_id: number
  player_id: number
  quantity: number
  player_wallet: string
  price: number
  endtime: number
  message: string
  player_username: string
  timestamp: number
}

export const ItemType = {
  NATIVE: 0,
  ERC20: 1,
  ERC721: 2,
  ERC1155: 3,
  ERC721_WITH_CRITERIA: 4,
  ERC1155_WITH_CRITERIA: 5,
  ERC721MM: 6
}

export const OrderType = {
  FULL_OPEN: 0,
  PARTIAL_OPEN: 1,
  FULL_RESTRICTED: 2,
  PARTIAL_RESTRICTED: 3
}

export const typedData = {
  OrderComponents: [
    { name: "offerer", type: "address" },
    { name: "zone", type: "address" },
    { name: "offer", type: "OfferItem[]" },
    { name: "consideration", type: "ConsiderationItem[]" },
    { name: "orderType", type: "uint8" },
    { name: "startTime", type: "uint256" },
    { name: "endTime", type: "uint256" },
    { name: "zoneHash", type: "bytes32" },
    { name: "salt", type: "uint256" },
    { name: "conduitKey", type: "bytes32" },
    { name: "counter", type: "uint256" }
  ],
  OfferItem: [
    { name: "itemType", type: "uint8" },
    { name: "token", type: "address" },
    { name: "identifierOrCriteria", type: "uint256" },
    { name: "startAmount", type: "uint256" },
    { name: "endAmount", type: "uint256" },
    { name: "pixHash", type: "bytes32" }
  ],
  ConsiderationItem: [
    { name: "itemType", type: "uint8" },
    { name: "token", type: "address" },
    { name: "identifierOrCriteria", type: "uint256" },
    { name: "startAmount", type: "uint256" },
    { name: "endAmount", type: "uint256" },
    { name: "recipient", type: "address" }
  ]
}

export interface OfferItem {
  ItemType: typeof ItemType;
  token: string,
  identifierOrCriteria: number,
  startAmount: number,
  endAmount: number
}
export interface OrderParameters {
  offerer: string,
  address: string,
  offer: OfferItem[],
  consideration: ConsiderationItem[],
  orderType: typeof OrderType,
  startTime: number,
  endTime: number,
  zoneHash: string,
  salt: number,
  conduitKey: string,
  totalOriginalConsiderationItems: number
}
export interface AdvancedOrder {
  parameters: OrderParameters,
  numerator: number,
  denominator: number,
  signature: string,
  extraData: string
}
export interface Fulfillment {
  offerComponents: FulfillmentComponent[],
  considerationComponents: FulfillmentComponent[]
}
export interface FulfillmentComponent {
  orderIndex: number,
  itemIndex: number
}
export const signDomain = {
  name: "PIXMarketplace",
  version: '1.1',
  chainId: CHAIN_NET_ADDRESS.polygon,
  verifyingContract: seaportAdress.polygon
}
