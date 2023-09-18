import { BigNumber, ethers } from "ethers";
import { newLandsAddress } from "../NFTs/walletAddresses";
import { ContractContext as NewlandsContract } from '../ABIs/FacilityStore'
import FacilityStoreABI from '../ABIs/FacilityStore.json'
import { OrderData } from '~/composables/corporations/order/useCorporationOrders'

export interface FacilityProbabilityWeights {
  outlier: number,
  common: number,
  uncommon: number,
  rare: number,
  legendary: number
}



export const useNewlandsCraft = () => {
  const { data } = useNewlandsData()
  const { nlCapacity: capacity } = useBaseLevelCapacityData()

  return defineOrderData(capacity, data, {
    listItemDetailType: 'outputs',
    uniqueAdjustables: true,
    getOutputs: (item) => ({
      calculation: 'diffMinValue',
      weight: {
        token: item,
        value: data.value?.orderData.weight.find((weight) =>
          weight.token?.tokenId == item.tokenId
        )?.value
      }
    }),
  })
}



export const useNewlandsData = () =>
  useAsyncState('newlands-data', async (): Promise<OrderData> => {
    const credentials = useGraphqlCredentials()

    const [{ newlandsOrderInfo }, { newlandsOrderCosts }] = await Promise.all([GqlNewLandsOrderInfo({ credentials }), GqlNewLandsOrderCosts()])

    return { orderData: newlandsOrderCosts, orders: newlandsOrderInfo }
  })

export const useNewLandsContracts = () => {
  const { onClaimedOrder } = useCorporationNotifications()
  const { activeRecipe } = useCorporationOrders()
  const activeChain = useActiveChain()

  const contractAddress = newLandsAddress[activeChain]

  return defineOrderContract<NewlandsContract>({ type: 'new-lands', task: 'craft' }, {
    contractAddress,

    notifications: {
      sender: 'jeremiah',
    },

    claimSuccessEvent: 'ReceiveFacility',

    speedup: {
      ixt: (contract, { numberOfSpeedups, orderId }) =>
        contract.IXTSpeedUpOrder(numberOfSpeedups, orderId),

      astro: (contract, { numberOfSpeedups, orderId }) =>
        contract.speedUpOrder(numberOfSpeedups, orderId)
    },

    createContract: (provider: ethers.providers.Web3Provider) => {
      return new ethers.Contract(contractAddress, FacilityStoreABI.abi, provider.getSigner()) as unknown as NewlandsContract
    },

    listeners: {
      "ReceiveFacility": (_, __, facilityTokenId: BigNumber) =>
        onClaimedOrder({ type: 'new-lands', task: 'craft' }, facilityTokenId.toNumber())
    },

    place: (contract) => {
      const additionalBiomods = activeRecipe.value
        .filter(item => item.token.tokenInfo.tier != null)
        .map(item => item.value - item.min)

      return contract.placeFacilityOrder(additionalBiomods)
    },

    claim: (contract, orderId: number) => {
      return contract.claimOrder(orderId)
    },
    claimAll: (contract) => {
      return contract.claimBatchOrder()
    }
  })
}