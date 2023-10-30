import { ethers } from 'ethers'
import { ContractContext as LandmarkStakingContract } from '~/composables/Contract/Abis/PIXLandStaking'
import LandmarkStakingABI from "~/composables/Contract/Abis/PIXLandStaking.json"
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { UserStakingItem } from './useStakingData'
import { NftFragment, StakingId } from '../../.nuxt/gql/default'


export const useLandmarkStakingContract = <T extends ContractInterface<T> & LandmarkStakingContract>() => {

  const contractAddress = landmarkStakedAddress.polygon as string
  const { walletAdress } = useWallet()
  const { refresh: refreshStakingData } = useStakingData(StakingId.Landmark)
  const { refresh: refreshTokens } = useTokenData()

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('landmark-staking-contract-', {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, LandmarkStakingABI.abi, provider.getSigner()) as unknown as T
    }
  })


  const stakeLandmark = (item: UserStakingItem) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.stake(item.token.tokenId, item.amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshTokens()])
    })


  const unstakeLandmark = (item: UserStakingItem) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.unstake(item.token.tokenId, item.amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshTokens()])
    })
  }

  const claimLandmarkRewardsById = (item: NftFragment) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.tokenId)
        return undefined

      return contract.claimBatch([item.tokenId])
    }, {
      onSuccess: async () => await refreshStakingData()
    })
  }

  const claimAllLandmarkRewards = () => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.claim()
    }, {
      onSuccess: async () => await refreshStakingData()
    })
  }

  return {
    stakeLandmark,
    unstakeLandmark,
    claimLandmarkRewardsById,
    claimAllLandmarkRewards
  }
}
