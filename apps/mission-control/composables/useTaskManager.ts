import { OrderFragment } from "#gql"
import { Corporation } from "./corporations/useCorporations"
import { ResourceTask } from "./useTasks"

export const useTaskManagerActiveCorporation = () =>
  useState<Corporation>('task-manager-corpo', () => null)


export const useYSpaceTaskManager = () => {
  const tabs = ["drones", "rovers"] as const
  const activeTab = useState<typeof tabs[number]>('task-manager-yspace-tab', () => tabs[0])

  return {
    tabs,
    activeTab,
  }
}

export const useTaskManager = () => {
  const { claimableOrders, getAllOrdersInCorporationId, orderFinishTime } = useCorporationOrders()

  const { execute: fetchEternalabBurnedData, data: eternalabAvatarBurned } = useAvatarBurnedData('eternalab')
  const { execute: fetchNewLandBurnedData, data: newlandsAvatarBurned } = useAvatarBurnedData('new-lands')
  const { execute: fetchGWSBurnedData, data: gwsAvatarBurned } = useAvatarBurnedData('gws')
  const { execute: fetchYSpaceBurnedData, data: ySpaceAvatarBurned } = useAvatarBurnedData('y-space')

  const { resourceTasks } = useTiles()
  const selectedCorporation = useTaskManagerActiveCorporation()

  const tabs = useState<string[]>('task-manager-tab-active', () => null)
  const activeTab = useState<string>('task-manager-tab-selected', () => null)

  const getProductionTasks = (corporation: Corporation) => {
    if (!resourceTasks.value)
      return []

    return resourceTasks.value.filter((task) => {
      if (task.resourceType == 'energy')
        return corporation == 'new-lands'

      return corporation == 'y-space'
    })
  }

  const completedTasksAndOrders = (corporation: Corporation, currentTime: number) => {
    const tasks = (() => {
      if (corporation == 'y-space') {
        return completedTaskAmount('y-space', 'drone') + completedTaskAmount('y-space', 'rover')
      }
      if (corporation == 'new-lands')
        return completedTaskAmount('new-lands', 'facility')
      return 0
    })()
    return tasks + claimableOrders(corporation, currentTime)?.length
  }

  const getProgress = (order: OrderFragment, currentTime: number) => {

    const { creationTime, defaultOrderTime, totalOrderTime } = order
    const defaultDuration = defaultOrderTime * 1000
    const adjustedOrderTime = totalOrderTime * 1000
    const timeDiff = defaultDuration - adjustedOrderTime
    const currentPosition = currentTime - (creationTime * 1000)

    const progress = (currentPosition + timeDiff) / (defaultDuration)
    return Math.min(100, progress * 100)
  }

  const getNotCompletedOrders = (corporation: Corporation, currentTime: number) => {
    const orders = getAllOrdersInCorporationId(corporation, true)
    return orders.filter(order => getProgress(order, currentTime) < 100)
  }

  const getOrderFurthestAwayFromFinish = (orders: OrderFragment[]) => {
    return orders.sort((a, b) => orderFinishTime(b) - orderFinishTime(a))[0]
  }

  const getRemainingTimeOfOrder = (order: OrderFragment) => {
    const totalOrderTime = order?.defaultOrderTime
    const creationTime = order?.creationTime

    const currentTime = Date.now() / 1000
    const elapsedTime = currentTime - creationTime
    return totalOrderTime - elapsedTime
  }

  const getSpeedupAllInfo = (corporation: Corporation, currentTime: number) => {
    const craft = useEternalabCraft()
    const notCompletedOrders = getNotCompletedOrders(corporation, currentTime)
    const amountOfOrders = notCompletedOrders.length

    if (amountOfOrders == 0)
      return null
    const orderFurthestAwayFromFinish = getOrderFurthestAwayFromFinish(notCompletedOrders)

    const speedupTime = orderFurthestAwayFromFinish?.speedUpTime ?? 3600
    const ixtCost = craft.value.orderData.ixtSpeedupCost
    const astroCreditCost = craft.value.orderData.astroSpeedupCost

    const remainingTime = getRemainingTimeOfOrder(orderFurthestAwayFromFinish)

    let numberOfSpeedups = Math.ceil(remainingTime / speedupTime)

    if (numberOfSpeedups < 0) {
      numberOfSpeedups = 0
    }

    return {
      numberOfSpeedups,
      ixtCost: (numberOfSpeedups * ixtCost * amountOfOrders).toFixed(1),
      astroCreditCost: numberOfSpeedups * astroCreditCost * amountOfOrders
    }
  }


  const totalTasksAndOrders = (corporation: Corporation) => {

    const tasks = (() => {
      if (corporation == 'y-space')
        return getProductionTasks(corporation).length
      if (corporation == 'new-lands')
        return getProductionTasks(corporation).length
      return 0
    })()

    return tasks + getAllOrdersInCorporationId(corporation).length
  }

  const getTotalEnergyCollected = () =>
    getProductionTasks('new-lands').map(item => item.resourceAmount).reduce((a, b) => a + b, 0)

  const getTotalWasteCollected = (type: 'drone' | 'facility' | 'rover') =>
    getProductionTasks('y-space')
      .filter(item => item.tokenInfo?.type == type)
      .map(item => item.resourceAmount).reduce((a, b) => a + b, 0)

  const completedTaskAmount = (corporation: Corporation, type: 'drone' | 'facility' | 'rover') =>
    getProductionTasks(corporation)
      .filter(item => item.tokenInfo?.type == type)
      .filter(item => item.progress === 1)?.length ?? 0

  // const getMaxCap = () =>
  //   getProductionTasks('y-space').map(item => item.resourceAmount)

  const setActiveTab = (to: string) => {
    activeTab.value = to
  }

  const setTabs = (newTabs: string[] | null) => {
    if (newTabs == null) {
      activeTab.value = null
      tabs.value = null
    }

    tabs.value = newTabs
    activeTab.value = newTabs[0]
  }

  const fetchBurnedAvatar = () => {
    switch (selectedCorporation.value) {
      case 'eternalab':
        return fetchEternalabBurnedData()
      case 'new-lands':
        return fetchNewLandBurnedData()
      case 'gws':
        return fetchGWSBurnedData()
      case 'y-space':
        return fetchYSpaceBurnedData()
    }
  }

  const hasBurnedAvatar = (corporation: Corporation) => {
    switch (corporation) {
      case 'eternalab': return eternalabAvatarBurned.value
      case 'new-lands': return newlandsAvatarBurned.value
      case 'gws': return gwsAvatarBurned.value
      case 'y-space': return ySpaceAvatarBurned.value
    }
  }



  const canClaimAllOrders = computed(() => {
    const corpo = selectedCorporation.value
    const hasOrders = getAllOrdersInCorporationId(corpo, true)?.length > 0

    return hasBurnedAvatar(corpo) && hasOrders
  })

  const canClaimAllProduction = (type: 'facility' | 'drone' | 'rover' | string) => {
    const corporation: Corporation = type == 'facility' ? 'new-lands' : 'y-space'

    const hasBurned = hasBurnedAvatar(corporation)
    const activeTasks = getProductionTasks(corporation)
      .filter((task) =>
        task.tokenInfo?.type == type &&
        canClaimResourceTask(task)
      )

    return hasBurned && activeTasks.length > 0
  }

  const canClaimResourceTask = (task: ResourceTask) => {
    if (task.tokenInfo.type == 'rover')
      return task.progress == 1
    else
      return task.resourceAmount > 0
  }

  return {
    completedTasksAndOrders,
    totalTasksAndOrders,
    getProductionTasks,
    getTotalEnergyCollected,
    getTotalWasteCollected,
    completedTaskAmount,
    getNotCompletedOrders,
    setTabs,
    setActiveTab,
    hasBurnedAvatar,
    fetchBurnedAvatar,
    getSpeedupAllInfo,
    canClaimAllProduction,
    canClaimResourceTask,
    getProgress,
    canClaimAllOrders,
    activeTab,
    tabs,
    selectedCorporation
  }
}