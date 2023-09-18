
import { v4 as uuid } from 'uuid';
import { Sender } from './useSender';

export interface NotificationLink {
  link: string,
  title: string
}

export interface Notification {
  description: string,
  errorCode?: string,
  isRead: boolean,
  id: string,
  link?: NotificationLink,
  sender: Sender
}


export const useNotifications = () => {
  const notifications = useState<Notification[]>('notifications', () => [])

  const activeNotification = computed<Notification | null>(() => notifications.value.find(item => item.isRead == false))

  const addNotification = (description: string, sender: Sender = 'proxy-of-change', errorCode?: string, link?: NotificationLink) => {
    notifications.value.push({
      description,
      isRead: false,
      errorCode,
      sender,
      link,
      id: uuid()
    })
  }

  const markAllNotificationsRead = () => {
    notifications.value.forEach((note, index) => {
      notifications.value[index].isRead = true
    })
  }

  const markCurrentNotificationRead = () => {
    const notification = activeNotification.value
    if (!notification)
      return

    const index = notifications.value.findIndex((item) => item.id == notification.id)

    if (index == -1)
      return

    notifications.value[index].isRead = true
  }

  return {
    activeNotification,
    markCurrentNotificationRead,
    markAllNotificationsRead,
    addNotification,
    notifications
  }
}