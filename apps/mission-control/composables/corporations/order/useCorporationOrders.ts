import type { OrderFragment } from '#gql'
import type { Corporation, CorporationPaymentToken, CorporationPaymentTokenDetailType } from '~/composables/corporations/useCorporations'
import { TokenWeightedOutput } from '~/composables/corporations/useTokenWeights'
import { OrderDataFragment } from '#gql'
import { millisecondsToHours } from 'date-fns'
import { InfoBlock, InfoBlockItem } from '~/composables/useInfoBlocks'
import { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract'
import { SelectedPurchase } from '../useSpeedup'
import { NftFragment } from '#gql'
import { ProbabilityWeightFragment } from '#gql'
import { get } from '@vueuse/core'

export interface CorporationProbabilityItem {
  token: NftFragment,
  name?: string,
  chance: number
}

export interface OrderProbabilityWeight extends NftFragment {
  weight: number,
  match: NftFragment
}

interface OrderSpeedup {
  corporation: CorporationOrderId,
  order: OrderFragment
  payToken: NftFragment
}

export interface OrderData {
  orderData: OrderDataFragment,
  orders: OrderFragment[]
}

export interface OrderClaim {
  nft: NftFragment,
  corporation: Corporation
}

interface LooseAdjustable {
  min?: number
  max?: number
  multiplier?: number
}

export const getWeights = (data: Ref<OrderData>): ProbabilityWeightFragment[] => {
  const balanceOfStakedToken = useStakedCorporationGenesis('eternalab').value

  if (balanceOfStakedToken > 0)
    return data.value.orderData.boostedWeight

  return data.value.orderData.weight
}

interface OrderDataOptions {
  listItemDetailType?: CorporationPaymentTokenDetailType,
  useCapacityAsMax?: boolean,
  uniqueAdjustables?: boolean,
  getOutputs?: (item: NftFragment, adjustable: LooseAdjustable) => TokenWeightedOutput,
  getOrderMax?: (capacity: number, item: LooseAdjustable) => number
}

export type OrderDataState = ReturnType<typeof defineOrderData>



export const defineOrderData = (capacity: Ref<number>, data: Ref<OrderData>, options?: OrderDataOptions) => {
  const { balanceOfToken } = useUserData()

  const assignBalanceToToken = (token: NftFragment) => {
    const userBalance = balanceOfToken(token)
    return Object.assign(token, { balance: userBalance })
  }

  return computed(() => {
    if (!data.value)
      return null

    const { orders, orderData } = data.value
    const orderCount = orders?.length ?? 0
    const hasActiveOrders = orderCount > 0

    const generateOriginalRecipe = () => {
      const variableTokens = orderData.variableCosts?.map(({ token: inputToken, ...item }) => {
        const token = assignBalanceToToken(inputToken)

        const max = options.getOrderMax ?
          options.getOrderMax(capacity.value, item) :
          token.balance

        return {
          ...addAdjustableToToken(token, { ...item, max }),
          details: options.listItemDetailType,
          outputs: options.getOutputs?.(token, item),
          adjustable: true,
          unique: options.uniqueAdjustables
        };
      }) ?? [];

      const fixedTokens = orderData.fixedCosts?.map(({ token: inputToken, ...item }) => {
        const token = assignBalanceToToken(inputToken)

        return {
          ...addAdjustableToToken(token, { ...item }),
          adjustable: false,
          max: item?.min
        };
      }) ?? [];

      return [...fixedTokens, ...variableTokens];
    }

    const originalRecipe = generateOriginalRecipe()

    const taxAmount = (amount: number) => {
      const { tax } = orderData
      if (!tax)
        return 0

      return Math.ceil((amount * tax.value) / tax.basisPoints)
    }

    const taxedValue = (amount: number) =>
      amount - taxAmount(amount)

    const singleItem = originalRecipe.length == 1 && originalRecipe[0]
    const singleMaxOrder = singleItem?.max ?? Infinity
    const singleMultiplier = singleItem?.multiplier ?? 1
    const maxOrders = orderData.maxOrder ?? capacity.value / singleMultiplier


    return {
      orders,
      orderData,
      orderCount,
      hasActiveOrders,
      singleItem,
      singleMaxOrder,
      singleMultiplier,
      maxOrders,
      originalRecipe,
      taxAmount,
      taxedValue
    }
  })
}

export const useCorporationOrderInfoBlocks = () => {
  const { activeState, activeRecipe, activeRecipeValid, hasMinimumReqRecipeItems } = useCorporationOrders()

  const sellingAmount = computed(() => activeState.value.maxOrders = 1 ? 1 : activeRecipe.value[0].value)

  const timeLeft = computed(() => millisecondsToHours(activeState.value.orderData.defaultOrderTime * 1000) + 'H')


  return computed<InfoBlock>(() => ({
    blockType: 'description',
    title: 'SUMMARY',
    metaInfo: {
      blockType: 'table',
      items: [
        {
          name: 'RESOURCE REQUIREMENT',
          value: String(hasMinimumReqRecipeItems.value ? 'COMPLETE' : 'INSUFFICIENT'),
          valueState: hasMinimumReqRecipeItems.value ? 'success' : 'error'
        },
        {
          name: 'ORDER SLOTS',
          value: String(activeState.value.maxOrders)
        },
        {
          name: 'TOTAL ORDERS',
          value: String(sellingAmount.value / activeState.value.singleMultiplier)
        },
        {
          name: 'TIMEFRAME',
          value: timeLeft.value
        }
      ]
    }
  }))
}

export const orderValueForProbability = (probability: OrderProbabilityWeight, orders: CorporationPaymentToken[]) => {
  const { match } = probability
  const { isSameNFT } = useNFTs()
  return orders.find((item) => isSameNFT(match, item.token))
}

export const useCorporationOrders = () => {
  const taskManagerCorpo = useTaskManagerActiveCorporation()
  const completion = useCorporationCompletion()
  const { getAdjustableTokenOutputs } = useTokenWeights()
  const { refresh: refreshFacilityUpgrade } = useFacilityUpgradeData()
  const { refresh: refreshCooldown } = useFacilityCooldownTimeleftData()

  const { refresh: refreshNewlands } = useNewlandsData()
  const { refresh: refreshEternalab } = useEternalabData()
  const { refresh: refreshGWS } = useGWSData()
  const { refresh: refreshMetamodFusion } = useMetamodFusionData()


  const { orderData: facilityOrderData } = useFacilityUpgrade()
  const newlandsCraft = useNewlandsCraft()
  const gwsCraft = useGWSCraft()
  const eternalabCraft = useEternalabCraft()
  const metamodCraft = useMetamodFusion()

  const gameMenu = useGameMenu()

  const { balanceOfToken } = useUserData()


  const activeCorporationOrderId = useState<CorporationOrderId>('corporation-active-order-id', () => null)
  const activeRecipe = useState<CorporationPaymentToken[]>('corporation-active-recipe')
  const activeSpeedupOrder = useState<OrderSpeedup | null>(() => null)
  const latestClaim = useState<OrderClaim | null>('corporation-latest-claim', () => null)

  const selectOrderCorporation = (dataState: OrderDataState, corporationOrderId: CorporationOrderId, additionalRecipeItem?: CorporationPaymentToken[]) => {
    activeCorporationOrderId.value = corporationOrderId
    activeRecipe.value = [
      ...(additionalRecipeItem ?? []),
      ...dataState.value?.originalRecipe
    ].filter(Boolean)
    completion.resetComplete()
  }

  const refreshOrderData = async (corporation: CorporationOrderId) => {
    switch (corporation.type) {
      case 'new-lands':
        switch (corporation.task) {
          case 'craft':
            return await refreshNewlands()
          case 'upgrade':
            return await Promise.all([refreshCooldown(), refreshFacilityUpgrade()])
        }
      case 'eternalab':
        switch (corporation.task) {
          case 'craft':
            return await refreshEternalab()
          case 'fusion':
            return refreshMetamodFusion()
        }
      case 'gws':
        return await refreshGWS()
      default:
        return
    }
  }

  const getOrderState = (corporation: CorporationOrderId) => {
    switch (corporation.type) {
      case 'new-lands':
        switch (corporation.task) {
          case 'craft':
            return newlandsCraft.value
          case 'upgrade':
            return facilityOrderData.value
        }
      case 'eternalab':
        switch (corporation.task) {
          case 'craft':
            return eternalabCraft.value
          case 'fusion':
            return metamodCraft.value
        }
      case 'gws':
        return gwsCraft.value
      default:
        return null
    }
  }

  const activeState = computed(() => getOrderState(activeCorporationOrderId.value))

  const activeRecipeValid = computed(() =>
    activeRecipe.value.filter((item) => item.value < item.min || get(item.value) > get(item.max)).length == 0
  )

  const hasMinimumReqRecipeItems = computed(() =>
    activeRecipe.value.every(item =>
      item.min <= balanceOfToken(item.token)
    ))

  const infoOutputBlocks = computed<InfoBlockItem[]>(() => {
    const outputs = getAdjustableTokenOutputs(activeRecipe.value)
    const weights = outputs.map(({ weights }) => weights).flat().filter(({ token }) => !!token)

    return weights.map(({ token, percentage }) => ({
      name: token.tokenInfo?.title,
      value: `${percentage}%`,
      valueState: 'accent'
    }) as InfoBlockItem)
  })


  const ordersInCorporationId = (corporation: CorporationOrderId) =>
    getOrderState(corporation)?.orders ?? []

  const claimableOrders = (corporation: Corporation, currentTime: number) => {
    const orders = getAllOrdersInCorporationId(corporation)
    return orders?.filter((order) => orderIsFinished(order, currentTime)) ?? []
  }

  const orderIsFinished = (order: OrderFragment, currentTime: number) => {
    const start = order.creationTime * 1000
    return (currentTime - start) >= (orderFinishTime(order) - start)
  }

  const orderAmountTaxed = (amount: number, corporation: CorporationOrderId) => {
    const state = getOrderState(corporation)
    return state?.taxedValue(amount)
  }

  const orderTax = (amount: number, corporation: CorporationOrderId) => {
    const state = getOrderState(corporation)
    return state.taxAmount(amount) ?? amount
  }

  const getAllOrdersInCorporationId = (corporation: Corporation, discardAdditional = false) => {
    const additionalOrders = (() => {
      // if (corporation == 'eternalab')

      if (corporation == 'new-lands')
        return ordersInCorporationId({ type: corporation, task: 'upgrade' })
      if (corporation == 'eternalab')
        return ordersInCorporationId({ type: corporation, task: 'fusion' })

      return []
    })()

    const defaultOrders = ordersInCorporationId({ type: corporation, task: 'craft' })

    if (discardAdditional)
      return defaultOrders

    return defaultOrders.concat(additionalOrders)
  }

  const getLatestOrder = (list: OrderFragment[]) => {
    if (list.length == 0)
      return null

    const order = list.sort((a, b) =>
      Number(a.creationTime) > Number(b.creationTime) ? -1 : 1
    )
    return order[0]
  }

  const latestOrderInCorporation = (corporation: CorporationOrderId) =>
    getLatestOrder(ordersInCorporationId(corporation))

  const gotoLatestSpeedupOrder = async (corporation: CorporationOrderId) => {
    const order = latestOrderInCorporation(corporation)
    if (!order)
      return

    await navigateTo('/mission-control')
    activeSpeedupOrder.value = { order, corporation, payToken: { tokenInfo: { type: 'ixt' } } }

    nextTick(() => {
      gameMenu.value = 'task-manager'
      taskManagerCorpo.value = corporation.type
    })

    return true
  }

  const maxordersInCorporationId = (corporation: CorporationOrderId) => {
    const model = getOrderState(corporation)

    return model?.maxOrders ?? 0
  }

  const orderSpeedupCost = (corporation: CorporationOrderId, payment: NftFragment) => {
    const model = getOrderState(corporation)?.orderData

    if (payment.tokenInfo?.type == 'astro-credit')
      return model.astroSpeedupCost
    else
      return model.ixtSpeedupCost
  }

  const orderIdToListId = (order: OrderFragment) => `selloff-${order.orderId}`

  const orderFinishTime = (order: OrderFragment) =>
    (order.creationTime + order.totalOrderTime) * 1000

  return {
    claimableOrders,
    orderIsFinished,
    refreshOrderData,
    gotoLatestSpeedupOrder,
    orderFinishTime,
    orderSpeedupCost,
    orderIdToListId,
    ordersInCorporationId,
    getOrderState,
    maxordersInCorporationId,
    selectOrderCorporation,
    orderAmountTaxed,
    orderTax,
    getAllOrdersInCorporationId,
    infoOutputBlocks,
    activeState,
    activeRecipe,
    activeRecipeValid,
    latestClaim,
    activeSpeedupOrder,
    activeCorporationOrderId,
    hasMinimumReqRecipeItems,
    ...completion
  }
}

export const useOrderContracts = () => {
  const { setTransactionState } = useTransactions()

  const newlandsContract = useNewLandsContracts()
  const eternalabContract = useEternaLabsContracts()
  const gwsContract = useGlobalWasteSystemContracts()
  const facilityUpgradeContract = useFacilityUpgradeContracts()
  const metamodFusionContract = useMetamodFusionContracts()


  const getContract = (corporation: CorporationOrderId) => {
    switch (corporation.type) {
      case 'new-lands':
        switch (corporation.task) {
          case 'craft':
            return newlandsContract
          case 'upgrade':
            return facilityUpgradeContract
        }
      case 'eternalab':
        switch (corporation.task) {
          case 'craft':
            return eternalabContract
          case 'fusion':
            return metamodFusionContract
        }
      case 'gws':
        return gwsContract
      default:
        return null
    }
  }

  const placeOrder = (corporation: CorporationOrderId) => {
    setTransactionState('signing')

    return getContract(corporation)?.placeOrder() ?? false
  }

  const claimOrder = (corporation: CorporationOrderId, orderId: number) => {
    setTransactionState('signing')

    return getContract(corporation).claimOrder(orderId)
  }

  const claimBatchOrder = (corporation: CorporationOrderId) => {
    setTransactionState('signing')

    return getContract(corporation).claimBatchOrder()
  }
  const speedupOrder = (corporation: CorporationOrderId, orderId: number, selectedPurchase: SelectedPurchase) => {
    setTransactionState('signing')

    return getContract(corporation).speedupOrder({ orderId, numberOfSpeedups: selectedPurchase.amount, payType: selectedPurchase.token, price: selectedPurchase.price })
  }

  const speedupAllOrders = (corporation: CorporationOrderId, selectedPurchase: SelectedPurchase) => {
    setTransactionState('signing')

    return getContract(corporation).speedupAllOrders({ numberOfSpeedups: selectedPurchase.amount, payType: selectedPurchase.token, price: selectedPurchase.price })
  }

  return {
    placeOrder,
    claimOrder,
    speedupOrder,
    claimBatchOrder,
    speedupAllOrders
  }
}
