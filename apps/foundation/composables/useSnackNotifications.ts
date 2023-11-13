import { defineSnackNotifications } from "@ix/base/composables/useSnackNotifications";


export const SnackNotifications = ['stake-success', 'withdraw-success'] as const

export type SnackNotificationId = typeof SnackNotifications[number]

export const useSnackNotifications = () =>
  defineSnackNotifications<SnackNotificationId>()

