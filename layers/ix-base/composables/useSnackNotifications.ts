
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

export interface SnackOptions<T> {
  mapTypes?: (type: T) => SnackNotificationType
}

export const defineSnackNotifications = <T extends string>(opts: SnackOptions<T> = {}) => {
  const defaultTypeMap = (type: T): SnackNotificationType => {
    return 'success'
  }

  const { mapTypes = defaultTypeMap } = opts

  const snackNotifications = useState<SnackNotification<T>[]>('active-notification', () => [])

  const displaySnack = (id: T, type?: SnackNotificationType) => {
    const timeout = addNotificationTimeout()
    snackNotifications.value.push({ id, timeout, type })
  }

  const closeNotification = (notification: SnackNotification<T>) => {
    clearTimeout(notification.timeout)
    popLatestNotification()
  }

  const getSnackType = ({ id }: SnackNotification<T>): SnackNotificationType =>
    mapTypes(id)

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
}