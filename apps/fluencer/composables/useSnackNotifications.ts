export type SnackNotifications = 'metashare-stake-success' | 'ixt-stake-success' | 'open-success' | 'approve-success'

export const useSnackNotifications = () => {
  return defineSnackNotifications<SnackNotifications>()
}