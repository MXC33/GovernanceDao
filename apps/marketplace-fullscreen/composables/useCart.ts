import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber"

export interface CartItem extends AdjustableNumber {
  token: IXToken,
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart-items', () => [])
  const viewingCart = useState('cart-visible', () => false)

  const removeFromCart = (token: IXToken) => {

    const index = cartItems.value.findIndex((item) => item.token.token_id == token.token_id)
    console.log("remove", index, token.token_id, cartItems.value.map((item) => item.token.token_id))

    cartItems.value.splice(index, 1)
  }

  const addToCart = (token: IXToken) => {
    cartItems.value.push({
      token,
      value: 1
    })

    viewingCart.value = true
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    viewingCart,
    clearCart,
    removeFromCart,
    addToCart
  }
}
