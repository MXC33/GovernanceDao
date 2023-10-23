import { ContractError } from "./Utils/useContractErrors"

interface RequestOptions {
  error?: () => ContractError,
  onError?: (error?: string) => boolean | void
}

export const useContractRequest = <T extends any[]>(fn: (...args: T) => Promise<any>, options: RequestOptions = {}) => {
  const { addError } = useContractErrors()

  const loading = ref(false)
  const {
    onError,
    error
  } = options

  const catchError = (serverError: string) => {
    console.log("Server", serverError)

    if (onError) {
      const handled = onError()

      if (handled)
        return
    }


    const errorData = error ? error() : { title: "Transaction Error" }

    addError({
      ...errorData,
      serverError
    })
  }

  const execute = async (...args: T) => {
    loading.value = true
    try {
      await fn(...args)
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