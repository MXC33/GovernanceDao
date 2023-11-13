
export type SnackNotificationType = 'error' | 'warning' | 'success' | string
export interface SnackNotificationBase {
  id: string,
  type?: SnackNotificationType
  timeout: number
}

export interface SnackNotification<T extends string> extends SnackNotificationBase {
  id: T,
  type?: SnackNotificationType
  timeout: number
}

export type DefaultTypes = 'transaction-rejected' | 'success' | 'user-rejected'

export interface SnackOptions<T> {
  mapTypes?: (type: T) => SnackNotificationType | undefined
}

export const defineSnackNotifications = <T extends string>(opts: SnackOptions<T | DefaultTypes> = {}) => {
  const fallbackMap = (_: T) => undefined
  const { mapTypes = fallbackMap } = opts

  type NotificationType = T | DefaultTypes

  const defaultTypeMap = (type: NotificationType) => {
    switch (type) {
      case 'transaction-rejected':
      case 'success':
      case 'user-rejected':
        return 'success'

      default:
        return 'success'
    }
  }

  const snackNotifications = useState<SnackNotification<NotificationType>[]>('active-notification', () => [])

  const displaySnack = (id: T, type?: SnackNotificationType) => {
    const timeout = addNotificationTimeout()
    snackNotifications.value.push({ id, timeout, type })
  }

  const closeNotification = (notification: SnackNotification<NotificationType>) => {
    clearTimeout(notification.timeout)
    popLatestNotification()
  }

  const getSnackType = ({ id }: SnackNotification<T>): SnackNotificationType =>
    mapTypes(id) ?? defaultTypeMap(id)

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
  }
}