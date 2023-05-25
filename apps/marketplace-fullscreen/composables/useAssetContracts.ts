import { BigNumberish, ethers, ContractTransaction } from 'ethers'
import { ContractInterface, defineContract } from "~/../../layers/ix-base/composables/Utils/defineContract"

import {
  roverAddress,
  assetsAddress,
  avatarNFTAddress,
  badgeNFTAddress,
  IXTAddress, conduitAdress
} from '../../../layers/ix-base/composables/Contract/WalletAddresses'
import ERC1155ABI from '../../../layers/ix-base/composables/Contract/Abis/ERC1155.json'
import ERC721ABI from '../../../layers/ix-base/composables/Contract/Abis/ERC1155.json'
import IXToken from '../../../layers/ix-base/composables/Contract/Abis/IXToken.json'


import { ContractContext as ERC1155Contract } from '../../../layers/ix-base/composables/Contract/Abis/ERC1155'

import { ContractContext as ERC721Contract } from '../../../layers/ix-base/composables/Contract/Abis/ERC721'

import { ContractContext as IXTokenContract } from '../../../layers/ix-base/composables/Contract/Abis/IXToken'


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

      return new Promise(async (resolve, reject) => {
        try {
          const allowance = await contract.allowance(address, spenderAddress)
          resolve(Number(ethers.utils.formatUnits(allowance)))
        } catch (e) {
          resolve(0)
        }
      })
    })

  const approve = (amount: BigNumberish | string) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.approve(spenderAddress, amount)
    })

  return {
    ...contractSpec,
    allowance,
    approve
  }
}
