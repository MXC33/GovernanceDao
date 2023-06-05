import { ContractError } from "@ix/base/composables/Utils/useContractErrors"

export const useContractRequest = (fn: () => Promise<any>, errorOptions?: ContractError) => {
  const { addError } = useContractErrors()
  const { displaySnack } = useSnackNotifications()
  const loading = ref(false)

  const catchError = (serverError: string) => {
    console.log("Server", serverError)
    if (serverError?.includes('rejected'))
      return displaySnack('transaction-rejected')

    if (errorOptions)
      addError({
        ...errorOptions,
        serverError
      })
  }

  const execute = async () => {
    loading.value = true
    try {
      await fn()
    } catch (error) {
      //@ts-ignore
      const message: string = error?.message

      catchError(message)

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