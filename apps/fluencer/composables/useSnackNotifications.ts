export type SnackNotifications = 'stake-success' | 'open-success' | 'approve-success'

export const useSnackNotifications = () => {
  return defineSnackNotifications<SnackNotifications>()
}