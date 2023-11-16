import { SnackNotification, defineSnackNotifications } from "@ix/base/composables/useSnackNotifications";



export const SnackNotifications = ['copy-link', 'add-to-cart', 'remove-from-cart', 'add-favorite', 'remove-favorite', 'transfer', 'insufficient-funds', 'transaction-rejected', 'success', 'user-rejected'] as const

export type SnackNotificationId = typeof SnackNotifications[number]

// export type SnackNotificationType = 'success' | 'error' | 'warning' | 'purchase' | 'purchase-warning' | 'favorite'
export type SnackbarItem = SnackNotification<SnackNotificationId>

export const useSnackNotifications = () => {
  return defineSnackNotifications<SnackNotificationId>({
    mapTypes: (id: SnackNotificationId) => {
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
  })
};

