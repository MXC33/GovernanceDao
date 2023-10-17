export type SnackNotifications = 'stake-success'

export const useSnackNotifications = () => {
  return defineSnackNotifications<SnackNotifications>()
}