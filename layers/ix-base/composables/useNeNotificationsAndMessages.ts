// Interfaces for Notifications

/**
 * Represents a notification request response.
 */
export interface NotificationRequest {
  success: boolean
  status: number
  message: string
  data: NotificationData
}
/**
 * Contains categorized notification data and counts.
 */
export interface NotificationData {
  today: Notification[]
  yesterday: Notification[]
  old: Notification[]
  count: number
  unread: number
}

/**
 * Details of an individual notification.
 */
export interface Notification {
  id: number
  notification_id: number
  system: number
  is_read: number
  created_at: string
  player_id: number
  notification: NotificationBids
}

/**
 * Message details within a notification.
 */
export interface NotificationMessage {
  id: string
  title: string
  message: string
  type: number
  created_at: string
  categories: any
}

export interface NotificationBids extends NotificationMessage {
  title: string
  message: string
  type: number
  pix_id: string
  territory_id: any
  country_code: string
  categories: string
  price: number
  created_at: string
  updated_at: string
  territory_type: number
  categories_array: number[]
}

// Functions to fetch Notifications and Messages

/**
 * Fetches notifications.
 */

const useNotificationHandler = (type: 'notification' | 'messages') => {
  const { fetchIXAPI } = useIXAPI()
  const { emitStatusUpdate } = useSocket()
  const { showUnreadNotifications } = useNotificationSettings()

  const notificationCount = ref(1)

  const addSocketItem = (item: Notification) => {
    asyncData.data.value?.today.unshift(item)
  }

  const readItem = (item: Notification) => {
    const notificationData = asyncData.data.value
    setItemAsRead(item, notificationData.today)
    setItemAsRead(item, notificationData.yesterday)
    setItemAsRead(item, notificationData.old)

  }

  const setItemAsRead = (item: Notification, items: Notification[] | undefined) => {
    if (!items || !item)
      return

    const index = items.findIndex((lookupItem) => item.id == lookupItem.id)
    if (index != -1) {
      items[index].is_read = 1
      emitStatusUpdate(item)
    }

  }


  const loadMore = () => {
    notificationCount.value++
    return asyncData.fetchAndMerge()
  }

  const markAllAsRead = async () => {
    await fetchIXAPI('notifications/markAllAsRead', "PUT")
  }

  const asyncData = useAsyncDataState('notification-data-' + type, async () => {
    const uri = "notifications/" + type + "/" + notificationCount.value + "?unread=" + showUnreadNotifications.value
    return (await fetchIXAPI(uri)) as NotificationRequest
  }, {
    transform: (response) => response?.data,
    mergePages: (oldData, newData) => {
      return {
        ...newData,
        today: oldData.today.concat(newData.today),
        yesterday: oldData.yesterday.concat(newData.yesterday),
        old: oldData.old.concat(newData.old)
      }
    }
  })

  return {
    ...asyncData,
    markAllAsRead,
    loadMore,
    addSocketItem,
    readItem
  }
}


export const useNeNotifications = () => {
  return useNotificationHandler('notification')
}

export const useNeMessages = () => {
  return useNotificationHandler('messages')
}

export const useNotificationSettings = () => {
  const showUnreadNotifications = useState('neNotificationUnread', () => true)

  return {
    showUnreadNotifications
  }
}

export const useNotificationAllowance = () => {
  const showNotificationLoader = ref<string[]>([])

  const { readItem: readNotificationItem } = useNeNotifications()
  const { allowanceCheckWithError } = useIXTContract()

  const allowance = async (message) => {
    showNotificationLoader.value['nt'+message.notification.id] = true

    const { execute: allowanceCheckRequest } = useContractRequest(async () => allowanceCheckWithError(message.notification.price))

    if (await allowanceCheckRequest())
      readNotificationItem(message)

    showNotificationLoader.value['nt'+message.notification.id] = false
  }

  return {
    showNotificationLoader,
    allowance
  }
}
