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
  IXTAddress, conduitAdress, seaportAdress
} from '@ix/base/composables/Contract/WalletAddresses'
import ERC1155ABI from '@ix/base/composables/Contract/Abis/ERC1155.json'
import ERC721ABI from '@ix/base/composables/Contract/Abis/ERC1155.json'
import IXToken from '@ix/base/composables/Contract/Abis/IXToken.json'
import Seaport from '@ix/base/composables/Contract/Abis/Seaport.json'


import { ContractContext as ERC1155Contract } from '@ix/base/composables/Contract/Abis/ERC1155'

import { ContractContext as ERC721Contract } from '@ix/base/composables/Contract/Abis/ERC721'

import { ContractContext as IXTokenContract } from '@ix/base/composables/Contract/Abis/IXToken'

import { ContractContext as SeaportContract } from '@ix/base/composables/Contract/Abis/Seaport'


import { ZERO_ADDRESS } from './useTransferNFT'


export const ERC1155Addresses = [assetsAddress.polygon?.toLowerCase(), avatarNFTAddress.polygon?.toLowerCase(), landmarkAddress.polygon?.toLowerCase()]

export const ERC721Addresses = [roverAddress.polygon?.toLowerCase(), badgeNFTAddress.polygon?.toLowerCase()]


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

export const getIXTokenContract = <T extends ContractInterface<T> & IXTokenContract>() => {

  const spenderAddress = conduitAdress.polygon as string
  const { walletAdress } = useWallet()

  const { withContract, createTransaction, ...contractSpec } = defineContract<T>('IXToken-contract', {
    contractAddress: IXTAddress.polygon as string,
    notifications: {
      failMessage: 'Error allowance IXToken'
    },
    createContract(provider) {
      return new ethers.Contract(IXTAddress.polygon as string, IXToken.abi, provider.getSigner()) as unknown as T
    }
  })

  const allowance = () =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      /*return new Promise(async (resolve, reject) => {
        try {
          const allowance = await contract.allowance(address, spenderAddress)
          resolve(Number(ethers.utils.formatUnits(allowance)))
        } catch (e) {
          resolve(0)
        }
      })*/
      return contract.allowance(address, spenderAddress)
    })

  const approve = (amount: BigNumberish | string) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.approve(spenderAddress, amount)
    })

  const ixtBalanceOfUser = () =>
    withContract(async (contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      const balance = await contract.balanceOf(address)
      return Number(ethers.utils.formatUnits(balance))
    })

  const allowanceCheck = async (amount: number) => {
    try {
      const allowanceValue = Number(ethers.utils.formatUnits(await allowance()))

      if (allowanceValue >= amount)
        return true

      return await approve(ethers.utils.parseUnits(amount.toString()))

    } catch (e) {
      return false
    }
  }



  return {
    ...contractSpec,
    allowance,
    approve,
    allowanceCheck,
    ixtBalanceOfUser
  }
}

export interface ConsiderationItem {

}

export const getSeaportContract = <T extends ContractInterface<T> & SeaportContract>() => {

  const spenderAddress = conduitAdress.polygon as string
  const { walletAdress } = useWallet()

  const { withContract, createTransaction, ...contractSpec } = defineContract<T>('Seaport-contract', {
    contractAddress: seaportAdress.polygon as string,
    notifications: {
      failMessage: 'Error Seaport'
    },
    createContract(provider) {
      return new ethers.Contract(seaportAdress.polygon as string, Seaport.abi, provider.getSigner()) as unknown as T
    }
  })


  const fulfillAvailableAdvancedOrders = (advancedOrders: AdvancedOrder[], criteriaResolvers: [], offerFulfillments: [], considerationFulfillments: [], fulfillerConduitKey: string, recipient: string, maximumFulfilled: number) =>
    createTransaction((contract) => {
      console.log('advancedOrders', advancedOrders)
      console.log('criteriaResolvers', criteriaResolvers)
      console.log('offerFulfillments', offerFulfillments)
      console.log('considerationFulfillments', considerationFulfillments)
      console.log('fulfillerConduitKey', fulfillerConduitKey)
      console.log('recipient', recipient)
      console.log('maximumFulfilled', maximumFulfilled)
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.fulfillAvailableAdvancedOrders(advancedOrders, criteriaResolvers, offerFulfillments, considerationFulfillments, fulfillerConduitKey, recipient, maximumFulfilled)
    }, { failMessage: "Checkout failed" })



  return {
    ...contractSpec,
    fulfillAvailableAdvancedOrders
  }
}
