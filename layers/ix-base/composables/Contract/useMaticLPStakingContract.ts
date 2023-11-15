import { ethers } from 'ethers'
import { ContractContext as MaticLPStakingContract } from '~/composables/Contract/Abis/IXTMaticStaking'
import MaticLPABI from "~/composables/Contract/Abis/IXTMaticStaking.json"
import { MATICandIXTStakingAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { UserStakingItem } from './useStakingData'
import { StakingId, StakingItemFragment } from '../../.nuxt/gql/default'


export const useMaticLPStakingContract = <T extends ContractInterface<T> & MaticLPStakingContract>() => {

  const contractAddress = MATICandIXTStakingAddress.polygon as string
  const { walletAdress } = useWallet()
  const { refresh: refreshStakingData } = useStakingData(StakingId.LpMATIC)
  const { refresh: refreshTokens } = useTokenData()

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('matic-lp-staking-contract-', {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, MaticLPABI.abi, provider.getSigner()) as unknown as T
    }
  })


  const stakeMaticLPToken = (amount: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !amount)
        return undefined

      return contract.stake(amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData()])
    })


  const unstakeMaticLPToken = (amount: number) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !amount)
        return undefined

      return contract.withdraw(amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData()])
    })
  }

  const claimMaticLPIXT = () => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.getReward()
    }, {
      onSuccess: async () => await refreshStakingData()
    })
  }


  return {
    stakeMaticLPToken,
    unstakeMaticLPToken,
    claimMaticLPIXT,
  }
}