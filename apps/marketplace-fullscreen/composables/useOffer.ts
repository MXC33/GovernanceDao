import { AdvancedOrder, Bid, IXToken, OrderMessage, SingleItemData } from "@ix/base/composables/Token/useIXToken";
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";
import { conduitKey } from "@ix/base/composables/Contract/WalletAddresses";
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";
import { TransactionItem } from "~/composables/useTransactions";

export interface OfferItem {
  token: IXToken,
  bids?: Bid[]
}

export interface AcceptingItem extends TransactionItem {
  type: 'accept',
  bid: Bid
}

export interface RejectionItem extends TransactionItem {
  type: 'reject',
  bid: Bid
}

export const useAcceptingItem = () => {
  const acceptingItems = useState<AcceptingItem[]>('accepting-item')

  const createAcceptingItem = (token: IXToken): AcceptingItem => ({
    type: 'accept',
    token,
    shares: {
      min: 1,
      value: 1,
      max: token.my_shares > token.bid.quantity ?
        token.bid.quantity : token.my_shares
    },
    bid: token.bid,
    ixtPrice: token.bid.price
  })

  const createAcceptingItems = (tokens: IXToken[]) =>
    acceptingItems.value = tokens.map(createAcceptingItem)

  return {
    createAcceptingItems,
    acceptingItems
  }
}

export const useRejectItems = () => {
  const rejectItems = useState<RejectionItem[]>('rejection-items')

  const createRejectionItem = (token: IXToken): RejectionItem => ({
    type: 'reject',
    token,
    shares: {
      min: 1,
      value: 1,
      max: 1
    },
    bid: token.bid,
    ixtPrice: token.bid.price
  })

  const createRejectionItems = (tokens: IXToken[]) =>
    rejectItems.value = tokens.map(createRejectionItem)

  return {
    createRejectionItems,
    rejectItems
  }
}

export const useOfferItems = (item: SingleItemData) => {
  const getAveragePrice = (bids: Bid[]) => {
    if (!bids || bids.length === 0)
      return 0
    const totalQuantity = bids.reduce((prev, bid) => prev + bid.quantity, 0)
    const totalOffer = bids.reduce((prev, bid) => prev + bid.quantity * bid.price, 0)
    return totalOffer / totalQuantity
  }

  const isSubstituteOffering = ref(false)
  const minOffer = ref<number>(0)
  const bids = item.bids || []
  const shares = ref<AdjustableNumber>({
    value: 1,
    min: 1,
    max: computed<number>(() => {
      if (!isSubstituteOffering.value) {
        return bids.reduce((prev, bid) => prev + bid.quantity, 0)
      }
      return bids.filter((item: Bid) => item.price >= minOffer.value).reduce((prev, bid) => prev + bid.quantity, 0)
    })
  })

  watch(isSubstituteOffering, (val) => {
    if (!val)
      minOffer.value = 0
    else
      minOffer.value = roundToDecimals(getAveragePrice(bids), 4)

    if (shares.value.max && shares.value.value > shares.value.max)
      shares.value.value = shares.value.max
  })

  const selectedBidsToAccept = computed<OfferItem>(() => {
    if (!bids || bids.length === 0)
      return { token: item, bids: [] } // return early if no bids

    let sortedBids = [...bids]
      .filter((item: Bid) => item.price >= minOffer.value || !isSubstituteOffering.value)
      .sort((a, b) => {
        if (!a.price) return 1
        if (!b.price) return -1
        return (+a.price > +b.price) ? -1 : ((+b.price > +a.price) ? 1 : 0)
      })

    let bidsToAccept = []
    if (!isSubstituteOffering.value) {
      let i = 0
      while (i < shares.value.value && sortedBids[0]) {
        if (sortedBids[0].quantity > shares.value.value - i) {
          bidsToAccept.push({
            ...sortedBids[0],
            quantity: shares.value.value - i
          })
          i = shares.value.value
        } else {
          bidsToAccept.push(sortedBids[0])
          i += sortedBids[0].quantity
        }
        sortedBids.splice(0, 1)
      }
    }
    else {
      bidsToAccept = sortedBids
    }

    return {
      token: item,
      bids: bidsToAccept
    }
  })

  const totalOffer = computed<number>(() => {
    if (!selectedBidsToAccept || !selectedBidsToAccept.value || !selectedBidsToAccept.value.bids) return 0
    return roundToDecimals(
      selectedBidsToAccept.value.bids.reduce((prev, bid) => prev + bid.quantity * bid.price, 0)
      , 4)
  })

  const totalMinOffer = computed<number>(() => {
    return roundToDecimals(
      getAveragePrice(selectedBidsToAccept.value.bids as Bid[]) * shares.value.value
      , 4)
  })

  const averageOfferPerItem = computed<number>(() => {
    return roundToDecimals(
      getAveragePrice(selectedBidsToAccept.value.bids as Bid[])
      , 4)
  })

  const belowHighestOffer = computed<number>(() => {
    if (!averageOfferPerItem) return 0
    const avg = roundToDecimals(
      getAveragePrice(selectedBidsToAccept.value.bids as Bid[])
      , 8)
    return roundToDecimals(
      ((item.higher_bid_price * 100) / avg) - 100
      , 2)
  })

  const showDecreaseMinPrice = computed<boolean>(() => {
    if (!selectedBidsToAccept || !selectedBidsToAccept.value || !selectedBidsToAccept.value.bids || !item.bids) return false
    const totalQuantity = item.bids.reduce((prev, bid) => prev + bid.quantity, 0)
    const totalSelectedQuantity = selectedBidsToAccept.value.bids.reduce((prev, bid) => prev + bid.quantity, 0)
    return (shares.value.value === shares.value.max && totalQuantity > totalSelectedQuantity)
  })

  return {
    isSubstituteOffering,
    shares,
    minOffer,
    selectedBidsToAccept,
    totalOffer,
    totalMinOffer,
    averageOfferPerItem,
    belowHighestOffer,
    showDecreaseMinPrice
  }
}

