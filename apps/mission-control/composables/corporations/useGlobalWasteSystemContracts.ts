import { BigNumber, ethers } from "ethers";
import { globalWasteSystemAddress } from "../NFTs/walletAddresses";
import { ContractContext as GlobalWasteSystemContract } from '../ABIs/WasteTrader'

import WasteTraderABI from '../ABIs/WasteTrader.json'
import { OrderData } from "~/composables/corporations/order/useCorporationOrders";

export const useGWSData = () =>
  useAsyncState('gws-data', async (): Promise<OrderData> => {
    const credentials = useGraphqlCredentials()

    const [
      { globalWasteSystemOrderInfo },
      { globalWasteSystemOrderCosts }
    ] = await Promise.all([
      GqlGlobalWasteSystemOrderInfo({ credentials }), GqlGlobalWasteSystemOrderCosts()
    ])

    return {
      orderData: globalWasteSystemOrderCosts,
      orders: globalWasteSystemOrderInfo
    }
  })


export const useGWSCraft = () => {
  const { data } = useGWSData()
  const { gwsCapacity: capacity } = useBaseLevelCapacityData()

  return defineOrderData(capacity, data, {
    useCapacityAsMax: true,
    getOrderMax(capacity, item) {
      const activeOrders = data.value.orders
      return capacity - activeOrders.map(item => item.orderAmount).reduce((a, b) => a + b, 0)
    },
    getOutputs: (_) => ({
      calculation: 'linear',
      weights: [{
        token: { tokenInfo: { type: 'astro-credit' } },
        value: 1
      }]
    }),
  })
}



export const useGlobalWasteSystemContracts = () => {
  const activeChain = useActiveChain()
  const { activeRecipe } = useCorporationOrders()
  const { onClaimedOrder } = useCorporationNotifications()
  const contractAddress = globalWasteSystemAddress[activeChain]

  return defineOrderContract<GlobalWasteSystemContract>({ type: 'gws', task: 'craft' }, {
    contractAddress,
    claimSuccessEvent: 'MintedMissionControl',

    speedup: {
      ixt: (contract, { numberOfSpeedups, orderId }) =>
        contract.IXTSpeedUpOrder(numberOfSpeedups, orderId),

      astro: (contract, { numberOfSpeedups, orderId }) =>
        contract.speedUpOrder(numberOfSpeedups, orderId)
    },

    notifications: {
      sender: 'buck',
    },

    place: (contract) => {
      const payment = activeRecipe.value.map(token => token.value)
      return contract.placeWasteOrder(payment[0])
    },

    claim: (contract, orderId: number) =>
      contract.claimOrder(orderId),

    createContract: (provider) =>
      new ethers.Contract(contractAddress, WasteTraderABI.abi, provider.getSigner()) as unknown as GlobalWasteSystemContract,

    claimAll: (contract) => {
      return contract.claimBatchOrder()
    },
    listeners: {
      "MintedMissionControl": (_, tokenId: BigNumber, amount: BigNumber) => {
        onClaimedOrder({ type: 'gws', task: 'craft' }, tokenId.toNumber(), amount.toNumber())
      }
    }
  })
}