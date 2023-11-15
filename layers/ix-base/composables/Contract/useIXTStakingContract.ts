import { ethers } from 'ethers'
import { ContractContext as IXTStakingContract } from '~/composables/Contract/Abis/IXTStaking'
import IXTStakingABI from "~/composables/Contract/Abis/IXTStaking.json"
import { oneMonthIXTStakingAddress, threeMonthIXTStakingAddress, sixMonthIXTStakingAddress, twelveMonthIXTStakingAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { StakingId } from '~/.nuxt/gql/default'


export const stakePeriodToStakingId = (period: number) => {
  switch (period) {
    case 1:
      return StakingId.IxtOneMonth
    case 3:
      return StakingId.IxtThreeMonths
    case 6:
      return StakingId.IxtSixMonths
    case 12:
      return StakingId.IxtTwelveMonths
    default:
      return StakingId.IxtOneMonth
  }
}

const getContractAddressFromStakingId = (stakingId: StakingId) => {
  switch (stakingId) {
    case 'ixtOneMonth':
      return oneMonthIXTStakingAddress.polygon as string
    case 'ixtThreeMonths':
      return threeMonthIXTStakingAddress.polygon as string
    case 'ixtSixMonths':
      return sixMonthIXTStakingAddress.polygon as string
    case 'ixtTwelveMonths':
      return twelveMonthIXTStakingAddress.polygon as string
    default: return twelveMonthIXTStakingAddress.polygon as string
  }
}

export const useIXTStakingContract = <T extends ContractInterface<T> & IXTStakingContract>(stakingId: StakingId) => {

  const { walletAdress } = useWallet()
  const { refresh: refreshStakingData } = useStakingData(stakingId)
  const { refresh: refreshIXT } = useCurrencyData()
  const { allowanceCheck } = useIXTContract()

  const contractAddress = getContractAddressFromStakingId(stakingId)

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('ixt-staking-contract-' + contractAddress, {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, IXTStakingABI.abi, provider.getSigner()) as unknown as T
    }
  })


  const stakeIXT = (amount: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !amount)
        return undefined
      const weiAmount = toWei(amount)
      return contract.stake(weiAmount)
    }, {
      approve: () => allowanceCheck(amount, contractAddress),
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshIXT()])
    })

  const unstakeIXT = (amount: number) =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !amount)
        return undefined
      const weiAmount = toWei(amount)
      return contract.withdraw(weiAmount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshIXT()])
    })

  const claimIXT = () =>
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.getReward()
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshIXT()])
    })



  return {
    stakeIXT,
    unstakeIXT,
    claimIXT
  }
}

export const stakeIXT = (stakingId: StakingId, amount: number) => {
  const stakingContract = useIXTStakingContract(stakingId)
  return stakingContract.stakeIXT(amount)
}

export const unstakeIXT = (stakingId: StakingId, amount: number) => {
  const stakingContract = useIXTStakingContract(stakingId)
  return stakingContract.unstakeIXT(amount)
}

export const getAPY = (rewardRate: number, totalSupply: number) => {
  const APR = (rewardRate * 86400 * 365) / totalSupply;
  return roundToDecimals(((1 + APR / 365) ** 365 - 1) * 100, 2)
}
