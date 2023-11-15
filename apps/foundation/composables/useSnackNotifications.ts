import { defineSnackNotifications } from "@ix/base/composables/useSnackNotifications";


export const SnackNotifications = ['stake-success', 'withdraw-success'] as const

export type SnackNotificationId = typeof SnackNotifications[number]

export const useSnackNotifications = () => {
  const notifications = defineSnackNotifications<SnackNotificationId>()

  const maybeShowContractError = (error: string | undefined) => {
    if (error?.includes('rejected'))
      return notifications.displaySnack('transaction-rejected', 'error')

    if (error?.includes('failed'))
      return notifications.displaySnack('transaction-failed', 'error')
  }

  return {
    maybeShowContractError,
    ...notifications
  }

}

