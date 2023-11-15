import { ethers } from 'ethers'
import { ContractContext as CatRaffStakingContract } from '~/composables/Contract/Abis/CatRaffStaking'
import CatRaffStakingABI from "~/composables/Contract/Abis/CatRaffStaking.json"
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { StakingId, WeeklyTicketDataFragment } from '~/.nuxt/gql/default'


export const useCatRaffStakingContract = <T extends ContractInterface<T> & CatRaffStakingContract>() => {

  const contractAddress = catRaffStakingAddress.polygon as string
  const { walletAdress } = useWallet()
  const { refresh: refreshStakingData } = useStakingData(StakingId.CatRaff)
  const { allowanceCheck } = useIXTContract()

  const { refresh: refreshCurrency } = useCurrencyData()

  const { createTransaction, withContract, ...contractSpec } = defineContract<T>('cat-raff-staking-contract-', {
    contractAddress,
    notifications: {
      failMessage: 'Error staking'
    },
    createContract(provider) {
      return new ethers.Contract(contractAddress, CatRaffStakingABI.abi, provider.getSigner()) as unknown as T
    }
  })


  const addTickets = (ixt: number) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.addTickets(ixt)
    }, {
      approve: async () => allowanceCheck(ixt, contractAddress),
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshCurrency()])
    })
  }

  const addOldTickets = (week: WeeklyTicketDataFragment) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !week.week || !week.amount)
        return undefined

      return contract.addOldTickets(week.week, week.amount, true)
    }, {
      approve: async () => allowanceCheck(week.amount ?? 2500, contractAddress),
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshCurrency()])
    })
  }

  const withdrawIXT = (week: WeeklyTicketDataFragment) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !week.week || !week.amount)
        return undefined

      return contract.withdrawOldTickets(week.week, week.amount, true)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshCurrency()])
    })
  }

  const claimPrize = () => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address)
        return undefined

      return contract.claimPrize()
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshCurrency()])
    })
  }

  return {
    ...contractSpec,
    addTickets,
    addOldTickets,
    withdrawIXT,
    claimPrize
  }
}