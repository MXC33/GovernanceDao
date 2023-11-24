import { ethers } from 'ethers'
import { ContractInterface, defineContract, ZERO_ADRESS, ZERO_ADRESS_LONG } from "@ix/base/composables/Utils/defineContract"
import { AdvancedOrder, Bid, OrderMessage } from "@ix/base/composables/Token/useIXToken"

import {
  roverAddress,
  assetsAddress,
  avatarNFTAddress,
  badgeNFTAddress,
  seaportAdress,
  conduitKey
} from '@ix/base/composables/Contract/WalletAddresses'

import Seaport from '@ix/base/composables/Contract/Abis/Seaport.json'

import { ContractContext as SeaportContract } from '@ix/base/composables/Contract/Abis/Seaport'

import { CartItem } from "~/composables/useCart";
import { AcceptingItem } from "~/composables/useOffer";


export const ERC1155Addresses = [assetsAddress.polygon?.toLowerCase(), avatarNFTAddress.polygon?.toLowerCase(), landmarkAddress.polygon?.toLowerCase(), gravityGradeAddress.polygon?.toLowerCase()]

export const ERC721Addresses = [roverAddress.polygon?.toLowerCase(), badgeNFTAddress.polygon?.toLowerCase()]


export interface ConsiderationItem {
  recipient: string,
  endAmount?: number,
  token: string,
  identifierOrCriteria: string
}

export const useSeaportContract = <T extends ContractInterface<T> & SeaportContract>() => {
  const { walletAdress, getCollectionType } = useWallet()
  const { fetchIXAPI } = useIXAPI()
  const { clearFailedCartItems, addFailedCartItem } = useCart()
  const { createBuyOrder, isAdvancedOrder, getOrderMessage } = useTransactionHelpers()
  const { withContract, createTransaction, ...contractSpec } = defineContract<T>('Seaport-contract', {
    contractAddress: seaportAdress.polygon as string,
    createContract(provider) {
      return new ethers.Contract(seaportAdress.polygon as string, Seaport.abi, provider.getSigner()) as unknown as T
    }
  })
  const pixMerkleParam = {
    merklePixInfo: {
      to: ZERO_ADRESS,
      pixId: 0,
      category: 0,
      size: 0,
    },
    merkleRoot: ZERO_ADRESS_LONG,
    merkleProof: [ZERO_ADRESS_LONG]
  }

  const getOrderBody = (message: OrderMessage, amount: number) => {
    delete message.body.counter

    message.body.totalOriginalConsiderationItems = message.body.consideration.length

    const order: AdvancedOrder = {
      parameters: message.body,
      numerator: amount,
      denominator: message.body.consideration[0].endAmount ?? 0,
      signature: message.signature,
      extraData: "0x"
    }

    return order
  }

  const fulfillAvailableAdvancedOrders = (advancedOrders: AdvancedOrder[], criteriaResolvers: [], offerFulfillments: any[], considerationFulfillments: any[], fulfillerConduitKey: string | null, recipient: string, maximumFulfilled: number, cartItems?: CartItem[], offers?: Bid[]) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.fulfillAvailableAdvancedOrders(advancedOrders, criteriaResolvers, offerFulfillments, considerationFulfillments, fulfillerConduitKey ?? '', recipient, maximumFulfilled)
    }, {
      onFail: async (error) => {
        console.log("ON FAIL", error)
        clearFailedCartItems()

        if (cartItems && cartItems.length) {
          const requests = cartItems.map(async (item) => {
            const { sale } = item
            if (!sale)
              return

            const message = getOrderMessage(sale)
            const buyOrder = createBuyOrder(sale, item.shares.value, false)

            if (!isAdvancedOrder(buyOrder) || !message)
              return

            try {
              await fulfillAdvancedOrderGasEstimate(buyOrder[0])
            } catch (err) {
              addFailedCartItem(item)

              const { token, identifierOrCriteria } = message.body.offer[0]

              return await fetchIXAPI('web3/sale/transfer/update/listing/job', 'POST', {
                size: getCollectionType(token),
                player_id: sale.player_id,
                network: 'polygon',
                collection: token.toLowerCase(),
                token_id: identifierOrCriteria,
              })
            }
          })

          return Promise.all(requests)
        }

        else if (offers && offers.length) {
          const requests = offers.map(async (bid) => {

            const message = getOrderMessage(bid)
            if (!message || message?.body?.consideration.length == 0)
              return

            try {
              const order = getOrderBody(message, bid.quantity)
              await fulfillAdvancedOrderGasEstimate(order)
            } catch (err) {
              const { token, identifierOrCriteria } = message.body.consideration[0]

              return await fetchIXAPI('web3/update/offers/job', 'POST', {
                size: getCollectionType(token),
                player_id: bid.bidder_id,
                network: 'polygon',
                collection: token.toLowerCase(),
                reference_id: identifierOrCriteria,
                owner_id: 0
              })
            }
          })

          return Promise.all(requests)
        }
      }
    })

  const fulfillAdvancedOrderGasEstimate = async (buyOrderComponents: AdvancedOrder) =>
    withContract((contract) => {
      const address = walletAdress.value

      if (!address)
        return undefined

      return contract.estimateGas.fulfillAdvancedOrder(buyOrderComponents, [], conduitKey.polygon, ZERO_ADRESS, pixMerkleParam)
    })

  const fulfillAdvancedOrder = (advancedOrders: AdvancedOrder, criteriaResolvers: [], fulfillerConduitKey: string, recipient: string, item?: AcceptingItem) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      // @ts-ignore
      return contract.fulfillAdvancedOrder(advancedOrders, criteriaResolvers, fulfillerConduitKey, recipient, pixMerkleParam)
    }, {
      onFail: async (error) => {
        console.log("ON FAIL", error)

        if (!item || !item?.bid)
          return

        const { bid } = item

        const message = getOrderMessage(bid)
        if (!message || message?.body?.consideration.length == 0)
          return

        try {
          await fulfillAdvancedOrderGasEstimate(advancedOrders)
        } catch (err) {
          const { token, identifierOrCriteria } = message.body.consideration[0]

          return await fetchIXAPI('web3/update/offers/job', 'POST', {
            size: getCollectionType(token),
            player_id: bid.bidder_id,
            network: 'polygon',
            collection: token.toLowerCase(),
            reference_id: identifierOrCriteria,
            owner_id: 0
          })
        }
      }
    })

  return {
    ...contractSpec,
    fulfillAdvancedOrder,
    fulfillAvailableAdvancedOrders
  }
}
