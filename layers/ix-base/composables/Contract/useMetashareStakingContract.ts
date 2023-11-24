import { ethers } from 'ethers'
import { ContractContext as MetashareStakingContract } from '~/composables/Contract/Abis/MetashareStaking'
import MetashareStakingABI from "~/composables/Contract/Abis/MetashareStaking.json"
import { metashareStakingAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { UserStakingItem } from './useStakingData'
import { NftFragment, StakingId, StakingItemFragment } from '../../.nuxt/gql/default'


export const useMetashareStakingContract = <T extends ContractInterface<T> & MetashareStakingContract>() => {

  const contractAddress = metashareStakingAddress.polygon as string
  const mcAssetAddress = assetsAddress.polygon as string
  const { walletAdress } = useWallet()
  const { refresh: refreshStakingData } = useStakingData(StakingId.Metashare)
  const { refresh: refreshTokens } = useTokenData()
  const { approveNftCheck } = get1155Contract(mcAssetAddress)

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('metashare-staking-contract-', {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, MetashareStakingABI.abi, provider.getSigner()) as unknown as T
    }
  })


  const stakeMetashare = (item: UserStakingItem) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.stake(item.token.tokenId, item.amount)
    }, {
      approve: async () => approveNftCheck(contractAddress),
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshTokens()])
    })
  }



  const unstakeMetashare = (item: UserStakingItem) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.unstake(item.token.tokenId, item.amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshTokens()])
    })
  }

  const claimMetashareReward = (item: StakingItemFragment) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId)
        return undefined

      return contract.claimBatch([item.token.tokenId])
    }, {
      onSuccess: async () => await refreshStakingData()
    })
  }

  const claimAllMetashareReward = () => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.claim()
    }, {
      onSuccess: async () => await refreshStakingData()
    })
  }

  return {
    stakeMetashare,
    unstakeMetashare,
    claimMetashareReward,
    claimAllMetashareReward
  }
}

export const filterMetashareType = (token: NftFragment) => {
  if (!token)
    return null
  return token?.tokenInfo?.type === 'metashare' && (token?.tokenInfo.tier == 'eternalab' || token?.tokenInfo?.tier == 'new-lands' || token?.tokenInfo?.tier == 'gws')
}