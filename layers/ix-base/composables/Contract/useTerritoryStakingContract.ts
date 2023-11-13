import { ethers } from 'ethers'
import { ContractContext as TerritoryStakingContract } from '~/composables/Contract/Abis/PIXTerritoryStaking'
import TerritoryStakingABI from "~/composables/Contract/Abis/PIXTerritoryStaking.json"
import { territoryStakingAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { NftFragment, StakingId, StakingItemFragment } from '~/.nuxt/gql/default'
import { useLandData } from '../../../../apps/mission-control/composables/useLandData'


export const useTerritoryStakingContract = <T extends ContractInterface<T> & TerritoryStakingContract>() => {

  const contractAddress = territoryStakingAddress.polygon as string
  const { walletAdress } = useWallet()
  const { refresh: refreshStakingData } = useStakingData(StakingId.Territories)
  const { refresh: refreshUserStakingData } = useStakingData(StakingId.TerritoriesUser)

  const { refresh: refreshTokens } = useLandData()

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('territory-staking-contract-', {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, TerritoryStakingABI.abi, provider.getSigner()) as unknown as T
    }
  })


  const stakeTerritory = (token: NftFragment) => {
    return createTransaction((contract) => {
      console.log("token",)
      const address = walletAdress.value
      if (!address || !token.tokenId)
        return undefined

      return contract.stake(token.tokenId)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshUserStakingData(), refreshTokens()])
    })
  }

  const unstakeTerritory = (token: NftFragment) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !token.tokenId)
        return undefined

      return contract.unstake(token.tokenId)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshUserStakingData(), refreshTokens()])
    })
  }

  const claimAllTerritoryRewards = () => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.claimAll()
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshUserStakingData()])
    })
  }

  const claimSpecificTerritoryReward = (item: NftFragment) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.tokenId)
        return undefined

      return contract.claimBatch([item.tokenId])
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshUserStakingData()])
    })
  }

  return {
    ...contractSpec,
    stakeTerritory,
    unstakeTerritory,
    claimAllTerritoryRewards,
    claimSpecificTerritoryReward
  }
}