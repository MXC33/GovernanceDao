import { CartItem } from "~/composables/useCart"

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
  const placeBid = (index: string, referenceId: number, price: number, message: string, sale_id?: number) => fetchIXAPI('web3/bid', 'POST', {
    index,
    referenceId,
    sale_id,
    price,
    message
  })


  const removeBid = (index: string, referenceId: number, playerId: number, saleId?: number) => fetchIXAPI('/web3/bid/remove/' + playerId, 'POST', {
    index,
    referenceId,
    saleId,
    playerId,
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