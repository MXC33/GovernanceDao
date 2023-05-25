import { IXToken, Sale } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber"

export interface CartItem extends AdjustableNumber {
  token: IXToken,
  sale?: Sale
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart-items', () => [])
  const viewingCart = useState('cart-visible', () => false)

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

    viewingCart.value = true
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const checkoutItems = async (carItems: CartItem[]) => {
    /*
        Todo
        Start loading overlay
     */
    console.log('start Loading overlay')
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
