import { ethers } from "ethers";
import { ContractInterface, CreateContractOptions } from "@ix/base/composables/Utils/defineContract";
import { StakingId } from ".nuxt/gql/default";



/// Not sure if we can do this. The staking contracts vary too much in contract calls. Might be easier to just define them individually.

interface StakingContractOptions<T> extends CreateContractOptions<T> {
  claimSuccessEvent: string,
  stakeSuccessEvent: string,
  withdrawSuccessEvent: string,
  claim: (contract: T, amount?: number, tokenId?: number) => Promise<ethers.ContractTransaction>
  stake: (contract: T, amount?: number, tokenId?: number) => Promise<ethers.ContractTransaction>
  withdraw: (contract: T, amount?: number, tokenId?: number) => Promise<ethers.ContractTransaction>
}

export const useCorporationOrderId = () => {
  const getOrderKey = (id: StakingId) =>
    `${id}`

  return {
    getOrderKey
  }
}

export const defineOrderContract = <T extends ContractInterface<T>>(stakingId: StakingId, options: StakingContractOptions<T>) => {
  const { getOrderKey } = useCorporationOrderId()
  const corporationOrderKey = getOrderKey(stakingId)
  const definedContract = defineContract(corporationOrderKey, options)
  const { contractAddress, contract, createTransaction } = definedContract
  const { refresh: refreshStakingData } = useStakingData(stakingId)
  const { refresh: refreshCurrencies } = useCurrencyData()
  const { refresh: refreshTokens } = useTokenData()


  const claim = async (orderId: number) =>
    createTransaction(() => {
      if (contract.value !== null) {
        return options.claim(contract.value, orderId);
      }
      return
    }, {
      successOnEventKey: options.claimSuccessEvent,
      onSuccess: async () => {
        return refreshStakingData()
      },
    })

  const stake = async () =>
    createTransaction(() => {
      if (!contract.value)
        return
      return options.stake(contract.value, 1, 1);
    }, {
      successOnEventKey: options.stakeSuccessEvent,
      onSuccess: async () => {
        return refreshStakingData()
      },
    })

  const withdraw = async (orderId: number) =>

    createTransaction(() => {
      if (!contract.value)
        return
      return options.claim(contract.value, orderId)
    }, {
      successOnEventKey: options.withdrawSuccessEvent,
      onSuccess: async () => {
        return refreshStakingData()
      },
    })


  return {
    ...definedContract,
    stake,
    claim,
    withdraw
  }
}
