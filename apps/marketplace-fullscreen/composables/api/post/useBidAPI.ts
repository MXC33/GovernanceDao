import { CartItem } from "~/composables/useCart"

export interface BiddingBody {
  index: string,
  reference_id: number,
  price: number,
  due_date: number,
  quantity: number,
  network: string,
  collection: string,
  message: string
}

export const useBids = () => {
  const { placeBid: placeBidAPI } = useBidsAPI()

  const placeBid = (item: CartItem) => {
    const { token, sale } = item
    if (!sale || !sale?.price)
      return

    return placeBidAPI(token._index, token.reference, sale.price, sale.message, sale.sale_id)
  }

  return {
    placeBid
  }
}


export const useBidsAPI = () => {
  const placeBid = async (body: BiddingBody[]) => fetchIXAPI('web3/bid', 'POST', body)

  const removeBid = (index: string, referenceId: number, network: string, collection: string) => fetchIXAPI('web3/bid/remove/0', 'POST', {
    index,
    reference_id: referenceId,
    network,
    collection,
  })

  const rejectBid = (index: string, referenceId: number, playerId: number, saleId?: number) => fetchIXAPI('/web3/bid/reject/' + playerId, 'POST', {
    index,
    referenceId,
    saleId,
    playerId,
  })

  const rejectAllBid = (index: string, referenceId: number, saleId?: number) => fetchIXAPI('/web3/bid/reject/all', 'POST', {
    index,
    referenceId,
    saleId,
  })

  const acceptBid = (index: string, referenceId: number, saleId?: number) => fetchIXAPI('/web3/sale/accept', 'POST', {
    index,
    referenceId,
    saleId,
  })

  const counterBid = (index: string, referenceId: number, saleId?: number) => fetchIXAPI('/web3/bid/counter', 'POST', {
    index,
    referenceId,
    saleId,
  })



  return {
    placeBid,
    removeBid,
    rejectBid,
    rejectAllBid,
    acceptBid,
    counterBid,
  }
}
