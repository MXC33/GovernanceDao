import { BigNumberish, ethers, ContractTransaction } from 'ethers'
import { ContractInterface, defineContract } from "~/../../layers/ix-base/composables/Utils/defineContract"

import { roverAddress, assetsAddress, avatarNFTAddress, badgeNFTAddress } from '../../../layers/ix-base/composables/Contract/WalletAddresses'
import AvatarNFTABI from '../../../layers/ix-base/composables/Contract/Abis/AvatarNFT.json'
import BadgeNFTABI from '../../../layers/ix-base/composables/Contract/Abis/AvatarNFT.json'
import PIXAssetABI from '../../../layers/ix-base/composables/Contract/Abis/AvatarNFT.json'
import RoverNFTABI from '../../../layers/ix-base/composables/Contract/Abis/AvatarNFT.json'
import { ZERO_ADDRESS } from './useTransferNFT'

interface AssetContract {
  safeTransferFrom: (
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: string,
  ) => Promise<ContractTransaction>;
}

export const getAssetContract = <T extends ContractInterface<T> & AssetContract>(adress: string) => {
  const abi = contractAddressToABI(adress)

  if (!abi) {
    console.error("No ABI found")
    return null
  }

  const { walletAdress } = useWallet()

  const { createTransaction, ...contractSpec } = defineContract<T>('assetn-contract-' + adress, {
    contractAddress: adress,
    notifications: {
      failMessage: 'Error transferring NFT'
    },
    createContract(provider) {
      return new ethers.Contract(adress, abi, provider.getSigner()) as unknown as T
    }
  })

  const transferNFT = (to: string, tokenId: number, amount: number) => {
    console.log("BEFORE CREATE TRANSACT")
    return createTransaction((contract) => {
      console.log("wallet")

      const adress = walletAdress.value

      console.log("transferNFT")
      if (!adress)
        return undefined

      return contract.safeTransferFrom(adress, to, tokenId, amount, ZERO_ADDRESS)
    })
  }

  return {
    ...contractSpec,
    transferNFT
  }
}




export const contractAddressToABI = (contractAddress: string) => {
  switch (contractAddress.toLowerCase()) {
    case roverAddress.polygon:
      return RoverNFTABI.abi
    case avatarNFTAddress.polygon:
      return AvatarNFTABI.abi
    case badgeNFTAddress.polygon:
      return BadgeNFTABI.abi
    case assetsAddress.polygon?.toLowerCase():
      return PIXAssetABI.abi
  }
}