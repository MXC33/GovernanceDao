import {AdvancedOrder, IXToken, Sale, SingleItemData} from "@ix/base/composables/Token/useIXToken";
import {AdjustableNumber} from "@ix/base/composables/Utils/useAdjustableNumber";
import {getIXTokenContract, getSeaportContract} from "~/composables/useAssetContracts";
import {conduitKey} from "@ix/base/composables/Contract/WalletAddresses";

export interface BuyItem {
  token: IXToken,
  sales?: Sale[]
}

export const useBuyItems = (item: SingleItemData) => {
  const getAveragePrice = (sales: Sale[]) => {
    const totalQuantity = sales.reduce((prev, sale) => prev + sale.quantity, 0)
    const totalPrice = sales.reduce((prev, sale) => prev + sale.quantity * sale.price, 0)
    return totalPrice / totalQuantity
  }

  const isSubstituteListing = ref(false)
  const maxPrice = ref<number>(0)
  const shares = ref<AdjustableNumber>({
    value: 1,
    min: 1,
    max: computed<number>(() => {
      if (!isSubstituteListing.value) {
        return item.sales.reduce((prev, sale) => prev + sale.quantity, 0)
      }
      return item.sales.filter((item: Sale) => item.price <= maxPrice.value).reduce((prev, sale) => prev + sale.quantity, 0)
    })
  })

  watch(isSubstituteListing, (val) => {
    if (!val)
      maxPrice.value = 0
    else
      maxPrice.value = roundToDecimals(getAveragePrice(item.sales), 4)
  })

  const selectedSalesToBuy = computed<BuyItem>(() => {

    let sales = [...item.sales]
      .filter((item: Sale) => item.price <= maxPrice.value || !isSubstituteListing.value)
      .sort((a, b) => {
        if (!a.price) return 1
        if (!b.price) return -1
        return (+a.price < +b.price) ? -1 : ((+b.price < +a.price) ? 1 : 0)
      })

    let salesToBuy = []
    if (!isSubstituteListing.value) {
      let i = 0
      while (i < shares.value.value && sales[0]) {
        if (sales[0].quantity > shares.value.value - i) {
          salesToBuy.push({
            ...sales[0],
            quantity: shares.value.value - i
          })
          i = shares.value.value
        } else {
          salesToBuy.push(sales[0])
          i += sales[0].quantity
        }
        sales.splice(0,1)
      }
    }
    else {
      salesToBuy = sales
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
    return roundToDecimals(
      ((averagePricePerItem.value * 100) / item.sale_price) - 100
      , 2)
  })

  const showIncreaseMaxPrice = computed<boolean>(() => {
    if (!selectedSalesToBuy || !selectedSalesToBuy.value || !selectedSalesToBuy.value.sales) return false
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
      alert('There are no sales')
      return false
    }

    const { allowanceCheck } = getIXTokenContract()
    const { fulfillAvailableAdvancedOrders } = getSeaportContract()

    if (!await allowanceCheck(totalPrice)) {
      /*
        Todo
        Approve didn't work
      */
      alert('Allowance didn\'t work')
      return false
    }

    const pixMerkleParam = {
      merklePixInfo: {
        to: "0x0000000000000000000000000000000000000000",
        pixId: 0,
        category: 0,
        size: 0,
      },
      merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
      merkleProof: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
    }

    let BuyOrderComponents: AdvancedOrder[] = []
    let offers = []
    let considerations = []

    for (const sale of buyItem.sales) {
      if(sale){
        let message: any = {}
        try {
          message = JSON.parse(sale.message)
        } catch (e) {}

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
    try {
      // @ts-ignore
      return await fulfillAvailableAdvancedOrders(BuyOrderComponents, [], offers, considerations.map(item => item.value), conduitKey.polygon, "0x0000000000000000000000000000000000000000", quantity)
    }
    catch (err: any) {
      console.log("fulfillAvailableAdvancedOrders error");
      return false
    }
  }

  return {
    checkoutSales
  }
}
