
import { v4 as uuid } from 'uuid';

export interface NotificationLink {
  link: string,
  title: string
}

export interface Notification {
  description: string,
  errorCode?: string,
  isRead: boolean,
  id: string,
  sender?: string,
  link?: NotificationLink,
}

export interface NotificationOption {
  errorCode?: string,
  sender?: string,
  link?: NotificationLink
}

export const useNotifications = () => {
  const notifications = useState<Notification[]>('notifications', () => [])

  const activeNotification = computed<Notification | null>(() => {
    const notification = notifications.value.find(item => item.isRead === false);
    return notification ? notification : null;
  });


  const addNotification = (description?: string, opts: NotificationOption = {}) => {
    if (!description)
      return

    const {
      errorCode,
      link,
      sender,
    } = opts

    notifications.value.push({
      description,
      isRead: false,
      errorCode,
      link,
      sender,
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