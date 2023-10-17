import { ethers } from 'ethers'
import { ContractContext as MetashareStakingContract } from '../ABIs/MetashareStaking'
import MetashareStakingABI from "../ABIs/MetashareStaking.json"
import { metashareStakingAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { UserStakingItem } from 'composables/useStakingData'
import { StakingId } from '../../.nuxt/gql/default'


export const useMetashareStakingContract = <T extends ContractInterface<T> & MetashareStakingContract>() => {

  const contractAddress = metashareStakingAddress.polygon as string
  const { walletAdress } = useWallet()
  const { refresh: refreshStakingData } = useStakingData(StakingId.Metashare)
  const { refresh: refreshTokens } = useTokenData()

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
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.stake(item.token.tokenId, item.amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshTokens()])
    })
  }

  const unstakeMetashare = (item: UserStakingItem) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.unstake(item.token.tokenId, item.amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshTokens()])
    })
  }

  const claimMetashareReward = (item: UserStakingItem) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId)
        return undefined

      return contract.claimBatch([item.token.tokenId])
    }, {
      onSuccess: async () => await refreshStakingData()
    })
  }

  return {
    stakeMetashare,
    unstakeMetashare,
    claimMetashareReward,
  }
}