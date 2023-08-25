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
    const { fetchIXAPI } = useIXAPI()
    return useAsyncDataState('notification', async () => {
      return (await fetchIXAPI('notifications/notification/1?unread=false')) as NotificationRequest
      // this may need to be changed depending on what data we want to fetch
  }, {transform: (response) => response?.data})
}
//Use this instead of 1 to fetch all notifications
export const useNotificationCount = () => shallowRef<number>(1)

export const useNeMessages = () => {
  const { fetchIXAPI } = useIXAPI()
  return useAsyncDataState('notification-messages', async () => {
    return (await fetchIXAPI('notifications/messages/1?unread=false')) as NotificationRequest
  }, {transform: (response) => response?.data} )
}
//Use this instead of 1 to fetch all messages
export const useMessageCount = () => shallowRef<number>(1)