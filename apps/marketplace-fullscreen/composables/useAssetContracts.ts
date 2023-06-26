import { ethers } from 'ethers'
import { ContractInterface, defineContract, ZERO_ADRESS, ZERO_ADRESS_LONG } from "@ix/base/composables/Utils/defineContract"
import { AdvancedOrder } from "@ix/base/composables/Token/useIXToken"

import {
  roverAddress,
  assetsAddress,
  avatarNFTAddress,
  badgeNFTAddress,
  conduitAdress,
  seaportAdress,
  conduitKey
} from '@ix/base/composables/Contract/WalletAddresses'
import ERC1155ABI from '@ix/base/composables/Contract/Abis/ERC1155.json'
import ERC721ABI from '@ix/base/composables/Contract/Abis/ERC721.json'
import Seaport from '@ix/base/composables/Contract/Abis/Seaport.json'

import { ContractContext as ERC1155Contract } from '@ix/base/composables/Contract/Abis/ERC1155'

import { ContractContext as ERC721Contract } from '@ix/base/composables/Contract/Abis/ERC721'

import { ContractContext as SeaportContract } from '@ix/base/composables/Contract/Abis/Seaport'

import { CartItem } from "~/composables/useCart";


export const ERC1155Addresses = [assetsAddress.polygon?.toLowerCase(), avatarNFTAddress.polygon?.toLowerCase(), landmarkAddress.polygon?.toLowerCase(), gravityGradeAddress.polygon?.toLowerCase()]

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

      return contract.safeTransferFrom(address, to, tokenId, amount, ZERO_ADRESS)
    })

  const batchTransfer1155Token = (to: string, tokenId: number[], amount: number[]) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.safeBatchTransferFrom(address, to, tokenId, amount, ZERO_ADRESS)
    })

  return {
    ...contractSpec,
    isApproved,
    setApproval,
    approveNftCheck,
    transfer1155Token,
    batchTransfer1155Token
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

      return contract.safeTransferFrom(address, to, tokenId)
    })

  const batchTransfer721Token = (to: string, tokenId: number[]) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.safeBatchTransferFrom(address, to, tokenId)
    })

  return {
    ...contractSpec,
    isApproved,
    setApproval,
    approveNftCheck,
    transfer721Token,
    batchTransfer721Token
  }
}

export interface ConsiderationItem {
  recipient: string,
  endAmount?: number
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

  const fulfillAvailableAdvancedOrders = (advancedOrders: AdvancedOrder[], criteriaResolvers: [], offerFulfillments: any[], considerationFulfillments: any[], fulfillerConduitKey: string | null, recipient: string, maximumFulfilled: number, cartItems?: CartItem[]) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.fulfillAvailableAdvancedOrders(advancedOrders, criteriaResolvers, offerFulfillments, considerationFulfillments, fulfillerConduitKey ?? '', recipient, maximumFulfilled)
    }, {
      onFail: async (error) => {
        console.log("ON FAIL", error)
        clearFailedCartItems()

        if (!cartItems || cartItems?.length == 0)
          return

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
              collection: token,
              token_id: identifierOrCriteria,
            })
          }
        })

        return Promise.all(requests)
      }
    })

  const fulfillAdvancedOrderGasEstimate = async (buyOrderComponents: AdvancedOrder) =>
    withContract((contract) => {
      const address = walletAdress.value

      if (!address)
        return undefined

      return contract.estimateGas.fulfillAdvancedOrder(buyOrderComponents, [], conduitKey.polygon, ZERO_ADRESS, pixMerkleParam)
    })

  const fulfillAdvancedOrder = (advancedOrders: AdvancedOrder, criteriaResolvers: [], fulfillerConduitKey: string, recipient: string) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      // @ts-ignore
      return contract.fulfillAdvancedOrder(advancedOrders, criteriaResolvers, fulfillerConduitKey, recipient, pixMerkleParam)
    })

  return {
    ...contractSpec,
    fulfillAdvancedOrder,
    fulfillAvailableAdvancedOrders
  }
}
