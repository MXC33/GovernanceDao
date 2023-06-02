import { AdvancedOrder, Bid, IXToken, SingleItemData } from "@ix/base/composables/Token/useIXToken";
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";
import {
  get1155Contract,
  get721Contract,
  getIXTokenContract,
  getSeaportContract,
  NFTType
} from "~/composables/useAssetContracts";
import { conduitKey } from "@ix/base/composables/Contract/WalletAddresses";

export interface OfferItem {
  token: IXToken,
  bids?: Bid[]
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
        sortedBids.splice(0,1)
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
  const acceptOffers = async (offerItem: OfferItem, totalOffer: number, quantity: number) => {
    //Todo Start loading overlay
    console.log('start Loading overlay')

    const { token: { collection, nft_type }, bids  } = offerItem

    if (!bids || !bids.length) {
      /*
        Todo
        There are no offers
      */
      throw new Error("There are no offers")
    }

    const nftContract = nft_type === NFTType.ERC1155 ? get1155Contract(collection as string) : get721Contract(collection as string)
    const approveNftCheck = await nftContract.approveNftCheck()
    if (!approveNftCheck) {
      /*
        Todo
        Approve didn't work
      */
      throw new Error("Approve didn't work")
    }

    const { allowanceCheck } = getIXTokenContract()
    if (!await allowanceCheck(totalOffer)) {
      /*
        Todo
        Allowance didn't work
      */
      throw new Error("Allowance didn't work")
    }

    const { fulfillAvailableAdvancedOrders } = getSeaportContract()

    let BuyOrderComponents: AdvancedOrder[] = []
    let offers = []
    let considerations = []

    for (const bid of bids) {
      if (bid) {
        let message: any = {}
        try {
          message = JSON.parse(bid.message)
        } catch (e) { }

        if (!message.body || !message.body.consideration) {
          continue
        }

        delete message.body.counter
        message.body.totalOriginalConsiderationItems = message.body.consideration.length

        const iterable = bid.quantity < quantity ? bid.quantity : quantity
        for (let k = 0; k < iterable; k++) {
          BuyOrderComponents.push({
            parameters: message.body,
            numerator: 1,
            denominator: message.body.consideration[0].endAmount,
            signature: message.signature,
            extraData: "0x"
          })
        }
      }
    }
    let i = 0
    for (const BuyOrderComponent of BuyOrderComponents) {
      offers.push([
        { "orderIndex": i, "itemIndex": 0 }
      ])

      let j = 0;
      for (const considerationItem of BuyOrderComponent.parameters.consideration) {
        const foundIndex = considerations.findIndex(item => item.key === considerationItem.recipient)
        if (foundIndex !== -1) {
          considerations[foundIndex].value.push({ "orderIndex": i, "itemIndex": j })
        } else {
          considerations.push({
            key: considerationItem.recipient,
            value: [{ "orderIndex": i, "itemIndex": j }]
          })
        }
        j++
      }
      i++
    }

    // @ts-ignore
    return await fulfillAvailableAdvancedOrders(BuyOrderComponents, [], offers, considerations.map(item => item.value), conduitKey.polygon, "0x0000000000000000000000000000000000000000", quantity)
  }

  return {
    acceptOffers
  }
}
