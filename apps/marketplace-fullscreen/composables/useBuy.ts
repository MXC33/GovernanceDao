import { AdvancedOrder, Bid, IXToken, OrderMessage, Sale, SingleItemData } from "@ix/base/composables/Token/useIXToken";
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";
import { useSeaportContract } from "~/composables/useAssetContracts";
import { conduitKey } from "@ix/base/composables/Contract/WalletAddresses";
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";

export interface BuyItem {
  token: IXToken,
  sales?: Sale[]
}

export const useBuyItems = (item: SingleItemData) => {
  const getAveragePrice = (sales: Sale[]) => {
    if (!sales || sales.length === 0)
      return 0
    const totalQuantity = sales.reduce((prev, sale) => prev + sale.quantity, 0)
    const totalPrice = sales.reduce((prev, sale) => prev + sale.quantity * sale.price, 0)
    return totalPrice / totalQuantity
  }

  const isSubstituteListing = ref(false)
  const maxPrice = ref<number>(0)
  const sales = item.sales || []
  const shares = ref<AdjustableNumber>({
    value: 1,
    min: 1,
    max: computed<number>(() => {
      if (!isSubstituteListing.value) {
        return sales?.reduce((prev, sale) => prev + sale.quantity, 0)
      }
      return sales.filter((item: Sale) => item.price <= maxPrice.value).reduce((prev, sale) => prev + sale.quantity, 0)
    })
  });

  watch(isSubstituteListing, (val) => {
    if (!val)
      maxPrice.value = 0
    else
      maxPrice.value = roundToDecimals(getAveragePrice(sales), 4)

    if (shares.value.max && shares.value.value > shares.value.max)
      shares.value.value = shares.value.max
  })

  const selectedSalesToBuy = computed<BuyItem>(() => {
    if (!sales || sales.length === 0)
      return { token: item, sales: [] } // return early if no sales

    let sortedSales = [...sales]
      .filter((item: Sale) => item.price <= maxPrice.value || !isSubstituteListing.value)
      .sort((a, b) => {
        if (!a.price) return 1
        if (!b.price) return -1
        return (+a.price < +b.price) ? -1 : ((+b.price < +a.price) ? 1 : 0)
      })

    let salesToBuy = []
    if (!isSubstituteListing.value) {
      let i = 0
      while (i < shares.value.value && sortedSales[0]) {
        if (sortedSales[0].quantity > shares.value.value - i) {
          salesToBuy.push({
            ...sortedSales[0],
            quantity: shares.value.value - i
          })
          i = shares.value.value
        } else {
          salesToBuy.push(sortedSales[0])
          i += sortedSales[0].quantity
        }
        sortedSales.splice(0, 1)
      }
    }
    else {
      salesToBuy = sortedSales
    }

    return {
      token: item,
      sales: salesToBuy
    }
  })

  const totalPrice = computed<number>(() => {
    if (!selectedSalesToBuy || !selectedSalesToBuy.value || !selectedSalesToBuy.value.sales) return 0
    return roundToDecimals(
      selectedSalesToBuy.value.sales.reduce((prev, sale) => prev + sale.quantity * sale.price, 0)
      , 4)
  })

  const totalMaxPrice = computed<number>(() => {
    return roundToDecimals(
      getAveragePrice(selectedSalesToBuy.value.sales as Sale[]) * shares.value.value
      , 4)
  })

  const averagePricePerItem = computed<number>(() => {
    return roundToDecimals(
      getAveragePrice(selectedSalesToBuy.value.sales as Sale[])
      , 4)
  })

  const aboveFloorPrice = computed<number>(() => {
    if (!averagePricePerItem) return 0
    const avg = roundToDecimals(
      getAveragePrice(selectedSalesToBuy.value.sales as Sale[])
      , 8)
    return roundToDecimals(
      ((avg * 100) / item.sale_price) - 100
      , 2)
  })

  const showIncreaseMaxPrice = computed<boolean>(() => {
    if (!selectedSalesToBuy || !selectedSalesToBuy.value || !selectedSalesToBuy.value.sales || !item.sales) return false
    const totalQuantity = item.sales.reduce((prev, sale) => prev + sale.quantity, 0)
    const totalSelectedQuantity = selectedSalesToBuy.value.sales.reduce((prev, sale) => prev + sale.quantity, 0)
    return (shares.value.value === shares.value.max && totalQuantity > totalSelectedQuantity)
  })

  return {
    isSubstituteListing,
    shares,
    maxPrice,
    selectedSalesToBuy,
    totalPrice,
    totalMaxPrice,
    averagePricePerItem,
    aboveFloorPrice,
    showIncreaseMaxPrice
  }
}

