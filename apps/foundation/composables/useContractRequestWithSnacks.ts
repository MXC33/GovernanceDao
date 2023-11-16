import { SnackNotificationId } from "./useSnackNotifications"

export const useContractRequestFnd = <T extends any[]>(fn: (...args: T) => Promise<any>, type: 'stake' | 'claim' | 'deposit' | 'unstake' | 'withdraw') => {
  const snackId = `${type}-success` as SnackNotificationId

  const { maybeShowContractError, displaySnack } = useSnackNotifications()

  return useContractRequest(fn, {
    onError: maybeShowContractError,
    onSuccess: () => {
      displaySnack(snackId, 'success')
    }
  })
}
