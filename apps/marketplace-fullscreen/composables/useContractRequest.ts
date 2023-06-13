import { ContractError } from "@ix/base/composables/Utils/useContractErrors"


interface RequestOptions {
  error?: () => ContractError,
  onError?: () => void
}

export const useContractRequest = (fn: () => Promise<any>, options: RequestOptions = {}) => {
  const { addError } = useContractErrors()
  const { displaySnack } = useSnackNotifications()
  const { displayPopup } = usePopups()

  const loading = ref(false)
  const {
    onError,
    error
  } = options

  const displayInsufficientFunds = () => {
    displayPopup({ type: 'insufficient-funds' })
  }

  const catchError = (serverError: string) => {
    console.log("Server", serverError)

    if (serverError?.includes('rejected'))
      return displaySnack('transaction-rejected')

    if (serverError == CustomErrors.insufficientBalance)
      return displayInsufficientFunds()

    if (onError)
      onError()

    if (error) {
      const errorData = error()
      addError({
        ...errorData,
        serverError
      })
    }
  }

  const execute = async () => {
    loading.value = true
    try {
      await fn()
    } catch (error) {
      //@ts-ignore
      const message: string = error?.message

      setTimeout(() => {
        catchError(message)
      }, 5)

      loading.value = false
      return false
    }

    loading.value = false
    return true
  }

  return {
    execute,
    loading
  }
}