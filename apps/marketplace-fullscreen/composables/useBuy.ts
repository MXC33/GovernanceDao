import {CartItem} from "~/composables/useCart";
import {IXToken, Sale, SingleItemData} from "@ix/base/composables/Token/useIXToken";
import {AdjustableNumber} from "@ix/base/composables/Utils/useAdjustableNumber";

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
