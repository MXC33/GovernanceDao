import { ethers } from 'ethers'
import { ContractContext as IXTStakingContract } from '../ABIs/IXTStaking'
import IXTStakingABI from "../ABIs/IXTStaking.json"
import { oneMonthIXTStakingAddress, threeMonthIXTStakingAddress, sixMonthIXTStakingAddress, twelveMonthIXTStakingAddress } from '@ix/base/composables/Contract/WalletAddresses'
import { ContractInterface } from '@ix/base/composables/Utils/defineContract'
import { UserStakingItem } from 'composables/useStakingData'
import { StakingId } from '.nuxt/gql/default'


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


  const stakeIXT = (item: UserStakingItem) => {
    createTransaction((contract) => {
      const address = walletAdress.value
      if (!address || !item.token.tokenId || !item.amount)
        return undefined

      return contract.stake(item.amount)
    }, {
      onSuccess: async () => await Promise.all([refreshStakingData(), refreshIXT()])
    })
  }


  return {
    stakeIXT,
  }
}

export const stakeIXT = (stakingId: StakingId, item: UserStakingItem) => {
  const stakingContract = useIXTStakingContract(stakingId)
  return stakingContract.stakeIXT(item)
}