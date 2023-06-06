import { IXToken, Sale } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber"
import { get1155Contract, useSeaportContract } from "~/composables/useAssetContracts";
import {
} from "@ix/base/composables/Token/useIXToken"
import {
  conduitKey
} from "@ix/base/composables/Contract/WalletAddresses";
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";
import { TransactionItem } from "./useTransactions";

export interface CartItem extends TransactionItem {
  token: IXToken,
  sale?: Sale,
}


export const useCart = () => {
  const cartFailedSales = useState<CartItem[]>('cart-failed-items', () => [])
  const cartItems = useState<CartItem[]>('cart-items', () => [])
  const viewingCart = useState('cart-visible', () => false)
  const { generateConsiderations, createBuyOrder, isAdvancedOrder } = useBuyHelpers()

  const { displaySnack } = useSnackNotifications()

  const removeFromCart = (cartItem: CartItem) => {

    const index = cartItems.value.findIndex((item) =>
      cartItem.token.token_id == item.token.token_id &&
      cartItem.sale?.sale_id == item.sale?.sale_id
    )

    cartItems.value.splice(index, 1)
  }

  const removeFailedItemsFromCart = () => {
    console.log("REMOVE ITMS", cartFailedSales.value.length)
    cartFailedSales.value.forEach((item) => {
      console.log("Remove item", item)
      removeFromCart(item)
    })
  }

  const clearFailedCartItems = () => cartFailedSales.value = []

  const addFailedCartItem = (item: CartItem) => {
    if (item.sale?.sale_id)
      cartFailedSales.value.push(item)

    console.log("Add fail")
  }

  const cartItemFailed = (cartItem: CartItem) =>
    cartFailedSales.value.some((item) => item.sale?.sale_id == cartItem.sale?.sale_id)

  const hasItemInCart = (sale: Sale) =>
    cartItems.value.some((item) => item.sale?.sale_id == sale.sale_id)

  const addToCart = (token: IXToken, sale: Sale) => {
    if (hasItemInCart(sale))
      return

    cartItems.value.push({
      type: 'bid',
      token,
      sale,
      ixtPrice: sale.price,
      shares: {
        min: 1,
        max: sale.quantity,
        value: 1
      }
    })

    displaySnack('add-to-cart')
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const checkoutItems = async (cartItems: CartItem[], totalPrice: number) => {
    //Todo Start loading overlay
    console.log('start Loading overlay')
    const { allowanceCheck } = useIXTContract()
    const { fulfillAvailableAdvancedOrders } = useSeaportContract()
    await allowanceCheck(totalPrice)

    const buyOrders = cartItems.map((item) =>
      item.sale && createBuyOrder(item.sale, item.shares.value, false)
    ).filter(isAdvancedOrder).flat()

    const { considerations, offers } = generateConsiderations(buyOrders)

    // @ts-ignore
    return await fulfillAvailableAdvancedOrders(buyOrders, [], offers, considerations, conduitKey.polygon, ZERO_ADDRESS, buyOrders.length, cartItems)
  }

  return {
    cartItems,
    viewingCart,
    cartFailedSales,
    cartItemFailed,
    addFailedCartItem,
    clearFailedCartItems,
    removeFailedItemsFromCart,
    hasItemInCart,
    clearCart,
    removeFromCart,
    checkoutItems,
    addToCart
  }
}
