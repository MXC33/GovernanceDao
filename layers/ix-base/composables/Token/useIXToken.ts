
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

