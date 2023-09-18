import { BigNumber, ethers } from "ethers"
import { ContractContext as MetamodFusionContract } from '../ABIs/MetaModFusion'
import MetamodFusionABI from '../ABIs/MetaModFusion.json'
import { OrderData } from "./order/useCorporationOrders"



export const useMetamodFusionData = () =>
  useAsyncState('metamod-fusion-data', async (): Promise<OrderData> => {
    const credentials = useGraphqlCredentials()

    const [{ metamodFusionOrderInfo }, { metamodFusionOrderCosts }] = await Promise.all([GqlMetamodFusionOrderInfo({ credentials }), GqlMetamodFusionOrderCosts()])

    return { orderData: metamodFusionOrderCosts, orders: metamodFusionOrderInfo }
  })



export const useMetamodFusion = () => {
  const { data } = useMetamodFusionData()
  const capacity = null

  return defineOrderData(capacity, data, {
    useCapacityAsMax: false,
    getOrderMax(capacity, item) {
      return item.max
    },
    getOutputs: (_) => ({
      calculation: 'linear',
      weights: [{
        token: { tokenInfo: { type: 'm3ta-mod' } },
        value: 1
      }]
    }),
  })
}

export const useMetamodFusionContracts = () => {
  const activeChain = useActiveChain()
  const { onClaimedOrder } = useCorporationNotifications()
  const contractAddress = metaModFusionAddress[activeChain]

  return defineOrderContract<MetamodFusionContract>({ type: 'eternalab', task: 'fusion' }, {
    contractAddress,

    createContract: (provider) =>
      new ethers.Contract(contractAddress, MetamodFusionABI.abi, provider.getSigner()) as unknown as MetamodFusionContract,

    claimSuccessEvent: 'ClaimOrder',

    speedup: {
      ixt: (contract, { numberOfSpeedups, orderId }) =>
        contract.IXTSpeedUpOrder(numberOfSpeedups, orderId),

      astro: (contract, { numberOfSpeedups, orderId }) =>
        contract.speedUpOrder(numberOfSpeedups, orderId)
    },

    notifications: {
      sender: 'eve-pryde',
    },

    place: (contract) => {
      return contract.placeFusionOrder()
    },

    claim: (contract, orderId: number) =>
      contract.claimOrder(orderId),

    claimAll: (contract) => {
      return contract.claimBatchOrder()
    },
    listeners: {
      "ClaimOrder": (_, tokenId: BigNumber) => {
        onClaimedOrder({ type: 'eternalab', task: 'fusion' }, 0, 1)
      }
    }
  })
}