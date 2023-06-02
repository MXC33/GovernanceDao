import { AdvancedOrder, IXToken, Sale, SingleItemData } from "@ix/base/composables/Token/useIXToken";
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";
import { getIXTokenContract, getSeaportContract } from "~/composables/useAssetContracts";
import { conduitKey } from "@ix/base/composables/Contract/WalletAddresses";

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

export const useBuyContract = () => {
  const checkoutSales = async (buyItem: BuyItem, totalPrice: number, quantity: number) => {
    //Todo Start loading overlay
    console.log('start Loading overlay')

    if (!buyItem.sales || !buyItem.sales.length) {
      /*
        Todo
        There are no sales
      */
      throw new Error("There are no sales")
    }

    const { allowanceCheck } = getIXTokenContract()

    if (!await allowanceCheck(totalPrice)) {
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

    for (const sale of buyItem.sales) {
      if (sale) {
        let message: any = {}
        try {
          message = JSON.parse(sale.message)
        } catch (e) { }

        if (!message.body || !message.body.consideration) {
          continue
        }

        delete message.body.counter
        message.body.totalOriginalConsiderationItems = message.body.consideration.length

        const iterable = sale.quantity < quantity ? sale.quantity : quantity
        for (let k = 0; k < iterable; k++) {
          BuyOrderComponents.push({
            parameters: message.body,
            numerator: 1,
            denominator: message.body.offer[0].endAmount,
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
    checkoutSales
  }
}
