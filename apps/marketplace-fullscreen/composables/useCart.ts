import { IXToken, Sale } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber"
import { get1155Contract, useSeaportContract } from "~/composables/useAssetContracts";
import {
} from "@ix/base/composables/Token/useIXToken"
import {
  conduitKey
} from "@ix/base/composables/Contract/WalletAddresses";
import { useIXTContract } from "@ix/base/composables/Contract/useIXTContract";

export interface CartItem extends AdjustableNumber {
  token: IXToken,
  sale?: Sale,
  failed?: boolean
}


export const useCart = () => {
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

  const addToCart = (token: IXToken, sale?: Sale) => {
    cartItems.value.push({
      token,
      sale,
      min: 1,
      max: sale?.quantity,
      value: 1
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
      item.sale && createBuyOrder(item.sale, item.value, false)
    ).filter(isAdvancedOrder).flat()

    const { considerations, offers } = generateConsiderations(buyOrders)

    // @ts-ignore
    return await fulfillAvailableAdvancedOrders(buyOrders, [], offers, considerations, conduitKey.polygon, ZERO_ADDRESS, buyOrders.length, cartItems)
  }

  return {
    cartItems,
    viewingCart,
    clearCart,
    removeFromCart,
    checkoutItems,
    addToCart
  }
}
