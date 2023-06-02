import { IXToken, Sale } from "@ix/base/composables/Token/useIXToken"
import { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber"
import { get1155Contract, getIXTokenContract, useSeaportContract } from "~/composables/useAssetContracts";
import {
  AdvancedOrder,
} from "@ix/base/composables/Token/useIXToken"
import {
  conduitKey
} from "@ix/base/composables/Contract/WalletAddresses";
import { ethers } from "ethers";

export interface CartItem extends AdjustableNumber {
  token: IXToken,
  sale?: Sale,
  failed?: boolean
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

  const checkoutItems = async (carItems: CartItem[], totalPrice: number) => {
    //Todo Start loading overlay
    console.log('start Loading overlay')
    const { allowanceCheck } = getIXTokenContract()
    const { fulfillAvailableAdvancedOrders } = useSeaportContract()
    await allowanceCheck(totalPrice)

    let BuyOrderComponents: AdvancedOrder[] = []
    let offers = []
    let considerations = []
    let i = 0
    for (const item of carItems) {
      if (item.sale) {
        let message: any = {}
        try {
          message = JSON.parse(item.sale.message)
        } catch (e) { }

        if (!message.body || !message.body.consideration) {
          continue
        }

        delete message.body.counter
        message.body.totalOriginalConsiderationItems = message.body.consideration.length
        BuyOrderComponents.push({
          parameters: message.body,
          numerator: item.value,
          denominator: message.body.offer[0].endAmount,
          signature: message.signature,
          extraData: "0x"
        })

        offers.push([
          { "orderIndex": i, "itemIndex": 0 }
        ])

        let j = 0;
        for (const considerationItem of message.body.consideration) {
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
      // if(!await allowanceCheck(totalPrice))
      //   throw new Error("Something went wrong!");
      console.log('here', totalPrice)
    }
    try {
      // @ts-ignore
      return await fulfillAvailableAdvancedOrders(BuyOrderComponents, [], offers, considerations.map(item => item.value), conduitKey.polygon, "0x0000000000000000000000000000000000000000", BuyOrderComponents.length)
    }
    catch (err: any) {
      console.log("fulfillAvailableAdvancedOrders error", err);
      return false
    }
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
