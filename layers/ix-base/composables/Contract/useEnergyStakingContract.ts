import { ethers } from 'ethers'
import { ContractContext as EnergyStakingContract } from '~/composables/Contract/Abis/EnergyStaking'
import EnergyStakingABI from "~/composables/Contract/Abis/EnergyStaking.json"
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { UserStakingItem } from './useStakingData'
import { StakingId, StakingItemFragment } from '../../.nuxt/gql/default'


export const useEnergyStakingContract = <T extends ContractInterface<T> & EnergyStakingContract>() => {

  const contractAddress = energyStakingAddress.polygon as string
  const { walletAdress } = useWallet()
  const { refresh: refreshEnergyStakingData } = useStakingData(StakingId.Energy)
  const { refresh: refreshEnergyAmeliaStakingData } = useStakingData(StakingId.EnergyAmelia)

  const { refresh: refreshTokens } = useTokenData()
  const { refresh: refreshCurrencies } = useCurrencyData()

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('energy-staking-contract-', {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, EnergyStakingABI.abi, provider.getSigner()) as unknown as T
    }
  })


  const stakeEnergy = (item: UserStakingItem) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.stakeEnergy(item.amount, false)
    }, {
      onSuccess: async () => await Promise.all([refreshEnergyStakingData(), refreshTokens()])
    })

  const stakeAmeliaEnergy = (item: UserStakingItem) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.stakeEnergy(item.amount, true)
    }, {
      onSuccess: async () => await Promise.all([refreshEnergyAmeliaStakingData(), refreshTokens()])
    })

  const stakeIXT = (item: UserStakingItem) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.stakeIXT(item.amount)
    }, {
      onSuccess: async () => await Promise.all([refreshEnergyStakingData(), refreshEnergyAmeliaStakingData(), refreshCurrencies()])
    })
  }

  const unstakeIXT = (item: UserStakingItem) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.unstakeIXT(item.amount)
    }, {
      onSuccess: async () => await Promise.all([refreshEnergyStakingData(), refreshCurrencies()])
    })
  }

  const claimIXTReward = (item: StakingItemFragment) => {
    return createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId)
        return undefined

      return contract.claim(false)
    }, {
      onSuccess: async () => await Promise.all([refreshEnergyStakingData(), refreshCurrencies()])
    })
  }

  const claimIXTAmeliaReward = () => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.claim(true)
    }, {
      onSuccess: async () => await Promise.all([refreshEnergyAmeliaStakingData(), refreshCurrencies()])
    })
  }

  return {
    stakeEnergy,
    stakeAmeliaEnergy,
    stakeIXT,
    unstakeIXT,
    claimIXTReward,
    claimIXTAmeliaReward,
  }
}
