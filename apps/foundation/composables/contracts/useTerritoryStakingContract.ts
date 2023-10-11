import { ethers } from 'ethers'
import { ContractContext as TerritoryStakingContract } from '../ABIs/PIXTerritoryStaking'
import TerritoryStakingABI from "../ABIs/PIXTerritoryStaking.json"
import { territoryStakingAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { UserStakingItem } from 'composables/useStakingData'
import { StakingId } from '.nuxt/gql/default'
import { useLandData } from '../../../mission-control/composables/useLandData'


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


  const stakeTerritory = (item: UserStakingItem) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId)
        return undefined

      return contract.stake(item.token.tokenId)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshUserStakingData(), refreshTokens()])
    })
  }

  const unstakeTerritory = (item: UserStakingItem) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId)
        return undefined

      return contract.unstake(item.token.tokenId)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshUserStakingData(), refreshTokens()])
    })
  }

  const claimAllTerritoryRewards = () => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.claimAll()
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshUserStakingData()])
    })
  }

  const claimSpecificTerritoryReward = (item: UserStakingItem) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId)
        return undefined

      return contract.claimBatch([item.token.tokenId])
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