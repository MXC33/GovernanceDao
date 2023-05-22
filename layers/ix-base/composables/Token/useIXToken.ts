
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