interface OrderIdentifier {
  orderIndex: number,
  itemIndex: number
}

interface Consideration {
  key: string,
  value: OrderIdentifier[]
}

export const useBuyHelpers = () => {
  const generateConsiderations = (buyOrders: AdvancedOrder[]) => {
    const offers: OrderIdentifier[][] = []
    const considerations: Consideration[] = []

    buyOrders.forEach((buyOrder, orderIndex) => {
      offers.push([
        { orderIndex, "itemIndex": 0 }
      ])

      buyOrder.parameters.consideration.forEach((consideration, itemIndex) => {
        const index = considerations.findIndex(item =>
          item.key === consideration.recipient
        )

        const identifier: OrderIdentifier = { orderIndex, itemIndex }

        if (index !== -1)
          return considerations[index].value.push(identifier)

        considerations.push({
          key: consideration.recipient,
          value: [identifier]
        })
      })
    })

    const mappedConsiderations = considerations.map((item) => item.value)

    return {
      offers,
      considerations: mappedConsiderations
    }
  }

  const getOrderMessage = (item: Sale | Bid) => {
    try {
      const message = JSON.parse(item.message) as OrderMessage
      return message
    } catch (e) { }
    return undefined
  }

  const createBuyOrder = (sale: Sale | Bid, quantity: number, substitute?: boolean) => {
    const message = getOrderMessage(sale)
    if (!message?.body?.consideration)
      return

    delete message.body.counter
    message.body.totalOriginalConsiderationItems = message.body.consideration.length

    const buyAmount = Math.min(sale.quantity, quantity)

    const getOrder = (amount: number) => ({
      parameters: message.body,
      numerator: amount,
      denominator: message.body.offer[0].endAmount,
      signature: message.signature,
      extraData: "0x"
    }) as AdvancedOrder

    const orders: AdvancedOrder[] = []

    if (!substitute)
      return [getOrder(buyAmount)]

    for (var i = 0; i < buyAmount; i++) {
      orders.push(getOrder(i))
    }
    return orders
  }

  const isAdvancedOrder = (order: AdvancedOrder[] | undefined): order is AdvancedOrder[] =>
    order != undefined

  return {
    getOrderMessage,
    isAdvancedOrder,
    generateConsiderations,
    createBuyOrder
  }
}

export const useBuyContract = () => {
  const buySingleItem = async (buyItem: BuyItem, totalPrice: number, quantity: number, substitute?: boolean) => {
    const { generateConsiderations, createBuyOrder, isAdvancedOrder } = useBuyHelpers()

    if (!buyItem.sales || !buyItem.sales.length)
      throw new Error("No sales item")

    const { allowanceCheck } = useIXTContract()

    if (!await allowanceCheck(totalPrice))
      throw new Error("Allowance failed")

    const { fulfillAvailableAdvancedOrders } = useSeaportContract()

    const sales = buyItem.sales ?? []
    const buyOrders = sales.map((sale) =>
      createBuyOrder(sale, quantity, substitute)
    ).filter(isAdvancedOrder).flat()

    const { offers, considerations } = generateConsiderations(buyOrders)

    // @ts-ignore
    return await fulfillAvailableAdvancedOrders(buyOrders, [], offers, considerations, conduitKey.polygon, ZERO_ADDRESS, quantity)
  }

  return {
    buySingleItem
  }
}
