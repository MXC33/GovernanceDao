import { IXToken } from "@ix/base/composables/Token/useIXToken"

export interface CartItem {
  token: IXToken,
  amount: number
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart-items', () => [])
  const viewingCart = useState('cart-visible', () => false)


  const addToCart = (token: IXToken) => {
    cartItems.value.push({
      token,
      amount: 1
    })

    viewingCart.value = true
  }

  return {
    cartItems,
    viewingCart,
    addToCart
  }
}
