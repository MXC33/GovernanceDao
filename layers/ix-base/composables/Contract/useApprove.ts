import { ethers } from 'ethers'
import { ContractInterface, defineContract, ZERO_ADRESS } from "@ix/base/composables/Utils/defineContract"

import {
  roverAddress,
  assetsAddress,
  avatarNFTAddress,
  badgeNFTAddress,
} from '@ix/base/composables/Contract/WalletAddresses'
import ERC1155ABI from '@ix/base/composables/Contract/Abis/ERC1155.json'
import ERC721ABI from '@ix/base/composables/Contract/Abis/ERC721.json'

import { ContractContext as ERC1155Contract } from '@ix/base/composables/Contract/Abis/ERC1155'

import { ContractContext as ERC721Contract } from '@ix/base/composables/Contract/Abis/ERC721'


export const ERC1155Addresses = [assetsAddress.polygon?.toLowerCase(), avatarNFTAddress.polygon?.toLowerCase(), landmarkAddress.polygon?.toLowerCase(), gravityGradeAddress.polygon?.toLowerCase()]

export const ERC721Addresses = [roverAddress.polygon?.toLowerCase(), badgeNFTAddress.polygon?.toLowerCase()]

export const enum NFTType {
  ERC1155 = 0,
  ERC721 = 1
}


export const get1155Contract = <T extends ContractInterface<T> & ERC1155Contract>(address: string) => {

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

  const isApproved = (spenderAddress: string) =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.isApprovedForAll(address, spenderAddress)
    })

  const setApproval = (approved: boolean = true, spenderAddress: string) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.setApprovalForAll(spenderAddress, approved)
    })

  const approveNftCheck = async (spenderAddress: string) => {
    try {
      if (await isApproved(spenderAddress))
        return true

      return await setApproval(true, spenderAddress)

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

  const isApproved = (spenderAddress: string) =>
    withContract((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.isApprovedForAll(address, spenderAddress)
    })

  const setApproval = (approved: boolean = true, spenderAddress: string) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.setApprovalForAll(spenderAddress, approved)
    })

  const approveNftCheck = async (spenderAddress: string) => {
    try {
      if (await isApproved(spenderAddress))
        return true

      return await setApproval(true, spenderAddress)

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