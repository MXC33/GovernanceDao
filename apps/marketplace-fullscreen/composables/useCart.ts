import { IXToken } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber"

export interface CartItem extends AdjustableNumber {
  token: IXToken,
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart-items', () => [])
  const viewingCart = useState('cart-visible', () => false)


  const addToCart = (token: IXToken) => {
    cartItems.value.push({
      token,
      value: 1
    })

    viewingCart.value = true
  }

  return {
    cartItems,
    viewingCart,
    addToCart
  }
}
