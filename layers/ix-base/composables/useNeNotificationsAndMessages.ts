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
export const useNeNotifications = () => {

  const notificationCount = ref(1)

  const loadMoreNotifications = () => {
    notificationCount.value++
    return asyncData.fetchAndMerge()
  }

  const { fetchIXAPI } = useIXAPI()
  const { showUnreadNotifications } = useNotificationSettings()
  const asyncData = useAsyncDataState('notification', async () => {
    return (await fetchIXAPI("notifications/notification/" + notificationCount.value + "?unread=" + showUnreadNotifications.value)) as NotificationRequest
    //return (await fetchIXAPI(`notifications/notification/${notificationCount}?unread=false`)) as NotificationRequest
    // this may need to be changed depending on what data we want to fetch
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
    loadMoreNotifications,
  }
}

export const useNeMessages = () => {

  const messageCount = ref(1)

  const reloadMessages = () => {
    return asyncData.fetchAndMerge()
  }

  const loadMoreMessages = () => {
    messageCount.value++
    return asyncData.fetchAndMerge()
  }

  const { fetchIXAPI } = useIXAPI()
  const { showUnreadNotifications } = useNotificationSettings()

  const asyncData = useAsyncDataState('notification-messages', async () => {
    return (await fetchIXAPI("notifications/messages/" + messageCount.value + "?unread=" + showUnreadNotifications.value)) as NotificationRequest
    //-return (await fetchIXAPI(`notifications/messages/${messageCount}?unread=false`)) as NotificationRequest
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
    loadMoreMessages,
    reloadMessages
  }
}

export const useNotificationSettings = () => {
  const showUnreadNotifications = useState('neNotificationUnread', () => true)

  return {
    showUnreadNotifications
  }
}
