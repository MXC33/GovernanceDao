

export type SnackNotificationId = 'copy-link' | 'add-to-cart' | 'remove-from-cart' | 'add-favorite' | 'remove-favorite' | 'transfer' | 'insufficient-funds' | 'transaction-rejected' | 'success' | 'user-rejected'

export type SnackNotificationType = 'success' | 'error' | 'warning' | 'purchase' | 'purchase-warning' | 'favorite'

export interface SnackNotification {
  id: SnackNotificationId,
  timeout: number
}

export const useSnackNotifications = () => {
  const snackNotifications = useState<SnackNotification[]>('active-notification', () => [])

  const displaySnack = (id: SnackNotificationId) => {
    const timeout = addNotificationTimeout()
    snackNotifications.value.push({ id, timeout })
  }

  const closeNotification = (notification: SnackNotification) => {
    clearTimeout(notification.timeout)
    popLatestNotification()
  }

  const getSnackType = ({ id }: SnackNotification): SnackNotificationType => {
    switch (id) {
      case 'transaction-rejected':
      case 'user-rejected':
        return 'error'

      case 'insufficient-funds':
        return 'purchase-warning'

      case 'add-favorite':
      case 'remove-favorite':
        return 'favorite'

      default:
        return 'success'
    }
  }

  const popLatestNotification = () =>
    snackNotifications.value.shift()

  const addNotificationTimeout = (timeout: number = 5000) =>
    Number(setTimeout(() => {
      popLatestNotification()
    }, 5000))

  return {
    snackNotifications,
    getSnackType,
    displaySnack,
    closeNotification,
  };
};



