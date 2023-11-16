import { ethers } from 'ethers'
import { ContractContext as UsdtLPStakingContract } from '~/composables/Contract/Abis/IXTUsdtStaking'
import UsdtLPABI from "~/composables/Contract/Abis/IXTUsdtStaking.json"
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { UserStakingItem } from './useStakingData'
import { StakingId, StakingItemFragment } from '../../.nuxt/gql/default'


export const useUsdtLPStakingContract = <T extends ContractInterface<T> & UsdtLPStakingContract>() => {

  const contractAddress = USDTandIXTStakingAddress.polygon as string
  const { walletAdress } = useWallet()
  const { refresh: refreshStakingData } = useStakingData(StakingId.LpUSDT)
  const { refresh: refreshTokens } = useTokenData()

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('usdt-lp-staking-contract-', {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, UsdtLPABI.abi, provider.getSigner()) as unknown as T
    }
  })


  const stakeUsdtLPToken = (amount: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !amount)
        return undefined

      return contract.stake(amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData()])
    })


  const unstakeUsdtLPToken = (amount: number) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !amount)
        return undefined

      return contract.withdraw(amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData()])
    })
  }

  const claimUsdtLPIXT = () => {
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
    stakeUsdtLPToken,
    unstakeUsdtLPToken,
    claimUsdtLPIXT,
  }
}