export const useOfferContract = () => {
  const { generateConsiderations, getOrderMessage, getTransactionContract } = useTransactionHelpers()
  const { allowanceCheck } = useIXTContract()
  const { fulfillAvailableAdvancedOrders, fulfillAdvancedOrder } = useSeaportContract()

  const getOrderBody = (message: OrderMessage, amount: number) => {
    delete message.body.counter

    message.body.totalOriginalConsiderationItems = message.body.consideration.length

    const order: AdvancedOrder = {
      parameters: message.body,
      numerator: amount,
      denominator: message.body.consideration[0].endAmount ?? 0,
      signature: message.signature,
      extraData: "0x"
    }

    return order
  }

  const multiAccept = async (item: AcceptingItem[]) => {
    const accepts = item.map(acceptOffer)
    return await Promise.all(accepts)
  }

  const acceptOffer = async (item: AcceptingItem) => {
    const { token, bid, shares, ixtPrice } = item

    if (!bid)
      throw new Error("There is no offer")

    const totalOffer = (ixtPrice || 0) * shares.value

    const message = getOrderMessage(bid)
    if (!message?.body?.consideration)
      throw new Error("Invalid Body!")

    const nftContract = getTransactionContract(token)
    const approveNftCheck = await nftContract.approveNftCheck()

    if (!approveNftCheck)
      throw new Error(CustomErrors.approvalError)

    if (!await allowanceCheck(totalOffer))
      throw new Error(CustomErrors.allowanceError)

    const order = getOrderBody(message, shares.value)
    // @ts-ignore
    return await fulfillAdvancedOrder(order, [], conduitKey.polygon, ZERO_ADRESS)
  }

  const acceptOffers = async (offerItem: OfferItem, totalOffer: number, quantity: number) => {
    const { token, bids } = offerItem

    if (!bids || !bids.length)
      throw new Error("There are no offers")

    const nftContract = getTransactionContract(token)
    const approveNftCheck = await nftContract.approveNftCheck()
    if (!approveNftCheck)
      throw new Error(CustomErrors.approvalError)


    if (!await allowanceCheck(totalOffer))
      throw new Error(CustomErrors.allowanceError)

    const buyOrders = bids.map((bid) => {
      if (!bid)
        return null

      const message = getOrderMessage(bid)

      if (!message?.body.consideration)
        return null

      delete message.body.counter

      message.body.totalOriginalConsiderationItems = message.body.consideration.length

      const offerAmount = bid.quantity < quantity ? bid.quantity : quantity

      return Array.from({ length: offerAmount }, () => getOrderBody(message, 1))
    }).flat().filter(notNull)

    const { offers, considerations } = generateConsiderations(buyOrders)

    // @ts-ignore
    return await fulfillAvailableAdvancedOrders(buyOrders, [], offers, considerations, conduitKey.polygon, ZERO_ADRESS, quantity)
  }

  return {
    multiAccept,
    acceptOffer,
    acceptOffers
  }
}
