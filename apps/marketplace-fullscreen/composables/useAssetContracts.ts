import { BigNumberish, ethers, ContractTransaction } from 'ethers'
import { ContractInterface, defineContract } from "@ix/base/composables/Utils/defineContract"
import {
  ItemType,
  OrderType,
  signDomain,
  typedData,
  OfferItem,
  OrderParameters,
  AdvancedOrder,
  Fulfillment,
  FulfillmentComponent
} from "@ix/base/composables/Token/useIXToken"

import {
  roverAddress,
  assetsAddress,
  avatarNFTAddress,
  badgeNFTAddress,
  IXTAddress, conduitAdress, seaportAdress, conduitKey
} from '@ix/base/composables/Contract/WalletAddresses'
import ERC1155ABI from '@ix/base/composables/Contract/Abis/ERC1155.json'
import ERC721ABI from '@ix/base/composables/Contract/Abis/ERC1155.json'
import Seaport from '@ix/base/composables/Contract/Abis/Seaport.json'


import { ContractContext as ERC1155Contract } from '@ix/base/composables/Contract/Abis/ERC1155'

import { ContractContext as ERC721Contract } from '@ix/base/composables/Contract/Abis/ERC721'


import { ContractContext as SeaportContract } from '@ix/base/composables/Contract/Abis/Seaport'


import { ZERO_ADDRESS } from './useTransferNFT'
import { CartItem } from "~/composables/useCart";
import { fetchIXAPI } from "~/composables/api/api";
import { CollectionData } from "~/composables/useCollection";


export const ERC1155Addresses = [assetsAddress.polygon?.toLowerCase(), avatarNFTAddress.polygon?.toLowerCase(), landmarkAddress.polygon?.toLowerCase()]

export const ERC721Addresses = [roverAddress.polygon?.toLowerCase(), badgeNFTAddress.polygon?.toLowerCase()]

export const enum NFTType {
  ERC1155 = 0,
  ERC721 = 1
}


export const get1155Contract = <T extends ContractInterface<T> & ERC1155Contract>(address: string) => {

  const spenderAddress = conduitAdress.polygon as string
  const { walletAdress } = useWallet()

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('erc1155-contract-' + address, {
    contractAddress: address,
    notifications: {
      failMessage: 'Error transferring NFT'
    },
    createContract(provider) {
      return new ethers.Contract(address, ERC1155ABI.abi, provider.getSigner()) as unknown as T
    }
  })

  const isApproved = () =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.isApprovedForAll(address, spenderAddress)
    })

  const setApproval = (approved: boolean = true) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.setApprovalForAll(spenderAddress, approved)
    })

  const approveNftCheck = async () => {
    try {
      if (await isApproved())
        return true

      return await setApproval(true)

    } catch (e) {
      return false
    }
  }

  const transfer1155Token = (to: string, tokenId: number, amount: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.safeTransferFrom(address, to, tokenId, amount, ZERO_ADDRESS)
    })

  return {
    ...contractSpec,
    isApproved,
    setApproval,
    approveNftCheck,
    transfer1155Token
  }
}

export const get721Contract = <T extends ContractInterface<T> & ERC721Contract>(address: string) => {

  const spenderAddress = conduitAdress.polygon as string
  const { walletAdress } = useWallet()

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('erc721-contract-' + address, {
    contractAddress: address,
    notifications: {
      failMessage: 'Error transferring NFT'
    },
    createContract(provider) {
      return new ethers.Contract(address, ERC721ABI.abi, provider.getSigner()) as unknown as T
    }
  })

  const isApproved = () =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.isApprovedForAll(address, spenderAddress)
    })

  const setApproval = (approved: boolean = true) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.setApprovalForAll(spenderAddress, approved)
    })

  const approveNftCheck = async () => {
    try {
      if (await isApproved())
        return true

      return await setApproval(true)

    } catch (e) {
      return false
    }
  }

  const transfer721Token = (to: string, tokenId: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.safeTransferFrom(address, to, tokenId, ZERO_ADDRESS)
    })

  return {
    ...contractSpec,
    isApproved,
    setApproval,
    approveNftCheck,
    transfer721Token
  }
}

export interface ConsiderationItem {
  recipient: string
}

export const useSeaportContract = <T extends ContractInterface<T> & SeaportContract>() => {
  const { walletAdress, getCollectionType } = useWallet()
  const { createBuyOrder, isAdvancedOrder, getOrderMessage } = useBuyHelpers()
  const { withContract, createTransaction, ...contractSpec } = defineContract<T>('Seaport-contract', {
    contractAddress: seaportAdress.polygon as string,
    createContract(provider) {
      return new ethers.Contract(seaportAdress.polygon as string, Seaport.abi, provider.getSigner()) as unknown as T
    }
  })

  const fulfillAvailableAdvancedOrders = (advancedOrders: AdvancedOrder[], criteriaResolvers: [], offerFulfillments: [], considerationFulfillments: [], fulfillerConduitKey: string, recipient: string, maximumFulfilled: number, cartItems?: CartItem[]) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.fulfillAvailableAdvancedOrders(advancedOrders, criteriaResolvers, offerFulfillments, considerationFulfillments, fulfillerConduitKey, recipient, maximumFulfilled)
    }, {
      onFail: async (error) => {
        if (!cartItems || cartItems?.length == 0)
          return

        cartItems.forEach(async item => {
          if (!item.sale)
            return
          const message = getOrderMessage(item.sale)
          const buyOrder = createBuyOrder(item.sale, item.value, false)

          if (!isAdvancedOrder(buyOrder) || !message)
            return

          try {
            await fulfillAdvancedOrderGasEstimate(buyOrder[0])
            item.failed = false
          }
          catch (e) {
            item.failed = true
            const { token, identifierOrCriteria } = message.body.offer[0]
            await fetchIXAPI('web3/sale/transfer/update/listing/job', 'POST', {
              size: getCollectionType(token),
              player_id: item.sale?.player_id,
              network: 'polygon',
              collection: token,
              token_id: identifierOrCriteria,
            })
          }
        })
      }
    })

  const fulfillAdvancedOrderGasEstimate = async (buyOrderComponents: AdvancedOrder) =>
    withContract((contract) => {
      const address = walletAdress.value

      if (!address)
        return undefined

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

      return contract.estimateGas.fulfillAdvancedOrder(buyOrderComponents, [], conduitKey.polygon, ZERO_ADDRESS, pixMerkleParam)
    })

  return {
    ...contractSpec,
    fulfillAvailableAdvancedOrders
  }
}
